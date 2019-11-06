<template>
    <v-container class="category_container">
        <h1 class="category_h1">Organize Feeds</h1>
        <v-select
            v-model="select_name_model"
            return-object
            :items="select_name"    
            solo
        ></v-select>

        <v-card
            class="mx-auto"
            tile
        >
            <v-list two-line v-if="select_name_model == 'ALL'">

                <v-layout style="height:64px">
                    <v-flex xs7>
                        <v-subheader>
                            <h3>SOURCE NAME</h3> 
                        </v-subheader>
                    </v-flex>
                    <v-layout v-show="source_checkboxList.length > 0">
                        <v-flex xs5>
                            <v-select class="select" v-model="move_categoty_source_model" :items="move_categoty"></v-select>
                        </v-flex>
                        <v-flex xs4 justify-end>
                            <v-btn class="category_btn" flat color="green" @click="category_move(move_categoty_source_model, source_checkboxList, 'source')">category move</v-btn>
                        </v-flex>
                    </v-layout>
                </v-layout>

                <v-layout style="padding-left:16px">
                    <v-flex xs1/>
                    <v-flex xs4>name</v-flex>
                    <v-flex xs3>feed name</v-flex>
                    <v-flex xs1><p></p></v-flex>
                </v-layout>
                
                <div v-for="item in category_structure_source"> 
                    <v-list-tile>
                        <v-layout>
                            <!-- 체크박스 -->
                            <v-flex xs1><v-checkbox v-model="source_checkboxList" :value="item[0]"></v-checkbox></v-flex>
                            <!-- 등록된 source 이름 -->
                            <v-flex xs4><v-list-tile-content>
                                {{item[0]}}
                            </v-list-tile-content></v-flex>
                            <!-- 해당 source가 등록되어있는 category 이름 -->
                            <v-flex xs3 align-self-center style="padding-left:8px">
                                <v-list-tile-sub-content>
                                    {{ item[1] }}
                                </v-list-tile-sub-content>
                            </v-flex>
                            <v-spacer/>
                            <v-flex xs1 align-self-center>
                                <v-list-tile-action> 
                                    <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                                </v-list-tile-action>
                            </v-flex>
                        </v-layout>
                    </v-list-tile>
                    
                </div>

                <v-divider></v-divider>

                <v-layout style="height:64px">
                    <v-flex xs7>
                        <v-subheader>
                            <h3>KEYWORD NAME</h3> 
                        </v-subheader>
                    </v-flex>
                    <v-layout v-show="keyword_checkboxList.length > 0">
                        <v-flex xs5>
                            <v-select class="select" v-model="move_categoty_keyword_model" :items="move_categoty"></v-select>
                        </v-flex>
                        <v-flex xs4 justify-end>
                            <v-btn class="category_btn" flat color="green" @click="category_move(move_categoty_keyword_model, keyword_checkboxList, 'keyword')">category move</v-btn>
                        </v-flex>
                    </v-layout>
                </v-layout>

                <v-layout style="padding-left:16px">
                    <v-flex xs1/>
                    <v-flex xs4>name</v-flex>
                    <v-flex xs3>feed name</v-flex>
                    <v-flex xs1><p></p></v-flex>
                </v-layout>

                <div v-for="item in category_structure_keyword">
                    <v-list-tile>
                        <v-layout>
                            <!-- 체크박스 -->
                            <v-flex xs1><v-checkbox v-model="keyword_checkboxList" :value="item[0]"/></v-flex>
                            <!-- 등록된 source 이름 -->
                            <v-flex xs4><v-list-tile-content>
                                {{item[0]}}
                            </v-list-tile-content></v-flex>
                            <!-- 해당 source가 등록되어있는 category 이름 -->
                            <v-flex xs3 align-self-center style="padding-left:8px">
                                <v-list-tile-sub-content>
                                    {{ item[1] }}
                                </v-list-tile-sub-content>
                            </v-flex>
                            <v-spacer/>
                            <v-flex xs1 align-self-center>
                                <v-list-tile-action> 
                                    <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                                </v-list-tile-action>
                            </v-flex>
                        </v-layout>
                    </v-list-tile>
                </div>
            </v-list>

            <v-list two-line v-else>
                <v-layout style="height:64px">
                    <v-flex xs7>
                        <v-subheader>
                            <h3>SOURCE NAME</h3> 
                        </v-subheader>
                    </v-flex>
                    <v-layout v-show="source_checkboxList.length > 0">
                        <v-flex xs5>
                            <v-select class="select" v-model="move_categoty_source_model" :items="move_categoty"></v-select>
                        </v-flex>
                        <v-flex xs4 justify-end>
                            <v-btn class="category_btn" flat color="green" @click="category_move(move_categoty_source_model, source_checkboxList, 'source')">category move</v-btn>
                        </v-flex>
                    </v-layout>
                </v-layout>

                <v-layout style="padding-left:16px">
                    <v-flex xs1/>
                    <v-flex xs4>name</v-flex>
                    <v-flex xs3>feed name</v-flex>
                    <v-flex xs1><p></p></v-flex>
                </v-layout>

                <div v-for="item in category_structure_source"> 
                    <v-list-tile v-show="select_name_model == item[1]">
                        <v-layout>
                            <!-- 체크박스 -->
                            <v-flex xs1> <v-checkbox v-model="source_checkboxList" :value="item[0]"/></v-flex>
                            <!-- 등록된 source 이름 -->
                            <v-flex xs4><v-list-tile-content>
                                {{item[0]}}
                            </v-list-tile-content></v-flex>
                            <!-- 해당 source가 등록되어있는 category 이름 -->
                            <v-flex xs3 align-self-center style="padding-left:8px">
                                <v-list-tile-sub-content>
                                    {{ item[1] }}
                                </v-list-tile-sub-content>
                            </v-flex>
                            <v-spacer/>
                            <v-flex xs1 align-self-center>
                                <v-list-tile-action> 
                                    <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                                </v-list-tile-action>
                            </v-flex>
                        </v-layout>
                    </v-list-tile>
                </div>

                <v-divider></v-divider>

                <v-layout style="height:64px">
                    <v-flex xs7>
                        <v-subheader>
                            <h3>KEYWORD NAME</h3> 
                        </v-subheader>
                    </v-flex>
                    <v-layout v-show="keyword_checkboxList.length > 0">
                        <v-flex xs5>
                            <v-select class="select" v-model="move_categoty_keyword_model" :items="move_categoty"/>
                        </v-flex>
                        <v-flex xs4 justify-end>
                            <v-btn class="category_btn" flat color="green" @click="category_move(move_categoty_keyword_model, keyword_checkboxList, 'keyword')">category move</v-btn>
                        </v-flex>
                    </v-layout>
                </v-layout>

                <v-layout style="padding-left:16px">
                    <v-flex xs1/>
                    <v-flex xs4>name</v-flex>
                    <v-flex xs3>feed name</v-flex>
                    <v-flex xs1><p></p></v-flex>
                </v-layout>

                <div v-for="item in category_structure_keyword">
                    <v-list-tile v-show="select_name_model == item[1]">
                        <v-layout>
                            <!-- 체크박스 -->
                            <v-flex xs1><v-checkbox v-model="keyword_checkboxList" :value="item[0]"/></v-flex>
                            <!-- 등록된 source 이름 -->
                            <v-flex xs4><v-list-tile-content>
                                {{item[0]}}
                            </v-list-tile-content></v-flex>
                            <!-- 해당 source가 등록되어있는 category 이름 -->
                            <v-flex xs3 align-self-center style="padding-left:8px">
                                <v-list-tile-sub-content>
                                    {{ item[1] }}
                                </v-list-tile-sub-content>
                            </v-flex>
                            <v-spacer/>
                            <v-flex xs1 align-self-center>
                                <v-list-tile-action> 
                                    <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                                </v-list-tile-action>
                            </v-flex>
                        </v-layout>
                    </v-list-tile>
                </div>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import { async } from 'q';

export default {
    data() {
        return {
            items: [],
            selection: [],
            category_name: [],
            category_structure_source: [],
            category_structure_keyword: [],
            select_name: ["ALL"],
            select_name_model: "ALL",
            source_checkboxList: [],
            keyword_checkboxList: [],
            move_categoty: [],
            move_categoty_source_model: '',
            move_categoty_keyword_model: '',
        }
    },
    methods: {
        category_move (title, List, type) {
            let userUid = JSON.parse(sessionStorage.getItem('userInfo')).user.uid
            let db = firebase.firestore().collection('Userinfo').doc(userUid);

            if (type === 'source') {
                for (var i in List) {
                    this.$store.state.followSource[List[i]] = title
                }
                db.update({
                    follow: this.$store.state.followSource
                })
                this.$store.commit('loadRes')

            } else if (type === 'keyword') {
                for (var i in List) {
                    this.$store.state.userKeyword[List[i]] = title
                }
                db.update({
                    keyword: this.$store.state.userKeyword
                })
                this.$store.commit('loadRes')
            }

            sessionStorage.setItem('categories' , JSON.stringify({
                "follow": this.$store.state.followSource,
                "keyword": this.$store.state.userKeyword,
            }))
            this.items = this.$store.state.followList

            this.source_checkboxList = []
            this.keyword_checkboxList = []

        },
        category_delete(name, type) {
            let userUid = JSON.parse(sessionStorage.getItem('userInfo')).user.uid
            let db = firebase.firestore().collection('Userinfo').doc(userUid);
            const select = confirm('삭제하시겠습니까?')
            if (select) {
                // vuex에서 삭제하는 코드
                if (type == this.$store.state.keywordSubTitle) {
                    //keyword 요소를 drag 했을 때.
                    delete this.$store.state.userKeyword[name]
                    db.update({
                        keyword: this.$store.state.userKeyword
                    })
                    this.$store.commit('loadRes')
                } else if (type == this.$store.state.sourceSubTitle) {
                    // source 요소를 drag 했을 때.
                    delete this.$store.state.followSource[name]
                    db.update({
                        follow: this.$store.state.followSource
                    })
                    this.$store.commit('loadRes')
                }

                sessionStorage.setItem('categories' , JSON.stringify({
                    "follow": this.$store.state.followSource,
                    "keyword": this.$store.state.userKeyword,
                }))
                this.items = this.$store.state.followList

                this.source_checkboxList = []
                this.keyword_checkboxList = []
                // db에서 삭제하는 코드
            }
        },
        vuexdata: async function() {
            this.items = this.$store.state.followList;
            this.items.forEach(res => {
                this.select_name.push(res.name)
                this.move_categoty.push(res.name)
                res.children.forEach(data => {
                    data.children.forEach(children => {
                        if (children.type === 'source') {
                            this.category_structure_source.push([children.name, res.name, children.type])
                        } else if (children.type === 'keyword') {
                            this.category_structure_keyword.push([children.name, res.name, children.type])
                        }
                    })
                })
            })

        }
    },
    mounted() {
        this.vuexdata()
    },
    computed: {
        
    },
    watch: {
        items: async function() {
            this.category_structure_source = []
            this.category_structure_keyword = []
            // sessionStorage.setItem('categories' , JSON.stringify(this.$store.state.followList))
            this.items.forEach(res => {
                this.select_name.push(res.name)
                res.children.forEach(data => {
                    data.children.forEach(children => {
                        if (children.type === 'source') {
                            this.category_structure_source.push([children.name, res.name, children.type])
                        } else if (children.type === 'keyword') {
                            this.category_structure_keyword.push([children.name, res.name, children.type])
                        }
                    })
                })
            })
        },
        select_name_model: function() {
            this.source_checkboxList = []
            this.keyword_checkboxList = []
        }
    }
}
</script>

<style>
    .v-input--checkbox{
        flex: none;
    }
    .v-text-field {
        margin-top: 0px;
    }
    .select {
        flex: none;
    }
    .category_container {
        max-width: 800px;
        margin-top: 45px;
    }
    .category_h1 {
        margin-bottom: 10px;
    }
    .category_btn {
        margin-top: 15px
    }
</style>

