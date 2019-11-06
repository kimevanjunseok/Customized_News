<template>
<div class="discover">
    <v-tabs v-model="tabNo" v-if="tabNo == 0">
        <v-tab @click="goto('addcontent')"><span style="font-size: 16px; color: #2bb24c;"><v-icon class="green--text" id="rss">fas fa-rss</v-icon>Websites</span></v-tab>
        <v-tab @click="goto('addKeyword')"><span style="font-size: 16px;"><v-icon class="grey--text" id="google">fab fa-google</v-icon>Keyword alerts</span></v-tab>
    </v-tabs>
    
    <v-tabs v-model="tabNo" v-if="tabNo == 1">
        <v-tab @click="goto('addcontent')"><span style="font-size: 16px;"><v-icon class="grey--text" id="rss">fas fa-rss</v-icon>Websites</span></v-tab>
        <v-tab @click="goto('addKeyword')"><span style="font-size: 16px; color: #2bb24c;"><v-icon class="green--text" id="google">fab fa-google</v-icon>Keyword alerts</span></v-tab>
    </v-tabs>
</div>
</template>

<script>
export default {
    props: ['active_tab'],
    data() {
        return {
            tabNo: this.active_tab
        }
    },
    methods: {
        goto: function (addr) {
            this.$router.push('/' + addr)
        },
    }
}
</script>

<style>
input::-webkit-input-placeholder {
    color: #9e9e9e;
}

.fa-rss:before {
    width: 24px;
    margin-right: 4px;
    /* color: #2bb24c; */
}

.fa-google:before {
    width: 24px;
    margin-right: 4px;
}

.accent {
    background-color: #2bb24c !important;
    border-color: #2bb24c !important;
}

.v-tabs__container {
    margin-top: 36px;
}

.v-tabs__item {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 0px;
    padding-right: 16px;
}

.v-tabs__item .v-tabs__item--active #text{
    color: #2bb24c;
}

.v-tabs {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>