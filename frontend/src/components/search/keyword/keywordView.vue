<template>
<div>
    <v-layout row wrap>
        <v-flex xs12>
            <span>RESULTS</span>
            <v-icon>expand_more</v-icon>
        </v-flex>
        <v-flex xs12 class="my-3">
            <!-- <v-card absolute outlined class="test"> -->
            <v-card>
                <v-card-title primary-title class="keywordCard">
                    <v-layout row wrap>
                        <v-flex xs12 wrap class="keywordTitle">
                            <span class="headline">{{keyword}}</span>
                            <keywordFollow class="follow" 
                            :keyword="keyword" 
                            :isFollowing="isFollowing"
                            @sign_KeywordFollow="update_follow"
                            >
                            </keywordFollow>
                        </v-flex>
                        <v-flex xs12 class="search-content-color">
                            <v-layout column wrap>
                                <v-flex xs12 class="mb-3 keywordResults">
                                    <span>Track mentions of "{{keyword}}" across the world's top news publications</span>
                                    <ul>
                                        <li v-for="news in keywordNews" :key="news.url">{{news.title}}</li>
                                    </ul>
                                </v-flex>
                                <v-layout row wrap class="keywordInfo">
                                    <v-flex xs2>
                                        <p>{{users_num}}</p>
                                        <span>followers</span>
                                    </v-flex>
                                    <v-flex xs2>
                                        <p>{{totalResults}}</p>
                                        <span>articles</span>

                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
import keywordFollow from '@/components/search/keyword/keywordFollow'
export default {
    props: ['keywordInfo', 'isFollowing'],
    components: {
        keywordFollow,
    },
    data() {
        return {}
    },
    watch: {
        keywordInfo: function () {
            // console.log('watch', this.keywordInfo);
        }
    },
    updated() {

    },
    methods: {
        isFollowElement(word) {
            this.isFollowing = false;
            let followSource = this.$store.state.userKeyword;
            Object.keys(followSource).forEach(element => {
                if (element == word) {
                    this.isFollowing = true;
                }
            })

        },
        update_follow(tmp){
            this.$emit('sign_keywordView',tmp)
        }
    },
    computed: {
        keyword() {
            if (this.keywordInfo != null)
                return this.keywordInfo.word;
            else return "";
        },
        keywordNews: function () {
            if (this.keywordInfo != null) {
                return this.keywordInfo.apiResponse.articles.slice(0, 3);
            } else return 3;

        },
        totalResults() {
            if (this.keywordInfo != null)
                return this.keywordInfo.apiResponse.totalResults;
            else return 0;
        },
        users_num() {
            if (this.keywordInfo != null)
                return this.keywordInfo.users_num;
            else return 0;
        }
    }
}
</script>

<style scoped>
.search-content-color {
    color: #757575;
}

.test {
    border-color: blue;
}

.keywordCard {
    padding-top: 16px;
}

.keywordTitle span {
    color: #333333;
    font-size: 16px !important;
    font-weight: 700;
    line-height: 1.25rem;
    text-transform: capitalize;
}

.keywordResults {
    margin-top: 4px;
}

.keywordResults span {
    color: #757575;
    font-size: 14px;
}

.keywordResults ul {
    margin-top: 16px;
}

.keywordResults ul li {
    color: #757575;
    font-size: 14px;
}

.keywordInfo p {
    color: #757575;
    font-size: 14px;
    margin-bottom: 0px;
    margin-right: 4rem;
}

.keywordInfo span {
    color: #9e9e9e;
    font-size: 12px;
    /* margin-bottom: 0px;
    margin-right: 4rem; */
}
</style>
