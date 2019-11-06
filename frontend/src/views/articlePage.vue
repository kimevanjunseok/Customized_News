<template lang="html">
  <articles/>
</template>

<script>
import articles from '../components/article/article.vue'
import firebase from 'firebase'
import 'firebase/firestore'

//user log
import timeCheck from '../timeCheck'
import userLog from '../userLog'

export default {
  components: {
    articles,
  },
  data (){
    return {
        sDate : null,
        eDate : null,
        path : '/article'
    }
  },
  created (){
    this.sDate= timeCheck()
   },
  destroyed(){
    this.eDate= timeCheck()

    var user=firebase.auth().currentUser
    userLog(user, this.path, this.sDate, this.eDate)

  }

}
</script>

<style lang="css" scoped>
</style>
