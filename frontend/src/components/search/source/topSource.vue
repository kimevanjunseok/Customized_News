<template>
<v-container grid-list-xs class="topsourceBox">
    <v-layout column>
        <v-flex xs12>
            <v-subheader class="topsourceTitle"><strong>Top Source</strong></v-subheader>
        </v-flex>
        <v-layout row wrap>
            <v-flex class="my-1" v-for="item in items" :key="item">
                <span class="topsource-item px-2 py-1 mouse"
                    @click="topSourceOnClick(item)">{{item}}
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
        this.loadTopSources();

    },
    methods: {
        topSourceOnClick(item){
            this.$router.push('/addcontent/' + item)
        },
        loadTopSources() {
            firebase.firestore().collection('Sources').orderBy("users_num", 'desc').limit(10).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        
                        this.items.push(doc.data().news_title)
                    })
                })
        }
    }

}
</script>

<style>
.topsourceBox {
    padding-left: 20px;
}

.topsourceTitle {
    height: 38px;
    padding: 0px;
}

.topsource-item{
    border: #9e9e9e 1px solid;
    border-radius: 5px;
    color:#9e9e9e;
}
</style>
