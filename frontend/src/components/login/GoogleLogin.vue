<template>
    <div>
        <v-btn round color="#df4a31" dark v-on:click="GoogleLogin">Google Login</v-btn>
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
        Google: async function() {
            let provider = new firebase.auth.GoogleAuthProvider()
            await firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
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
        GoogleLogin: async function() {
            await this.Google()
            var user = firebase.auth().currentUser
            if (user) {
                firebase.firestore().collection('Userinfo').doc(user.uid).get().then(res => {
                    const judge = res.exists
                    if (!judge) {
                        firebase.firestore().collection('Userinfo').doc(user.uid).set({
                            keyword: {},
                            markasread: [],
                            readlater: [],
                            sourceFollow : [],
                            follow : {},
                        })   
                    }
                })
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
