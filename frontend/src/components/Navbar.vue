<template lang="html">
<nav>
    <v-toolbar app color="white">
        <v-toolbar-side-icon @click="call" v-if="user"></v-toolbar-side-icon>
        <v-toolbar-title @click="goto('')" style="cursor:pointer">Idle</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">

            <!-- <v-btn flat input-value disabled> -->
            <div class="box" v-if="user">
                <div class="container-1">
                    <br style="height: 20.8px;">

                    <span class="icon" :class="{ focusOnNavSearch : isFocusOnNavSearch}" id="searchIcon"><i class="fa fa-search"></i></span>
                    <input v-model="searchWord" type="search" id="search" :placeholder="placeholder" @blur="navbarSearchBlur" @focus="navbarSearchFocus" @keydown.enter="search">
                    </input>
                    
                </div>
            </div>
            <!-- <div style="padding-top: 10px; height: 35px;"> -->
            <br style="height: 20.8px;">
            <!-- <v-select outline 
                                color="#2bb24c" 
                                v-model="searchSelected" 
                                :items="searchMenuSelect"
                                no-data-text="신문사"
                                height="35px"
                                width="30px"
                                ></v-select>
            </div> -->
            <select class="selectBox" name="snk" v-model="searchSelected" v-if="user">
                <option value="신문사" selected="selected">신문사</option>
                <option value="키워드">키워드</option>
            </select>
            <!-- </div> -->
            <Login style="padding-left:20px" />

        </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer height="93.5vh" app stateless v-model="drawer" style="background-color: #d9d9d9;">

        <!-- <v-toolbar flat> -->
        <v-list>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title class="title">
                        Application
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <!-- </v-toolbar> -->
        <v-divider></v-divider>
        <div style="margin-top:10px">
            <div style="padding:10px 0px 10px 15px; cursor:pointer" @click="goto('article')">
                <v-icon>far fa-newspaper</v-icon><span>&nbsp Main</span>
            </div>
        </div>
        <div>
            <div style="padding:10px 0px 10px 15px; cursor:pointer" @click="recentlyReadBtnClicked">
                <v-icon>fas fa-check</v-icon><span>&nbsp Recently Read</span>
            </div>
        </div>
        <div style="margin-bottom:10px">
            <div style="padding:10px 0px 10px 15px; cursor:pointer" @click="readLaterBtnClicked">
                <v-icon>far fa-bookmark</v-icon><span>&nbsp&nbsp Read Later</span>
            </div>
        </div>
        <v-divider></v-divider>

        <v-flex xs12>
            <v-layout justify-space-between>
                <!-- <v-flex style="margin:10px 0px 12px 10px;">Category</v-flex> -->
                <v-flex style="margin:10px 0px 12px 10px;">FEEDS</v-flex>
                <v-icon @click="Category_move()" style="margin:10px 10px 12px 10px;">fas fa-cog</v-icon>
            </v-layout>

            <!-- <v-flex xs12>
            <v-btn class="ma-1" 
                    :class="[editMode ? 'edit-mode' : 'not-edit-mode']"
                    :outline='editOutline'
                    small
                    absolute 
                    depressed
                    right 
                    :color="editColor"
                    style="z-index: 3"
                    @click="test"
                    >
                Edit
            </v-btn>-->
        </v-flex>
        <v-template v-if="vuexItemList.length > 0">
            <v-treeview :items="vuexItemList" :active.sync="selectedItems" activatable transition open-all open-on-click item-key="id" return-object=true>
                <template v-slot:prepend="{ item, open }">
                    <v-icon v-if="item.type==='source'">
                        fas fa-rss
                    </v-icon>
                    <v-icon v-else-if="item.type==='keyword'">
                        fab fa-google
                    </v-icon>
                    <v-icon v-else>
                        {{ open ? 'fas fa-folder-open' : 'fas fa-folder' }}
                    </v-icon>
                </template>
            </v-treeview>
        </v-template>

        <v-template v-else>
            <v-container style="height:300px; border: dashed #848484;">
                <v-layout style="height:160px;" align-center justify-center>
                    <v-icon large style="font-size: 90px; color:#A4A4A4;">fas fa-rss</v-icon>
                </v-layout>
                <p style="text-align:center; color:#A4A4A4; margin-bottom:4px;">Keep up with your favorite sources<br>and keyword alert</p>
                <v-layout align-center justify-center>
                    <v-btn outline small style="font-size: 10px; color:#A4A4A4;" @click="goto('addContent')">CREATE YOUR FIRST FEED</v-btn>
                </v-layout>
            </v-container>
        </v-template>

    </v-navigation-drawer>
    <div class="btn-addContent" :class="[drawer ? 'btn-addContent-open' : 'btn-addContent-close']">
        <v-btn to="/addContent" block flat color="#2bb24c" @click="closeLeftDrawer">
            <v-icon class="white--text mr-1">add</v-icon>
            <span class="white--text" style="font-size: 12px;">ADD CONTENT</span>
        </v-btn>
    </div>

    <readlater :drawer='readlaterDrawer' :readlaterArticles="readlaterArticles" @deleteReadlater="dread" @readLater_drawer_false="readlaterdrawerClosed"></readlater>

    <Markasread :drawer="recentlyReadDrawer" :markasreadArticles="markasreadArticles" @right_drawer="recentlyReadDrawerClosed" @deleteMark="dmark"></Markasread>

</nav>
</template>

<script>
import firebase, {
    functions
} from 'firebase'
// import GoogleLogin from './GoogleLogin'
// import FacebookLogin from './FacebookLogin'
import eventBus from '../eventBus'
import Login from '@/components/login/Login'
import readlater from '@/components/profile/Readlater'
import Markasread from '@/components/profile/Markasread'

export default {
    components: {
        // GoogleLogin,
        // FacebookLogin,
        Login,
        readlater,
        Markasread
    },
    computed: {
        vuexItemList() {
            return this.$store.state.followList;
        }
    },
    data() {
        return {
            user: '',
            signupemail: "",
            signuppassword: "",
            email: "",
            password: "",
            dialog1: false,
            dialog2: false,
            weather: [],
            drawer: false,
            write: false,
            // navbar search
            searchWord: "",

            items: null,
            userInfo: null,
            selectedItems: [],
            // editMode: false,
            editColor: "#999",
            editOutline: true,

            placeholder: 'Search...',

            readlaterDrawer: false,
            readlaterArticles: null,
            recentlyReadDrawer: false,
            markasreadArticles: null,

            // searchSelected : "",
            searchSelected: "신문사",
            searchMenuSelect: ['키워드', '신문사'],
            isFocusOnNavSearch: false,
        }
    },
    methods: {
        navbarSearchBlur() {
            this.isFocusOnNavSearch = false;
            this.placeholder= 'Search...';
        },
        navbarSearchFocus() {
            this.isFocusOnNavSearch = true;
            this.placeholder = 'Search in sources and keywords';
        },
        dread() {
            firebase.auth().onAuthStateChanged((user) => {
                const db = firebase.firestore();
                db.collection('Userinfo').doc(user.uid).get()
                    .then(doc => {
                        this.readlaterArticles = doc.data().readlater
                    })
                    .catch((err) => {
                        console.log('Error getting documents', err);
                    });
            })
        },
        readlaterdrawerClosed() {
            // drawer 닫히면 emit 받아서 여기(navbar.vue)도 값 설정
            this.readlaterDrawer = false;
        },
        readLaterBtnClicked() {
            this.selectedItems = []
            this.readlaterDrawer = !this.readlaterDrawer;

            firebase.auth().onAuthStateChanged((user) => {
                const db = firebase.firestore();
                db.collection('Userinfo').doc(user.uid).get()
                    .then(doc => {
                        this.readlaterArticles = doc.data().readlater
                    })
                    .catch((err) => {
                        console.log('Error getting documents', err);
                    });
            })

        },
        recentlyReadDrawerClosed() {
            // drawer 닫히면 emit 받아서 여기(navbar.vue)도 값 설정
            this.recentlyReadDrawer = false;
        },
        recentlyReadBtnClicked() {
            this.selectedItems = []
            this.recentlyReadDrawer = !this.recentlyReadDrawer;
            firebase.auth().onAuthStateChanged((user) => {
                const db = firebase.firestore();
                db.collection('Userinfo').doc(user.uid).get()
                    .then(doc => {
                        this.markasreadArticles = doc.data().markasread
                    })
                    .catch((err) => {
                        console.log('Error getting documents', err);
                    });
            })
        },
        dmark() {
            firebase.auth().onAuthStateChanged((user) => {
                const db = firebase.firestore();
                db.collection('Userinfo').doc(user.uid).get()
                    .then(doc => {
                        this.markasreadArticles = doc.data().markasread
                    })
                    .catch((err) => {
                        console.log('Error getting documents', err);
                    });
            })
        },
        Category_move() {
            this.$router.push("/category_setting")
        },
        // test() {
        //     // console.log('test');

        //     this.editMode = !this.editMode

        //     if (this.editMode) {
        //         this.editColor = "#ff5722";
        //         this.editOutline = false;
        //     } else {
        //         this.editColor = "#999";
        //         this.editOutline = true;
        //     }
        // },
        search: function () {
            if (this.searchSelected == '신문사') {
                this.$router.push('/addcontent/' + this.searchWord)
            } else if (this.searchSelected == '키워드') {
                this.$router.push('/addKeyword/' + this.searchWord)
            }

        },
        goto: function (addr) {
            this.selectedItems = []
            this.$router.push('/' + addr)
        },
        Login: async function () {
            await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    alert('Well done ! You are now connected')
                    this.email = ""
                    this.password = ""
                },
                (err) => {
                    alert('Oops, ' + err.message)
                    this.dialog2 = true
                }
            )
        },

        // init: async function () {
        //     let userUid = JSON.parse(sessionStorage.getItem('userInfo')).user.uid
        //     firebase.firestore().collection("Userinfo").doc(userUid).get()
        //         .then(r => {
        //             const tmp = r.data()

        //             this.$store.commit('loadUserinfoData', tmp)
        //             this.$store.commit('loadRes')
        //         })
        // },
        call: function () {
            if (this.drawer == false && sessionStorage.hasOwnProperty('userInfo')) {
                this.items = this.$store.state.followList
            }
            this.drawer = !this.drawer
            
            // 햄버거 클릭 시 follow expand 닫히게
            eventBus.$emit('closeByDrawer', this.drawer)
        },
        moveSourceDetail: function (j) {
            alert(j)
            this.$router.push('/article/' + j)
            eventBus.$emit("article", j)
        },
        setTheDB() {
            this.$store.commit('loadRes')
        },
        closeLeftDrawer() {
            this.drawer = !this.drawer
        },
        out_treeview() {
            this.selectedItems = []
        }
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem('userInfo')) ? true : false
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        // this.setTheDB()
        eventBus.$on('closeByFollow', closeDrawer => {
            this.drawer = closeDrawer
        })
    },
    watch: {
        drawer: function (drawer) {
            eventBus.$on("leftDrawer", navSign => {
                if (navSign) {
                    this.drawer = false
                }
            })
        },
        write: function (source) {
            alert("nav source")
        },
        selectedItems: function () {
            var follow = this.selectedItems[0].name
            var type = this.selectedItems[0].type

            this.$router.push('/article/' + type + '/' + follow)
            eventBus.$emit("article", this.selectedItems)
        },
    }
}
</script>

<style lang="css" scoped>
.v-input__slot {
    /* 
        app.vue에 선언되어 있음... 
        v-input__slot 여기서 안먹는것 같음.
        vuetify ver. 1.5 min-height 값 52px 제한
        참고 : https://stackoverflow.com/questions/53363333/vuetify-js-v-select-minimum-height-limitation
    */
}

/* .container-1{
    width: 100px !important;
} */
.btn-edit {}

.edit-mode {
    color: #fff;
}

.not-edit-mode {}

.btn-addContent {
    width: 300px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #2bb24c;
    height: 6.5vh;
    transition: all 0.2s;
}

.btn-addContent-open {
    transform: translateX(0px);
}

.btn-addContent-close {
    transform: translateX(-300px);
}

/* .test {
    display: block;
    width: 100%;
} */

.box {
    /* margin: 100px auto; */
    width: 192px;
    height: 50px;
}

.container-1 {
    width: 192px;
    vertical-align: middle;
    white-space: nowrap;
    position: relative;
}

.container-1 input#search {
    width: 192px;
    height: 32px;
    position: absolute;
    top: 85%;
    right: 0;
    /* background: #2b303b; */
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 10pt;
    float: left;
    /* color: #63717f; */
    /* padding-left: 45px; */
    padding-left: 35px;
    /* -webkit-border-radius: 5px; */
    /* -moz-border-radius: 5px; */
    /* border-radius: 5px; */
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    -webkit-transition: background .55s ease;
    -moz-transition: background .55s ease;
    -ms-transition: background .55s ease;
    -o-transition: background .55s ease;
    transition: background .55s ease, width 0.55s ease;
}

.container-1 input#search::-webkit-input-placeholder {
    color: #65737e;
}

.container-1 input#search:-moz-placeholder {
    /* Firefox 18- */
    color: #65737e;
}

.container-1 input#search::-moz-placeholder {
    /* Firefox 19+ */
    color: #65737e;
}

.container-1 input#search:-ms-input-placeholder {
    color: #65737e;
}

.container-1 .icon {
    position: absolute;
    top: 35%;
    margin-left: 17px;
    margin-top: 17px;
    z-index: 1;
    color: #4f5b66;

    transition: transform .55s ease
}

/* .container-1:focus, .container-1:active {
    width: 300px;
}
 */

.container-1 input#search:focus,
.container-1 input#search:active {
    outline: none;
    /* box-shadow: 0 0 1px 1px #2bb24c; */
    width: 300px;
    display: block;
    /* text-align: right; */
}

.container-1 input#search:focus,
.container-1 input#search:active:after {
    border: 1px solid #2bb24c;
    /* border-radius: 5px; */
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}

.container-1:hover input#search {
    /* width: 300px; */
}

/* .container-1 .icon:focus, .container-1 .icon:active {
    position: relative;
    right: 161px;
} */
/* .container-1:focus .icon,
.container-1:active .icon {
    transform: translateX(-105.5px)
} */

.container-1:focus>.icon {
    transform: translateX(-105.5px);
    color: red;
}

.focusOnNavSearch {
    transform: translateX(-105.5px);
}

/* #search > .icon{
        color:red;

} */

/* .container-1 .icon:focus,
.container-1 .icon:active {
    transform: translateX(-105.5px)
} */

/* .container-1 span#searchIcon:focus,
.container-1 span#searchIcon:active {
    position: absolute;
    right: 270px;
} */

/* .container-1 span#searchIcon:active:after {
    position: absolute;
    right: 270px;

} */

.container-1:hover input#search {
    /* width: 300px; */
}

.container-1:hover .icon {
    /* color: #93a2ad; */
}

/* .container-1 input#search:hover, .container-1 input#search:focus, .container-1 input#search:active{
  outline:none;
  background: #ffffff;
}

.container-1 input#search:focus, .container-1 input#search:active{
  outline:none;
  width: 300px;
}

.container-1:hover input#search{
width: 300px;
}

.container-1:hover .icon{
  color: #93a2ad;
} */

/* source & keyword selector */
.selectBox {
    margin-top: 17.5px;
    height: 32px;
    width: 90px;
    color: #9E9E9E;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-left: none;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    padding: .4em .5em;
    background: url('../assets/arrow.png') no-repeat 90% 50%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.selectBox::-ms-expand {
    display: none;
}
</style>
