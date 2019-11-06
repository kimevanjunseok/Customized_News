<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            :temporary = controller
            v-model="drawer"
            right
            style="width:83vw"
      > 
      <v-btn
      flat
      @click="close">
        X 
      </v-btn>
        <section class="container630 centered">
          <h1>
            <div class="kicker">Preview</div>
            <div class="heading">Read later</div>
          </h1>

              <v-flex xs12 v-for="(item, index) in deleteKey" :key="item.title">
                      <v-card :key="item.title">
                        <v-layout row>
                          <v-flex>
                            <img id="articleImage" v-bind:src="item.urlToImage" style="width:130px; height:78px;" @click="open_Detaildrawer(item)">
                          </v-flex>
                          
                          <v-flex>
                            <v-card-title primary-title>
                                <v-layout row>
                                  <!-- <div> -->
                                    <span class="headline" id="title" v-if="!item.mark_as_read" @click="open_Detaildrawer(item)">{{item.title}}</span>
                                    <span class="headline" id="title" v-else style="color:#888888;" @click="open_Detaildrawer(item)">{{item.title}}</span>
                                  <!-- </div> -->
                                  <v-spacer></v-spacer>
                                  <div>
                                    <v-icon id="trash" @click="delete_from_DB(item, index)">fas fa-trash-alt</v-icon>
                                      <!-- <v-icon id="check" @click="mark_as_read(item)">fas fa-check</v-icon> -->
                                      <!-- <v-icon id="bookmark" v-if="!item.read_later" @click="read_later(item)">far fa-bookmark</v-icon> -->
                                      <!-- <v-icon id="bookmark" v-else @click="read_later(item)" style="color:#2bb24c;">far fa-bookmark</v-icon> -->
                                      <!-- <v-icon @click="read_later(item)">far fa-bookmark</v-icon>
                                      <v-icon @click="read_later(item)">far fa-bookmark</v-icon> -->
                                      <!-- <v-btn class="border-green" flat color="light-green accent-4">Follow</v-btn> -->
                                  </div>
                                </v-layout>
                                
                                
                                
                                  <div id="author" @click="open_Detaildrawer(item)">{{item.author}}</div>
                                  <!-- <span id="description">{{item.description}}</span> -->
                                  <span id="description" @click="open_Detaildrawer(item)">{{item.description}}</span>

                            </v-card-title>
                          </v-flex>
                          
                        </v-layout>

                        <v-card-actions>

                        </v-card-actions>
                      </v-card>

                    </v-flex>

            
          


         
        <!-- <v-btn class="green white--text" @click="test1">Save changes</v-btn> -->
        </section>
      </v-navigation-drawer>
    </div>
    
    <div v-else>
          <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
          >
          </v-navigation-drawer>
    </div>
    <ArticleDetail 
      v-if="detailDrawer === true"
      :drawer = detailDrawer
      :detail = detailItem
      @right_drawer = "closeDetail"
    >
    </ArticleDetail>
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import ArticleDetail from '@/components/article/ArticleDetail'

export default {
  props : ['drawer', 'readlaterArticles'],
  components : {
    ArticleDetail
  },
  mounted(){
  },
  data(){
    return{
      detailDrawer : false,
      detailItem : null,
      controller : true
    }
  },
  watch: {
    drawer : function() {
      if (!this.drawer) {
        this.$emit('readLater_drawer_false')
      }
    }
    // drawer: function() {
    //   if (!this.drawer) {
    //     this.$emit('readLater_drawer_false')
    //     if (this.val) {
    //       this.$emit('right_drawer', 'close')
    //     } else {
    //       this.$emit('right_drawer', 'save')
    //     }
    //   }
    // }
  },
  methods: {
      delete_from_DB(item, index) {

        firebase.auth().onAuthStateChanged((user) => {
          firebase.firestore().collection('Userinfo').doc(user.uid).update({
            readlater : firebase.firestore.FieldValue.arrayRemove(item)
          })
        })
        if(this.detailDrawer){
          this.closeDetail()
        }
        this.$emit("deleteReadlater")
      },
      open_Detaildrawer(item){
        this.detailItem=item
        this.detailDrawer=!this.detailDrawer
        this.controller = false
      },
      close(){
        this.drawer = !this.drawer
        if(this.detailDrawer){
          this.closeDetail()
        }
      },
      closeDetail(){
        this.detailDrawer=!this.detailDrawer
        this.controller = true
      },
  },
  computed : {
    deleteKey(){
      if( this.readlaterArticles != null)
        return this.readlaterArticles.slice().reverse();
      else return [];
    }
  }
}
</script>

<style>
/* list */
#articleImage {
  border-radius: 0.2rem;
  margin-top: 24px;
  margin-left: 16px;
}

#title {
  display: inline-block;
  font-size: 16px !important;
  letter-spacing: -.04em !important;
  line-height: 1.25em !important;
  margin-bottom: 0.25rem !important;
  text-decoration: none !important;
  width: 72% !important;
  font-weight: 500;
}

#author {
  color: #9e9e9e;
  font-size: 13px !important;
  line-height: 18px !important;
  margin-left: -4px !important;
  margin-bottom: 0 !important;
  margin-top: 0.25rem !important;
  max-height: 54px !important;
}

#description {
  color: #9e9e9e;
  font-size: 13px !important;
  line-height: 18px !important;
  margin-left: -4px !important;
  margin-bottom: 0 !important;
  margin-top: 0.25rem !important;
  max-height: 54px !important;

  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 3 !important; 
  -webkit-box-orient: vertical !important;
  word-break: break-word !important;
  line-height: 1.2em !important;
  height: 3.6em !important;
}

#trash {
    font-size: 16px;
}
</style>