<template>
<div>
  <!-- <img id="image" :src="photoURL ? imageSrc : 'http://dy.gnch.or.kr/img/no-image.jpg' " /> -->
  <img id="image" :src="imageSrc" />

  <br>
  <input @change="upload" id="hiddenEvent" type="file"/>
  <v-btn input-value outline small text--grey id="file" @click="call" type="file" style="color: #757575; border: 1px solid rgba(0, 0, 0, 0.15);">choose file</v-btn>
  <v-btn outline small text--grey @click="remove" style="color: #757575; border: 1px solid rgba(0, 0, 0, 0.15);">remove image</v-btn>
  <v-hover>
    <div slot-scope="{ hover }">
      <div v-if="hover">
        <v-btn text--grey small @click="delete_account" color="error" style="border: 1px solid rgba(0, 0, 0, 0.15);">delete account</v-btn>
      </div>
      <div v-else>
        <v-btn outline text--grey small @click="delete_account" style="color: #757575; border: 1px solid rgba(0, 0, 0, 0.15);">delete account</v-btn>
      </div>
    </div>
  </v-hover>
</div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import eventBus from '../../eventBus'

export default {
  data() {
    return {
      files: "",
      file: "",
      image: "",
      imageSrc: "http://image.auction.co.kr/itemimage/16/da/c9/16dac970b6.jpg",
    }
  },
  created() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    if (userInfo) {
      if (userInfo.user.photoURL != null && userInfo.user.photoURL != 'default') {
        this.imageSrc = userInfo.user.photoURL
      }
    } else {
      this.imageSrc = "http://image.auction.co.kr/itemimage/16/da/c9/16dac970b6.jpg"
    }
  },
  methods: {
    upload : function() {
      this.imageSrc = 'https://i.gifer.com/embedded/download/KgkV.gif'
      var file = document.getElementById("file");
      var image = document.getElementById("image");

      var target = event.currentTarget;
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true);
      xmlHttpRequest.setRequestHeader("Authorization", "Client-ID 3c8ae0de8239125");
      xmlHttpRequest.send(target.files[0]);

      xmlHttpRequest.onreadystatechange = () => {

        if (xmlHttpRequest.readyState == 4) {

          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            this.imageSrc = result.data.link;

            this.thumnail = result.data.link;

            eventBus.$emit('imgUpdate', this.imageSrc)
            
          } else {
            alert("업로드 실패");
            this.imageSrc = "http://dy.gnch.or.kr/img/no-image.jpg";
          }
        }
      }

    },
    remove() {
      this.imageSrc = "http://image.auction.co.kr/itemimage/16/da/c9/16dac970b6.jpg"

      var userinfo = firebase.auth().currentUser
      Object.defineProperty(userinfo, 'photoURL', {
        writable: true
      });
      userinfo.updateProfile ({
        photoURL: this.imageSrc,
      })
    },
    delete_account() {
      FirebaseService.Delete()
    },
    call : async function(){
      $('#hiddenEvent').click()
    }
  }
}
</script>

<style scoped>
#image {
    height: 118px;
    width: 118px;
    border-radius: 50%;
}

.picture-upload div button .v-btn__content {
  color: #757575;
} 

#hiddenEvent{
  display: none
}
</style>