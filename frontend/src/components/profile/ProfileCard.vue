<template>
    <v-card>
        <v-container class="cardBorder" @click="test">
          <!-- <v-divider color="primary"/> -->
            <v-card-title class="cardPadding">
          <v-layout wrap now>
            <v-flex xs10>
              <span class="black--text cardTitle">{{title}}</span>
            </v-flex>
            <v-flex xs1>
              <!-- <v-avatar> -->
                <v-icon class="cardIcon">{{icon}}</v-icon>
              <!-- </v-avatar> -->
            </v-flex>
          </v-layout>
            </v-card-title>
          <v-card-actions class="detailMore">
            <!-- <v-btn 
              small
              outline color="green green--text" 
              @click="test"
              >
              Detail More
            </v-btn> -->
          </v-card-actions>
        </v-container>
        <!-- {{event}} -->
        <div>
          <!-- <General v-if="this.dir===1"
            :drawer = parentDrawer
            @right_drawer = "update">
          </General> -->
          <Markasread v-if="this.dir===1"
            :drawer = parentDrawer
            :markasreadArticles = markasreadArticles
            @right_drawer = "update"
            @deleteMark = "dmark"
          >
          </Markasread>
          <Readlater v-else-if="this.dir===2"
            :drawer = parentDrawer
            :readlaterArticles = readlaterArticles
            @right_drawer = "update"
            @deleteReadlater = "dread"
          >
          </Readlater>
          <!-- <Read v-else-if="this.dir===4"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Read> -->
          <!-- <Appearance v-else-if="this.dir===5"
            :drawer = parentDrawer
            @right_drawer = "update">
          </Appearance> -->
          <UserSetting v-else-if="this.dir===3"
            :drawer = parentDrawer
            @right_drawer = "update">
          </UserSetting>
          <UserSetting ></UserSetting>
          <UserSetting ></UserSetting>
          <UserSetting ></UserSetting>
          

        </div>
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
    </v-card>

</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'

import General from '@/components/profile/General'
import Markasread from '@/components/profile/Markasread'
import Readlater from '@/components/profile/Readlater'
// import Read from '@/components/profile/Read'
// import Appearance from '@/components/profile/Appearance'
import UserSetting from '@/components/profile/UserSetting'
import eventBus from '../../eventBus'

export default {
  props : ['title','icon','event'],
  components: {
      General,
      Markasread,
      Readlater,
      // UserSetting,
      // Read,
      // Appearance,
      UserSetting
  },
  data(){
    return{
      parentDrawer:false,
      dir : this.event,
      // 스낵바 수정
      snackbar : false,
      y: 'bottom',
      x: 'right',
      timeout: 3000,
      text: 'Success Modify',
      navSign : false,

      markasreadArticles: null,
      readlaterArticles: null
    }
  },
  methods : {
    test(){
      this.parentDrawer = !this.parentDrawer
      eventBus.$emit("leftDrawer", !this.navSign)
      if (this.dir == 1) {
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
      } else if (this.dir == 2) {
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
      }
    },
    update(info) {
      this.parentDrawer = !this.parentDrawer
      if (info === 'save') {
        this.snackbar=true
      }
    },
    dmark(){
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
    dread(){
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
    }
  }
}
</script>

<style scoped>
.detailMore {
  /* padding: 0px; */
}

.cardIcon {
  padding-left: 10px;
  font-size: 20px;
}

.cardBorder {
  border-top: 2px solid #2bb24c;
  border-radius: 4px;
  padding-top: 60px;
  padding-bottom: 0px;
}

.cardPadding {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 32px;
  padding-bottom: 0px;
}

.cardTitle {
  font-size: 16px;
}
</style>