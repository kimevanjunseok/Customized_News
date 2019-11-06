import firebase from 'firebase'

var config = {
    // Firebase 설정에서 셋팅
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appID: "app-id",
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