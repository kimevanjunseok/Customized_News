<template lang="html">
  <v-container>
    <v-layout>
      <v-flex>
            <searchOptionSelector
             :active_tab = parentActive_tab
            >
            </searchOptionSelector>
                <v-flex my-5 xs9>
                    <div>
                        <p class="description">Discover the best sources for any topic</p>
                    </div>
                    <!-- search-box start -->
                    <div id="autocomplete" class="autocomplete">
                        <input v-model="input" 
                              id="input-search"
                              class="autocomplete-input" 
                              placeholder="Search by topic" 
                              aria-label="Search by topic" 
                              autofocus
                              @keyup.enter="search">
                        <ul class="autocomplete-result-list"></ul>
                    </div>
                    <!-- search-box end -->
                </v-flex>
      </v-flex>
    </v-layout>
    <!-- 메인에서 안보이게 처리 -->
    <v-layout row wrap v-if="resultSearch.length >= 1">
      <v-flex xs9>
         <sourceList 
         :sourceData="resultSearch" 
         :searchKey="input"
         @sign_sourceList="update_follow"
         ></sourceList>
      </v-flex>
      <v-flex xs3>
        <topSource></topSource>
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
import 'firebase/firestore'
import sourceList from '@/components/search/source/sourceList'
import searchOptionSelector from '@/components/search/searchOptionSelector'
import topSource from '@/components/search/source/topSource'
import env from '../../../env.js'

//user log
import timeCheck from '@/timeCheck'
import userLog from '@/userLog'



export default {
  components:{
    sourceList, searchOptionSelector, topSource
  },
  props:['searchWord'],
  data (){
    return {
      sDate : null,
      eDate : null,
      path : '/',
      words:null,
      
      // autocomplete
      input:"",
      sources:[],
      sourceNames:[],
      resultSearch:[],
      
      parentActive_tab: 0,
      noFeeds: 'No feeds with matching titles.',

      snackbar : false,
      y: 'bottom',
      x: 'right',
      timeout: 3000,
      text: '',

      searchByInput :false,
    }
  },
  watch:{
    searchWord:function(newVal){
      this.input = newVal;
      this.searchByInput = false;
      this.search();
      this.searchByInput = true;
    }
  },
  created (){
    this.init()
    this.sDate = timeCheck()
    window.onload = function() {
        var input = document.getElementById("autocomplete").focus();
    }
   },
   async mounted(){
  //  신문사 정보 axios로 받아오기
     await this.getSources()
     this.loadAutoComplete()
  
  //navbar에서 검색했을 때 router url 파라메터로 어떤 입력했는지 받아와서 검색실행
    this.input = this.searchWord;
    if( this.searchWord != null){
      this.searchByInput = false;
      this.search();
    }
    this.searchByInput = true;
   },
  destroyed(){
    this.eDate = timeCheck()
    //save user log on firebase
    var user=firebase.auth().currentUser
    userLog(user, this.path, this.sDate, this.eDate)
  },
  // const newsapi = new NewsAPI('8b64e14d415f40f2a7d2969321afc5f9'); // 07/13 16:00
// const newsapi = new NewsAPI('2dc4b8b9d26f4a6b97e21a1f282bac9d'); //hojin : 07/31 23:00
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
    async getSources(){
    await this.$axios.get('https://newsapi.org/v2/sources?apiKey='+env.data().api)
      .then( r=> {
        this.sources = r.data.sources           
        })
        this.sourceNames = []
        this.sources.forEach(element => {
        this.sourceNames.push(element.name)
        });
    },
    search(){
      if( this.searchByInput ) {
        this.input=$('#input-search').val();
      }
      // var input = document.getElementById("input-search").value
      
      // if( this.searchWord != null ) input = this.searchWord;
      

      // 검색 결과 분기
      if (!this.input) {
        // 검색어 없는 경우
        this.resultSearch = this.noFeeds
      } else if (this.input.length == 1) {
        // 너무 짧은 경우
        this.resultSearch = this.noFeeds
      } else {
        this.resultSearch = []
        this.sources.forEach(element =>{
          if( element.name.toLowerCase().indexOf(this.input.toLowerCase()) != -1 ){
            this.resultSearch.push(element)
          }
        })
      }
    },
    loadAutoComplete: function() {
      // console.log(this.sourceNames);
      
      new Autocomplete('#autocomplete', {
        search: input => {
          if (input.length < 2) {
            return []
          }
          return this.sourceNames.filter(source => {
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
        //  console.log("addcontent unfollow", tmp)
         this.text=tmp[0]+" is UnFollowed"
       }
       this.snackbar=true
    }
  }
}
</script>

<style lang="css" scoped>
topSource {
  padding-left: 48px;
}
</style>