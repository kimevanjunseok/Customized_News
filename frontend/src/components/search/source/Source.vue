<template>
<v-card>
    <v-card-title primary-title class="sourceCard">
        <v-layout row wrap>
            <v-flex xs10 class="sourceTitle" style="height : 50px">
                <p class="headline">{{source.name}}</p>
                <a v-bind:href="source.url" target="_blank">{{source.url}}</a>
            </v-flex>
            <v-flex xs2>
                <follow class="follow" 
                :news="source"
                :idx="idx"
                @sign_follow="update_follow">
                </follow>
            </v-flex>
            <v-flex xs12>
                <v-layout row wrap class="sourceDescription">
                    <v-flex xs12>
                        <p>{{source.description}}</p>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card-title>
    <!-- <v-card-actions>
    </v-card-actions> -->
</v-card>
</template>

<script>
import follow from '@/components/search/source/follow'

export default {
    props: ['source','idx'],
    components: {
        follow
    },
    methods : {
        update_follow(tmp){
            this.$emit('sign_Source',tmp)
        }
    }

}
</script>

<style scoped>
.sourceCard {
    padding-top: 16px;
}
.sourceTitle p {
    color: #333333;
    font-size: 16px !important;
    font-weight: 700;
    line-height: 1.25rem;
    text-transform: capitalize;
    margin-bottom: -8px;
}

.sourceUrl {
    color: #9E9E9E !important;
    font-size: 14px;
}

.sourceDescription {
    margin-top: 12px;
}

.sourceDescription p {
    margin-bottom: 0px;
}
</style>
