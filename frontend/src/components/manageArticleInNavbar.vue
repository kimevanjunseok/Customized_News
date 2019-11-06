<template>
<div>
    <vue-drag-tree disableDBClick 
                :data='followList' 
                :allowDrag='allowDrag' 
                :allowDrop='allowDrop' :defaultText='"New Node"' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler" v-slot="slotProps">
        <!-- customize your node here if don't like the default / 如果你不喜欢默认样式，可以在这里定制你自己的节点 -->
        <!-- <span :class="[slotProps.isClicked ? 'i-am-clicked' : 'i-am-not-clicked']"></span>
    <span class='i-am-node-name'>{{slotProps.nodeName}}</span> -->
        <v-flex xs12>
            <v-icon>fas fa-folder</v-icon>
            <span> {{slotProps.nodeName}}</span>
            <!-- <span>
                <v-btn class="btn__content" depressed small>name</v-btn>
                <v-btn class="btn__content" @click="test(slotProps.nodeName)" depressed small>del</v-btn>
            </span> -->
        </v-flex>

    </vue-drag-tree>
</div>
</template>

<script>
import firebase from 'firebase'

//라이브러리 npm 주소
//https://www.npmjs.com/package/vue-drag-tree

export default {
    data() {
        return {
            getList: null,
            data: [{
                name: 'Tech',
                id: 0,
                children: [{
                        name: 'Source',
                        id: 1,
                        children: [{
                                name: 'abc',
                                id: 2,
                            },
                            {
                                name: 'bbc',
                                id: 6,
                            },
                        ],
                    },
                    {
                        name: 'Keyword',
                        id: 4,
                        children: [{
                            name: 'trump',
                            id: 5,
                        }],
                    },
                ],
            }],
            backup: null,
            draging: null,
            droping: null,
        }
    },
    methods: {
        test(nodeName) {
            console.log(nodeName);

            //카테고리 삭제하려면 
            let followList = this.$store.state.followList;
            for(var i in followList){
                console.log(i);
            }

            

        },
        allowDrag(model, component) {
            let keywordSubtitle = this.$store.state.sourceSubTitle;
            let sourceSubtitle = this.$store.state.keywordSubTitle;
            
            if (model.name == 'SOURCE' || model.name == 'KEYWORD') {
                // can't be dragged
                // console.log('cant be dragged');
                // console.log('model',model.name);
                return false;
            }
            // can be dragged
            return true;
        },
        allowDrop(model, component) {
            if (model.name == "" || model.name == "") {
                // can't be placed
                return false;
            }
            // can be placed
            return true;
        },
        curNodeClicked(model, component) {
            // console.log('curNodeClicked', model, component);
            // this.backup = JSON.parse(JSON.stringify(this.$store.state.followList));
        },
        dragHandler(model, component, e) {
            // console.log('dragHandler: ', model, component, e);

            //drag하는 항목 저장.
            this.draging = model;
        },
        dragEnterHandler(model, component, e) {
            // console.log('dragEnterHandler: ', model, component, e);
            this.backup = JSON.parse(JSON.stringify(this.$store.state.followList));
        },
        dragLeaveHandler(model, component, e) {
            // console.log('dragLeaveHandler: ', model, component, e);
        },
        dragOverHandler(model, component, e) {
            // console.log('dragOverHandler: ', model, component, e);
        },
        dragEndHandler(model, component, e) {
            // console.log('dragEndHandler: ', model, component, e);
            let name = this.draging.name;
            let user = firebase.auth().currentUser;
            let db = firebase.firestore().collection('Userinfo').doc(user.uid);
            console.log(name)
            // console.log(model)
            if (e.screenX > 300) {
                const select = confirm('삭제하시겠습니까?')
                if (select) {
                    // vuex에서 삭제하는 코드
                    if (model.type == this.$store.state.keywordSubTitle) {
                        //keyword 요소를 drag 했을 때.
                        delete this.$store.state.userKeyword[name]
                        db.update({
                            keyword: this.$store.state.userKeyword
                        })
                        this.$store.commit('loadRes')
                    } else if (model.type == this.$store.state.sourceSubTitle) {
                        // source 요소를 drag 했을 때.
                        delete this.$store.state.followSource[name]
                        db.update({
                            keyword: this.$store.state.followSource
                        })
                        this.$store.commit('loadRes')
                    }
                    // db에서 삭제하는 코드
                }
            }
        },
        dropHandler(model, component, e) {
            // console.log('dropHandler: ', model, component, e);
            this.droping = model; // drop되는 곳 정보 저장.
            //키워드는 키워드로만, 소스는 소스로만 이동하도록하기.
            //키워드->소스로 이동하거나, 소스->키워드로 이동시키는 경우 백업본으로 덮어씌어버림
            if (this.draging.type != this.droping.name) {
                this.$store.state.followList = this.backup;
                return;
            }

            // drag 요소 데이터베이스, vuex에 반영하기
            let type = this.draging.type;
            let name = this.draging.name;
            let destination = this.droping.category;
            let user = firebase.auth().currentUser;
            let db = firebase.firestore().collection('Userinfo').doc(user.uid);

            if (type == this.$store.state.keywordSubTitle) {
                //keyword 요소를 drag 했을 때.
                this.$store.state.userKeyword[name] = destination
                db.update({
                    keyword: this.$store.state.userKeyword
                })
            } else if (type == this.$store.state.sourceSubTitle) {
                // source 요소를 drag 했을 때.
                this.$store.state.followSource[name] = destination;
                db.update({
                    keyword: this.$store.state.followSource
                })
            }
        }
    },
    mounted() {},
    computed: {
        followList() {
            return this.$store.state.followList;
        }
    },
    watch: {
    }
}
</script>

<style>
.btn__content {
    min-width: 0;
}
.is-clicked,.is-hover{
    background-color: transparent !important;
}
.dnd-container {
    background-color: #d9d9d9 !important;
}
</style>
