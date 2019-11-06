<template>
    <v-container>
        <div class="tabs" style="height: 40px;">
            <div>
                <a class="item">
                    <span style="font-size: 16px;"><v-icon class="grey--text" id="rss">fas fa-rss</v-icon>Websites</span>
                </a>
                <a class="active item">
                    <span style="font-size: 16px;"><v-icon class="grey--text" id="google">fab fa-google</v-icon>Keyword alerts</span>
                </a>
            </div>
            <div style="display:flex; justify-content:end;">
                <a class="active item">
                    <span style="font-size: 16px;"><v-icon class="grey--text" id="google">add</v-icon>Add Category</span>
                </a>
            </div>
        </div>
        

        <!-- list -->
        <VueDraggable/>
        
        
    </v-container>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'

import VueDraggable from "../components/VueDraggable";
    export default {
        components: {
            VueDraggable
        }
    }
</script>

<style scoped>
.tabs {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 36px;
}

.tabs .item {
    color: #9e9e9e;
    cursor: pointer;
    /* display: inline; */
    display: block;
    float: left;
    font-weight: normal;
    margin-right: 16px;
    margin-bottom: -1px;
    border-bottom: 1px solid transparent;
}

input::-webkit-input-placeholder { 
    color: #9e9e9e; 
}

.fa-rss:before {
    width: 24px;
    margin-right: 4px;
}

.description {
    color: #757575;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
}

.tabs .active {
    color: #9e9e9e;
    cursor: pointer;
    /* display: inline; */
    font-weight: normal;
    margin-left: 1rem;
    margin-right: 1rem;
}

.fa-google:before {
    width: 24px;
    margin-right: 4px;
}
/* .container {
    margin: auto;
    padding: 24px;
    width: 100%;
}
#header-title {
    font-size: 2.125rem;
    font-weight: bold;
    letter-spacing: -.04em;
    line-height: 1.25em;
    text-align: left;
    text-transform: none;
}
#source-summary {
    color: #757575;
    font-size: 1.25rem;
}
#sources {
    text-decoration: underline;
    font-weight: normal;
    color: #3b3b3b;
} */


</style>
