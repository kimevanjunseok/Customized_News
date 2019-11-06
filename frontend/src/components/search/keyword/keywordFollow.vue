<template>
<v-layout wrap overflow>
    <v-flex shrink>
        <div>
            <v-btn v-if="isFollowing" small outline color="#9e9e9e" class="following" @click="unfollow">
                <span>Following</span>
            </v-btn>
            <v-btn v-else small outline class="green green--text" @click="open">
                Follow
            </v-btn>
        </div>
        <div class="expandBox" v-if="!isFollowing">
            <v-expand-transition>
                <v-card v-show="expand" class="scroll">
                    <div v-if="addopen===false">
                        <v-list class="followExpand" flat>
                            <v-list-tile v-for="item in items" :key="item" @click="create(item)" class="itemStyle">
                                <v-list-tile-action>
                                    <!-- <v-icon v-if="isFollowCategory(item)" color="#2bb24c">fas fa-rss</v-icon> -->
                                    <!-- <v-icon v-else>fas fa-rss</v-icon> -->
                                    <v-icon>fas fa-folder</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{item}}</v-list-tile-title>
                                </v-list-tile-content>

                                <!-- <v-list-tile-action v-if="isFollowCategory(item)"> -->
                                    <!-- <v-icon @click.stop="unfollow()"> -->
                                        <!-- fas fa-trash-alt -->
                                        <!-- <v-icon color="red lighten-1">info</v-icon> -->
                                    <!-- </v-icon> -->
                                <!-- </v-list-tile-action> -->
                            </v-list-tile>

                            <v-divider />
                           <v-list-tile class="followTile" @click="addFeed">
                                 <v-icon class="addIcon">add</v-icon>
                               <span class="addFeed">New Feed</span>
                            </v-list-tile>
                        </v-list>
                    </div>

                    <div v-else class="addFeedBox">
                        <span class="title font-weight-bold.font-italic">Feed Name</span>
                        <input v-model="newFeed" class="autocomplete-input" placeholder="New Feed Name" autofocus>
                        <v-btn disabled @click="create(newFeed)" class="success createButton white--text" v-if="!newFeed">Create</v-btn>
                        <v-btn @click="create(newFeed)" class="success createButton" v-else>Create</v-btn>
                        <v-btn @click="before" outline color="grey">Cancel</v-btn>
                    </div>
                </v-card>
            </v-expand-transition>
        </div>
    </v-flex>

</v-layout>
</template>

<script>
import firebase from 'firebase'
import eventBus from '../../../eventBus'
export default {
    props: ['keyword', 'isFollowing'],
    data: () => ({
        expand: false,
        addopen: false,
        items: null,
        searchFeed: "",
        newFeed: "",
        search: null,
        caseSensitive: false,

        closeDrawer: false,
    }),

    methods: {
        unfollow(){
            delete this.$store.state.userKeyword[this.keyword];
            var user = firebase.auth().currentUser
            firebase.firestore().collection('Userinfo').doc(user.uid).update({
                keyword : this.$store.state.userKeyword
            })
            this.$store.commit('loadRes');
            this.isFollowing = false;
            var tmp=[this.keyword ,false];
            this.$emit('sign_KeywordFollow',tmp)
        },
        isFollowCategory(category) {
            let userKeyword = this.$store.state.userKeyword;
            if (userKeyword[this.keyword] == category) {
                return true;
            } else return false;

        },
        open: function () {
            if (this.addopen == true) {
                this.addopen = false
            }
            this.items = this.$store.state.userCategorys
            
            this.expand = !this.expand

            eventBus.$emit('closeByFollow', this.closeDrawer)
        },
        addFeed: function () {
            this.addopen = true
        },
        before: function () {
            this.addopen = false
        },
        create: async function (category) {

            // follow (abc - IT);
            var userKeyword = this.$store.state.userKeyword
            userKeyword[this.keyword] = category
            var user = firebase.auth().currentUser
            firebase.firestore().collection('Userinfo').doc(user.uid).update({
                keyword: userKeyword
            })

            this.keywordManage(this.keyword, user);
            this.$store.commit('loadRes')
            this.addopen = false
            this.expand = !this.expand
            this.isFollowing = true;
            var tmp=[this.keyword,true];
            this.$emit('sign_KeywordFollow',tmp)
        },
        async keywordManage(keyword, user) {
            var db = firebase.firestore().collection('Keyword');
            db.where("word", "==", keyword).get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        //지금 follow 한 키워드가 데이터베이스에 없으면 새로 만들고 등록시킴.
                        var users = [];
                        users.push(user.email);
                        db.doc(keyword).set({
                            word: keyword,
                            users: users,
                            users_num: 1
                        })
                    } else {
                        // follow하는 키워드가 데이터베이스에 저장되어 있는 경우
                        // follow user정보와 follow 수치를 update. 
                        var data = querySnapshot.docs[0].data(); //db에 저장된 키워드 정보
                        if (!data.users.includes(user.email)) {
                            // 해당 키워드를 구독중이지 않을 경우에만!
                            // data.users는 특정 키워드를 구독하고 있는 user목록을 반환
                            db.doc(keyword).update({
                                users: firebase.firestore.FieldValue.arrayUnion(user.email),
                                users_num: firebase.firestore.FieldValue.increment(1)
                            })
                        }

                    }

                })
        },
    },
    created() {
        eventBus.$on('closeByDrawer', closeExpand => {
            this.expand = false
        })
    }
    // destroyed() {
    //     if (!this.expand) {
    //         this.expand = false
    //     }
    // }
}
</script>

<style scoped>
.following {
    text-align: center;
}

/* .following:hover span {
    display: none;
} */

/* .following:hover::after {
    content: 'edit';
    text-align: center;
} */

.autocomplete-input {
    border: 1px solid #eee;
    border-radius: 5px;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 12px 12px 12px 48px;
    box-sizing: border-box;
    position: static;
    font-size: 16px;
    line-height: 1.5;
    flex: 1;
    background-color: #fff;
    /* background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+"); */
    /* background-image: url('../../../assets/search-solid.svg'); */
    background-image: url('../../../assets/pen.png');

    background-repeat: no-repeat;
    background-position: 12px
}

.autocomplete-input:focus, .autocomplete-input:focus:after {
    border: 1px solid #2bb24c;
}

.expandBox {
    width: 100px;
}

.scroll {
    overflow-y: auto;
    position: absolute;
    right: 25px;
    /* height : 200px; */
    width: 300px;
    z-index: 1;

    /* padding: 16px; */
}

.followExpand {
    padding: 0px;
}

.followTile {
    background-color: #ffffff;
    padding: 8px;
}

.categoryIcon {
    width: 20px;
    font-size: 20px;
    margin-right: 4px;
}

.addIcon {
    color: #2bb24c !important;
    font-size: 20px;
    padding-left: 4px;
}

.addFeed {
    color: #2bb24c;
}

.itemStyle {
    /* padding: 8px; */
    /* height: 40px; */
}

.addFeedBox {
    padding: 16px;
}

.addFeedBox > span {
    font-size: 14px !important;
    font-weight: 700;
}

.createButton {
    margin-left: 0px;
    color: white !important;
}
</style>
