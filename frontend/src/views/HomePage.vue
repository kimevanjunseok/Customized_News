<template lang="html">
<div>
    <div>
      <v-container>
        <carousel-3d :controls-visible="true" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'" 
                    :controls-width="30" :controls-height="60" :clickable="false" :width="600" :height="400"
                    :autoplay="true" :autoplay-timeout="3000" @after-slide-change="isTop(i)">
          <slide v-for="(slide, i) in slides" :index="i" style="border:0;" class="elevation-15">
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
              <img :data-index="index" :class="{ current: isCurrent }" :src="slide.img">
            </template>
          </slide>
        </carousel-3d>
        <v-layout justify-center>
          <blockquote class="blockquote" style="text-align:center; padding:20px 0 10px 0;">
            세상의 모든 뉴스를 한자리에서 받아보세요. <br><strong>"IDLE"</strong>.
          </blockquote>
        </v-layout>
        <v-layout justify-center>
          <!-- <v-btn large dark color="success">GET STARTED FOR FREE</v-btn> -->
          <signUp></signUp>
        </v-layout>
        <br>
        <br>
      </v-container>
    </div>
    <div style="background-color:#F2F2F2;">
      <br>
      <br>
      <v-container>
        <h1>FOR YOUR CONVENIENCE,</h1>
        <p class="blockquote" style="padding-left:0px;">모든 컨텐츠를 한번에 받아보세요</p>
      </v-container>
    </div>
    <div>
      <br>
      <br>
      <v-container style="text-align: right;">
        <h1>JUST FOR YOU,</h1>
      
        <p class="blockquote">원하는 키워드가 들어간 기사를 구독하세요</p>
        <v-layout row justify-end>
        </v-layout>
      </v-container>
      <br>
      <br>
    </div>
    <div style="background-color:#2bb24c;">
      <br>
      <br>
      <v-container>
        <h1 style="color:white;text-shadow: 0 0 2px #BDBDBD;">FOR YOUR PREFERENCE,</h1>
        <p class="blockquote" style="padding-left:0px;color:white;text-shadow: 0 0 2px #BDBDBD;">좋아하는 신문사의 기사를 구독하세요</p>
      </v-container>
    </div>  
      <v-layout>
      <v-flex>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import GitGraph from '../components/GitGraph'
import Footer from '../components/Footer'
import signUp from '../components/signUp'
import { Carousel3d, Slide } from 'vue-carousel-3d';


//user log
import timeCheck from '../timeCheck'
import userLog from '../userLog'
export default {
  data(){
    return {
      sDate : null,
      eDate : null,
      path : '/',
      words:null,
      slides : [
        {
          img:'https://user-images.githubusercontent.com/45934061/62856062-d8812b80-bd2e-11e9-8739-80e5f83a1658.PNG',
          },
        {
          img:'https://user-images.githubusercontent.com/45934061/62918418-81389500-bdda-11e9-8689-4259ba433019.PNG',
          },
        {
          img:'https://user-images.githubusercontent.com/45934061/62986291-cfe73d00-be75-11e9-9d1e-f4bced14a91c.PNG',
          },
      ]
    }
  },
  components: {
    Carousel3d,
    Slide,
    signUp
  },
  created (){
    this.sDate = timeCheck()
    this.visitorCheck()
   },
   mounted(){
     this.loadAutoComplete()

     var filePath = 'https://raw.githubusercontent.com/dwyl/autocomplete/master/words.txt'
     var words = this.loadFile(filePath)
     this.words = words.split('\n')

   },
  destroyed(){
    this.eDate = timeCheck()
    //save user log on firebase
    var user=firebase.auth().currentUser
    userLog(user, this.path, this.sDate, this.eDate)
  },
  methods: {
    loadAutoComplete: function() {
      new Autocomplete('#autocomplete', {
        search: input => {
          if (input.length < 2) {
            return []
          }
          return this.words.filter(country => {
            return country.toLowerCase()
              .startsWith(input.toLowerCase())
          })
        }
      })
    },
    loadFile : function(filePath) {
      var result = null;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", filePath, false);
      xmlhttp.send();
      if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
      }
      return result;
    },
    visitorCheck () {
      if (!sessionStorage.getItem('recentlyVisitor')) {
        // db에 update
        const time = new Date()
        const date = time.getFullYear() + (time.getMonth() > 8 ? time.getMonth()+1 : '0'+(time.getMonth()+1)) + (time.getDate()>9 ? time.getDate() : '0'+time.getDate())
        
        firebase.firestore().collection('visitorStat').get().then(res => {
          var judge = false
          res.docs.some(doc => {
            if (doc.id === date) {
              judge = true
              return true
            }
          })

          if (judge) {
            firebase.firestore().collection('visitorStat').doc(date).update({
              totalVisitor: firebase.firestore.FieldValue.increment(1)
            })
          } else {
            firebase.firestore().collection('visitorStat').doc(date).set({
              newCreatedUser: 0,
              totalUser: 0,
              totalVisitor: 1,
            })
          }

        })

        // firestore().collection('visitorStat').
        // 중복을 피하기 위해 session storage에 값 추가
        sessionStorage.setItem('recentlyVisitor', true)
      }
    },
  }
}
</script>

<style lang="css" scoped>
/* #autocomplete {
  width: 100%;
  height: 56px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.autocomplete-input {
  width: 100%;
} */

.autocomplete-input{
    border:1px solid #eee;
    border-radius:8px;
    width:100%;
    padding:12px 12px 12px 48px;
    box-sizing:border-box;
    position:relative;
    font-size:16px;
    line-height:1.5;
    flex:1;
    background-color:#fff;
    background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+");
    background-repeat:no-repeat;
    background-position:12px
}
    
.autocomplete-input:focus,.autocomplete-input[aria-expanded=true]{
    /* border-color:rgba(0,0,0,.12); */
    border-color: #2bb24c;
    background-color:#fff;
    outline:none;
    box-shadow:0 2px 2px rgba(0,0,0,.16)
}[data-position=below] 

.autocomplete-input[aria-expanded=true]{
    border-bottom-color:transparent;
    border-radius:8px 8px 0 0
}[data-position=above] 

.autocomplete-input[aria-expanded=true]{
    border-top-color:transparent;
    border-radius:0 0 8px 8px;
    z-index:2
}

.autocomplete[data-loading=true]:after{
    content:"";
    border:3px solid rgba(0,0,0,.12);
    border-right-color:rgba(0,0,0,.48);
    border-radius:100%;
    width:20px;
    height:20px;
    position:absolute;
    right:12px;
    top:50%;
    transform:translateY(-50%);
    animation:rotate 1s linear infinite
}

.autocomplete-result-list{
    margin:0;
    /* border:1px solid rgba(0,0,0,.12); */
    padding:0;
    box-sizing:border-box;
    max-height:296px;
    overflow-y:auto;
    background:#fff;
    list-style:none;
    box-shadow:0 2px 2px rgba(0,0,0,.16)
}[data-position=below] 

.autocomplete-result-list{
    margin-top:-1px;
    border-top-color:transparent;
    border-radius:0 0 8px 8px;
    padding-bottom:8px
}[data-position=above] 

.autocomplete-result-list{
    margin-bottom:-1px;
    border-bottom-color:transparent;
    border-radius:8px 8px 0 0;
    padding-top:8px
}

.autocomplete-result{
    cursor:default;
    padding:12px 12px 12px 48px;
    background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+");
    background-repeat:no-repeat;
    background-position:12px
}
    
.autocomplete-result:hover,.autocomplete-result[aria-selected=true]{
    /* background-color:rgba(0,0,0,.06) */
    background-color: #fff
}

@keyframes rotate{0%{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(359deg)}}
</style>