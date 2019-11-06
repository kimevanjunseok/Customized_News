<template>
    <v-container :grid-list-md="!$vuetify.breakpoint.xs">
        <v-layout row wrap>
          <v-flex xs6 md6>
          <h1>
            <span class="heading" id="header-title">Manage account</span>
            <div class="sub">Logged in using {{ log }}</div>
          </h1>
          </v-flex>
        </v-layout>
        <!-- card -->
        <v-layout row wrap class="cardList">
          <v-flex d-flex xs12 sm4 md3 v-for="p in pCards" :key=p.title class="pb-2">
             <ProfileCard
              :title= p.title
              :icon = p.icon
              :event= p.event
              >
              </ProfileCard>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import ProfileCard from '@/components/profile/ProfileCard'

    export default {
      components: {
        ProfileCard
      },
      data () {
        return {
          log: '',
          email: '',
          dialog: false,
          items: [
            { title: 'Home', icon: 'dashboard' },
            { title: 'About', icon: 'question_answer' }
          ],
          sDate : {
            hour : null,
            min : null,
            second : null
          },
          eDate : {
            hour : null,
            min : null,
            second : null
          },
          diffDate : {
            hour : null,
            min : null,
            second : null
          },
          pCards :[
            // { title : 'General' , icon : 'close', event : 1},
            { title : 'Recently read' , icon : 'fas fa-check', event : 1},
            { title : 'Read later' , icon : 'far fa-bookmark', event : 2},
            { title : 'Your profile' , icon : 'fas fa-user', event : 3},
            { title : 'Coming soon' , icon : 'fas fa-question', event : 4},
            { title : 'Coming soon' , icon : 'fas fa-question', event : 5},
            { title : 'Coming soon' , icon : 'fas fa-question', event : 6},
          ]
        }
      },  
        created (){
          var date= new Date();
          this.sDate.hour=date.getHours()
          this.sDate.min=date.getMinutes()
          this.sDate.second=date.getSeconds()

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              if (!user.photoURL) {
                this.log = 'Idle'
              }else if (user.photoURL.slice(0, 10) === 'https://lh') {
                this.log = 'Google'
              } else if (user.photoURL.slice(0, 27) === 'https://graph.facebook.com/') {
                this.log = 'Facebook'
              } else {
                this.log = 'Idle'
              }
            }
          })

        },
        destroyed(){
          var user=firebase.auth().currentUser

          var date= new Date();
          this.eDate.hour=date.getHours()
          this.eDate.min=date.getMinutes()
          this.eDate.second=date.getSeconds()

          this.diffDate.hour=this.eDate.hour-this.sDate.hour
          this.diffDate.min=this.eDate.min-this.sDate.min
          this.diffDate.second=this.eDate.second-this.sDate.second
          
          // console.log('before')
          firebase.firestore().collection('Users').add({
            Email : user.email,
            Uid : user.uid,
            Path : '/profile',
            enterTime : this.sDate,
            exitTime : this.eDate,
            diffTime : this.diffDate
          })
          // console.log('end')
        }
  }
</script>

<style scoped>
h1 {
  margin-top: 36px;
  margin-bottom: 36px;
}

h1 .heading {
  color: #333333;
  font-family: sans-serif;
  font-size: 2.125rem;
  font-weight: bold;
  letter-spacing: -.04em;
  line-height: 1.25em;
  margin-bottom: 3rem;
  margin-top: 3rem;
  text-align: left;
  text-transform: none;
}

h1 .sub {
  -webkit-font-smoothing: antialiased;
  color: #757575;
  font-family: sans-serif;
  font-size: 1.25rem;
  font-weight: normal;
  letter-spacing: 0;
  line-height: 1.4em;
  margin-top: 0.5rem;
  max-width: 624px;
  text-transform: none;
}

/* .cardList{
  margin-left: -8px !important;
} */
</style>
