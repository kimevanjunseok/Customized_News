<template>
<v-container grid-list-xs class="topkeywordBox">
    <v-layout column>
        <v-flex xs12>
            <v-subheader class="topkeywordTitle"><strong>Top Keyword</strong></v-subheader>
        </v-flex>
        <v-layout row wrap>
            <v-flex class="my-1" v-for="item in items" :key="item">
                <span class="topsource-item px-2 py-1 mouse"
                    @click="topKeywordOnClick(item)">{{item}}
                </span>
            </v-flex>

        </v-layout>
    </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            item: 1,
            items: []
        }
    },
    created() {
        this.loadTopKeywords();

    },
    methods: {
        topKeywordOnClick(item){
            this.$router.push('/addKeyword/' + item)
        },
        loadTopKeywords() {
            firebase.firestore().collection('Keyword').orderBy("users_num", 'desc').limit(10).get() 
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        this.items.push(doc.id)
                    })
                })
        }
    }

}
</script>

<style>
.topkeywordBox {
    padding-left: 20px;
}

.topkeywordTitle {
    padding: 0px;
    height: 38px;
}

.topsource-item{
    border: #9e9e9e 1px solid;
    border-radius: 5px;
    color:#9e9e9e;
}
</style>
