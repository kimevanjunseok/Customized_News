<template>
    <div>
        <v-btn round color="blue" dark v-on:click="FacebookLogin">Facebook Login</v-btn>
    </div>
</template>


<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

export default {
    data () {
        return {
        }
    },
    methods: {
        Facebook: async function() {
            var provider = new firebase.auth.FacebookAuthProvider();
            await firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = {user : result.user};

                alert('Well done ! You are now connected')

                sessionStorage.setItem('userInfo', JSON.stringify(user))
                this.$store.commit('imageSoruceUpdate', user.photoURL) 

            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

        },
        FacebookLogin: async function() {
            await this.Facebook()
            var user = firebase.auth().currentUser
            if (user) {
                const time = new Date()
                const date = time.getFullYear() + (time.getMonth() > 8 ? time.getMonth()+1 : '0'+(time.getMonth()+1)) + (time.getDate()>9 ? time.getDate() : '0'+time.getDate())
                firebase.firestore().collection('visitorStat').doc(date).update({
                    totalUser: firebase.firestore.FieldValue.arrayUnion(user.email),
                })
                window.location.href = '/';
            }
        }
    }
}
</script>
