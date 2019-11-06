<template>
<div>
  <!-- <img id="image" :src="photoURL ? imageSrc : 'http://dy.gnch.or.kr/img/no-image.jpg' " /> -->
  <img id="image" :src="imageSrc" />
  <br>
  <input @change="upload" id="hiddenEvent" type="file"/>
  <v-btn input-value outline small text--grey id="file" @click="call" type="file" style="color: #757575; border: 1px solid rgba(0, 0, 0, 0.15);">choose file</v-btn>
  <v-btn outline small text--grey @click="remove" style="color: #757575; border: 1px solid rgba(0, 0, 0, 0.15);">remove image</v-btn>
  <v-btn outline small text--grey @click="delete_account" style="color: #757575; border: 1px solid rgba(0, 0, 0, 0.15);">delete account</v-btn>
</div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

export default {
  data() {
    return {
      files: "",
      file: "",
      image: "",
      imageSrc: "https://source.unsplash.com/random",
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.photoURL != null) this.imageSrc = user.photoURL
        else this.imageSrc = "https://source.unsplash.com/random"
      } else {
        this.imageSrc = "https://source.unsplash.com/random"
      }
    });
  },
  methods: {
    upload : function() {
      var file = document.getElementById("file");
      var image = document.getElementById("image");

      var target = event.currentTarget;
      // console.log(target.files)
      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true);
      // console.log(xmlHttpRequest)
      xmlHttpRequest.setRequestHeader("Authorization", "Client-ID 3c8ae0de8239125");
      xmlHttpRequest.send(target.files[0]);

      xmlHttpRequest.onreadystatechange = () => {

        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            var result = JSON.parse(xmlHttpRequest.responseText);
            this.imageSrc = result.data.link;
            // console.log(this.imageSrc)

            var userinfo = firebase.auth().currentUser

            Object.defineProperty(userinfo, 'photoURL', {
              writable: true
            });

            this.thumnail = result.data.link;
                        

            // userinfo.photoURL = this.imageSrc
            // console.log(userinfo);

            // console.log(firebase.auth().currentUser);
            userinfo.updateProfile ({
              photoURL: this.imageSrc,
            })
          } else {
            alert("업로드 실패");
            this.imageSrc = "http://dy.gnch.or.kr/img/no-image.jpg";
          }
        }
        // console.log(target.files[0])
      };

    },
    remove() {
      // console.log("remove")
      this.imageSrc = "https://source.unsplash.com/random"

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

<style>
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