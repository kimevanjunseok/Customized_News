<template lang="html">
<v-container>
    <v-layout>
        <v-flex>
            <searchOptionSelector :active_tab=parentActive_tab>
            </searchOptionSelector>
            <v-flex my-5 xs9>
                <div>
                    <p class="description">Discover the best sources for any topic</p>
                </div>
                <!-- search-box start -->
                <div id="autocomplete" class="autocomplete">
                    <input v-model="input" id="input-search" class="autocomplete-input" placeholder="Search by topic" aria-label="Search by topic" autofocus @keyup.enter="search">
                    <ul class="autocomplete-result-list"></ul>
                </div>
                <!-- search-box end -->
            </v-flex>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs9>
            <keywordView :isFollowing="isFollowing" @sign_keywordView="update_follow" v-show="keywordInfo.word != ''" :keywordInfo="keywordInfo" />
        </v-flex>
        <!-- 메인에서 안보이게 처리 -->
        <v-flex xs3 v-if="keywordInfo.word.length >= 1">
            <topKeyword />
        </v-flex>
    </v-layout>

    <!-- 스낵바 수정 -->
    <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :timeout="timeout"
    >
        {{ text }}
        <v-btn
        color="pink"
        flat
        @click="snackbar = false"
        >
        Close
        </v-btn>
    </v-snackbar>

   
</v-container>
</template>

<script>
import firebase from 'firebase'
import searchOptionSelector from '@/components/search/searchOptionSelector'
import keywordView from '@/components/search/keyword/keywordView'
import topKeyword from '@/components/search/keyword/topKeyword'
import eventBus from '../../eventBus'
import env from '../../../env.js'

//user log
import timeCheck from '@/timeCheck'
import userLog from '@/userLog'

export default {
    components: {
        searchOptionSelector,
        keywordView,
        topKeyword
    },
    props: ['searchWord'],
    data() {
        return {
            sDate: null,
            eDate: null,
            path: '/addKeyword',
            words: null,

            // autocomplete
            input: "",
            keywordsName: [],
                keywordInfo: {
                users: [],
                users_num: 0,
                word: '',
                apiResponse: {
                articles: [],
                }
            },

            parentActive_tab: 1,

            isFollowing: false,
            searchByInput: false,

            snackbar : false,
            y: 'bottom',
            x: 'right',
            timeout: 3000,
            text: '',
        }
    },
    computed :{
        keywordFollowing(){
            return this.$store.state.keywordFollowing;
        }
    },
    created() {
        this.init()
        this.sDate = timeCheck()
        window.onload = function () {
            var input = document.getElementById("autocomplete").focus();
        }
        
    },
    mounted() {
        //db에서 keyword list load
        this.getKeywords();
        this.loadAutoComplete();

        this.input = this.searchWord;
        if (this.searchWord != null) this.search();
        this.searchByInput = true;
    },
    watch: {
        //top10 keyword 클릭시 url 바뀜 -> props 변수 searchWord 변함 -> 검색 실행
        searchWord: function (newVal) {
            this.input = newVal;
            this.searchByInput = false;
            this.search();
            this.searchByInput = true;
        },
        sign : function(){

        },
        tmp : function(){
            alert("joy")
            eventBus.$on("snack", sign=>{
                alert("hojin")
                // if(sign) this.snackbar=true
            })
        }
    },

    destroyed() {
        this.eDate = timeCheck()
        //save user log on firebase
        var user = firebase.auth().currentUser
        userLog(user, this.path, this.sDate, this.eDate)
    },
    methods: {
        init: async function() {
            firebase.auth().onAuthStateChanged((user) => {
                firebase.firestore().collection("Userinfo").doc(user.uid).get()
                .then(r => {
                    const tmp = r.data()

                    this.$store.commit('loadUserinfoData', tmp)
                    this.$store.commit('loadRes')

                    let newsId = this.news.id;
                    let followSource = this.$store.state.followSource;

                    if(followSource[newsId] != null ) {
                        this.isFollowing = true;
                    }
                    else this.isFollowing = false;

                })
            })
        },
        getKeywords() {
            firebase.firestore().collection('Keyword').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        this.keywordsName.push(doc.id);
                    })
                });
        },
        async search() {
            if( this.searchByInput){
                this.input=$('#input-search').val();
            }
            
            // 입력한 키워드 검색결과에 따라 데이터베이스에 키워드 저장하기.
            await this.$axios.get(`https://newsapi.org/v2/everything?q=${this.input}&apiKey=`+env.data().api)
                .then(response => {
                    this.keywordInfo['apiResponse'] = response.data;
                    this.keywordInfo['word'] = this.input;
                    var db = firebase.firestore().collection('Keyword');
                    if (response.data.totalResults >= 5) {
                        db.doc(this.input).get().then(doc => {
                            if (!doc.exists) {
                                // keyword 생성
                                db.doc(this.input).set({
                                    word: this.input,
                                    users: [],
                                    users_num: 0
                                })
                                this.keywordInfo['users'] = [];
                                this.keywordInfo['users_num'] = 0;
                            } else {
                                var docData = doc.data();
                                this.keywordInfo['users'] = docData.users;
                                this.keywordInfo['users_num'] = docData.users_num
                            }

                        })
                    }
                    this.isFollowElement(this.input);

                });
        },
        isFollowElement(word) {
            this.isFollowing = false;
            let userKeyword = this.$store.state.userKeyword;

            Object.keys(userKeyword).forEach(element => {
                if (element == word) {
                    this.isFollowing = true;
                }
            })

        },
        loadAutoComplete: function () {
            new Autocomplete('#autocomplete', {
                search: input => {
                    if (input.length < 2) {
                        return []
                    }
                    return this.keywordsName.filter(source => {
                        return source.toLowerCase()
                            .startsWith(input.toLowerCase())
                    })
                }
            })
        },
       update_follow(tmp){
        if(tmp[1]){
            this.text=tmp[0]+" is Following"
        }else{
            // console.log("addcontent unfollow", tmp)
            this.text=tmp[0]+" is UnFollowed"
        }
        this.snackbar=true
        }
    }
}
</script>

<style>
topKeyword {
    padding-left: 48px;
}
</style>
