import calcDiffOfDates from './calcDiffOfDates'
import firebase from 'firebase'

export default function(user, path, enterTime, exitTime){

    if( user === null ) {
        console.log('no user');

    }else{
        firebase.firestore().collection('Users').add({
            Email : user.email,
            Uid : user.uid,
            Path : path,
            enterTime : enterTime.date,
            exitTime : exitTime.date,
            diffTime : calcDiffOfDates(enterTime, exitTime)
          })
    }
}
