<template>
<div>
    <v-layout row wrap>
        <v-flex xs12>
            <v-layout row wrap v-if="sourceData == 'No feeds with matching titles.'">
                <v-flex xs12>
                    {{sourceData}}
                </v-flex>
            </v-layout>

            <v-layout row wrap v-else>
                <v-flex xs12>
                    <span>SORTING BY FEEDLY SCORE</span>
                    <v-icon>expand_more</v-icon>
                </v-flex>
                <v-flex xs12 class="my-3" v-for="(source,idx) in sourceData" :key="source.id">
                    <Source class="source" 
                    :source = source
                    :idx = idx
                    @sign_Source="update_follow"
                    >
                    </Source>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
import firebase from 'firebase'
import Source from '@/components/search/source/Source'
export default {
    props: ['sourceData', 'searchkey'],
    components: {
        Source,
    },
    // watch: {
    //     sourceData: function() {
    //         console.log('sourceData from sourceList.vue', this.sourceData)
    //     }
    //     // console.log('sourceData from sourceList.vue', this.sourceData)
    // },
    mounted() {
        
    },
    methods: {
        call: async function (source) {
            var jsonData = {};
            var jsonKey = source.id;
            var jsonValue = 'news';
            jsonData[jsonKey] = jsonValue;
            var user = firebase.auth().currentUser
            firebase.firestore().collection('Userinfo').doc(user.uid).get()
                .then(r => {
                    jsonData = r.data().follow;
                    jsonData[jsonKey] = jsonValue;
                    firebase.firestore().collection('Userinfo').doc(user.uid).update({
                        follow: jsonData
                    })
                })
        },
        follow(sourceId) {
            // 현재 구독중인 정보를 받아오고 구독할 신문사를 추가하여 db에 update한다.
            var userId = firebase.auth().currentUser.email;
            var userSources = [];
            firebase.firestore().collection('Userinfo').doc(userId).get()
                .then(doc => {
                    userSources = doc.data().sources;
                    userSources.push(sourceId);
                    firebase.firestore().collection('Userinfo').doc(userId).update({
                        sources: userSources
                    })
                })
        },
         update_follow(tmp){
             this.$emit('sign_sourceList',tmp)
        }
    }
}
</script>