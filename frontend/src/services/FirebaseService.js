import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBtTyQwI0xLNukBEnzvF-BRbGHhd6LPXIE",
    authDomain: "test1-e4911.firebaseapp.com",
    databaseURL: "https://test1-e4911.firebaseio.com",
    projectId: "test1-e4911",
    storageBucket: "test1-e4911.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SEND_ID"
};
  
firebase.initializeApp(config)

export default {
    data () {
        return {
        }
    },
    Logout() {
        firebase.auth().signOut().then(() => {
            alert('로그아웃되었습니다.')
        }).catch(function(error) {
            // An error happened.
        });
    },
    Delete() {
        var user = firebase.auth().currentUser;
        const areYouSure = confirm('정말로 계정을 삭제하시겠어요?')
        if (areYouSure) {
            alert('좋은 하루 보내시길 바라며 \nidle에 불편한 점이 있으시다면 고객상담실로 연락주세요.')
            sessionStorage.removeItem('userInfo')
            user.delete().then().catch(alert);
            window.location.href = '/';
        } else {
            alert('idle에 불편한 점이 있으시다면 \n고객상담실로 연락주세요.')
        }
        // User deleted.
        
        // this.$router.push("/")
        // An error happened.
    },
    // Userstatus() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (!user) {
    //             this.$router.push('/')
    //         }
    //     })
    // }
}