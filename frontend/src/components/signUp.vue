<template>
<div>
    <v-btn large dark color="success" @click.stop="dialog1 = true">
        GET STARTED FOR FREE
    </v-btn>
                    <v-dialog v-model="dialog1" max-width="500">
                        <v-card>
                            <v-card-title class="headline">Sign Up</v-card-title>
                            <v-card-text>
                                <v-text-field  
                                            :rules="[rules.emailMatch]" 
                                            name="input-10-2" 
                                            label="Email Address" 
                                            hint="input your email address" 
                                            v-model="email"
                                            color="green"
                                            @keyup.enter="SignUp"
                                           ></v-text-field>
                                <v-text-field :append-icon="pwShow ? 'visibility' : 'visibility_off'" 
                                            :rules="[rules.required, rules.same, rules.min]" 
                                            :type="pwShow ? 'text' : 'password'" 
                                            name="input-10-2" 
                                            label="Password" 
                                            hint="At least 6 characters" 
                                            v-model="password"
                                            color="green"
                                            @click:append="pwShow = !pwShow"
                                            @keyup.enter="SignUp"
                                            ></v-text-field>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn color="green darken-1" flat="flat" v-on:click="SignUp">
                                    Sign Up
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
</div>
</template>

<script>
import firebase, { firestore, functions, auth }  from 'firebase'
import {
    async
} from 'q';


export default {
    data() {
        return {
            user: '',
            userInfo: '',
            email: '',
            password: '',
            signupemail: '',
            signuppassword: '',
            dialog1: false,
            dialog2: false,
            
            pwShow : false,
            repeatPassword : '',
            loginErrorMessage : ' ',
            // password: 'Password',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 6 || 'Min 6 characters',
                same : v=> v == this.password || '비밀번호가 일치하지 않습니다.',
                emailMatch : v=>{
                  var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                  if (regExp.test(v)) return true;
                  else return 'email 형식이 맞지 않아요';
                }
                // emailMatch: () => ('The email and password you entered don\'t match'),
            },
        }
    },
    methods: {
        Login: async function () {
            await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    alert('로그인되었습니다. \nIDLE과 함께 똑똑한 하루 보내세요!')
                    sessionStorage.setItem('userInfo', JSON.stringify(user))
                    this.user = user.user

                    // admin인지 확인하는 과정을 거치고나서
                    auth().onAuthStateChanged(function(user) {
                        user.getIdTokenResult().then(idTokenResult => {
                            if (idTokenResult.claims.admin === true) {
                                sessionStorage.setItem('IsAdmin', true)
                            } else {
                                sessionStorage.setItem('IsAdmin', false)
                            }
                        })
                    })

                    // 방문자체크
                    this.visitorCheck()
                    this.email = ''
                    this.password = ''
                    
                    firebase.firestore().collection("Userinfo").doc(this.user.uid).get()
                        .then(r => {
                            const tmp = r.data()
                            sessionStorage.setItem('categories', JSON.stringify(tmp))
                            window.location.href = '/';
                        })
                },
                (err) => {
                    if( err.code == 'auth/invalid-email'){
                        console.log('uth/invalid-email');
                        this.loginErrorMessage = '잘못된 이메일 형식입니다.';
                    }else if( err.code == 'auth/user-disabled'){
                        console.log('auth/user-disabled');
                        this.loginErrorMessage = '이용 불가 계정입니다.';
                    }else if(err.code == 'auth/user-not-found'){
                        console.log('auth/user-not-found');
                        this.loginErrorMessage = '회원가입 되지 않은 이메일입니다.';
                    }else if(err.code == 'auth/wrong-password'){
                        console.log('auth/wrong-password');
                        this.loginErrorMessage = '잘못된 비밀번호 입니다.';
                    }
                    alert('Oops, ' + this.loginErrorMessage)

                    this.dialog2 = true
                }
            )
        },
        SignUp: function () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (cred, user) => {
                    alert('회원가입되었습니다. \n잠깐 기다리시면 자동으로 로그인됩니다.')
                    const time = new Date()
                    const date = time.getFullYear() + (time.getMonth() > 8 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)) + (time.getDate() > 9 ? time.getDate() : '0' + time.getDate())
                    firebase.firestore().collection('visitorStat').doc(date).update({
                        newCreatedUser: firebase.firestore.FieldValue.increment(1),
                    })
                    this.Login()
                    this.dialog1 = false
                    firebase.firestore().collection('Userinfo').doc(cred.user.uid).set({
                        keyword: {},
                        markasread: [],
                        readlater: [],
                        sourceFollow: [],
                        follow: {},
                    })
                },
                (err) => {
                    alert('Oops, ' + err.message)
                    this.dialog1 = true
                }
            );
        },
        Enter: function () {
            if (window.event.keyCode == 13) {
                Login();
            }
        },
        visitorCheck () {
            const time = new Date()
            const date = time.getFullYear() + (time.getMonth() > 8 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)) + (time.getDate() > 9 ? time.getDate() : '0' + time.getDate())
            firebase.firestore().collection('visitorStat').doc(date).update({
                totalUser: firebase.firestore.FieldValue.arrayUnion(this.user.email),
            })
        },
    },
    created() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    watch: {
        dialog1: function () {
            if (!this.dialog1) {
                this.email = '';
                this.password = '';
                this.repeatPassword = '';

            }
        },
        dialog2: function () {
            if (!this.dialog2) {
                this.email = '';
                this.password = '';
                this.repeatPassword = '';
            }
        }
    }

}
</script>
<style scoped>
.errorMessage{
    color : red;
}
</style>