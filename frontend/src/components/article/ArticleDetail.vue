<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer 
        app
        v-model="drawer"
        :touchless="false"
        temporary
        right
        style="width:83vw"
      >
      <v-btn
      flat
      @click="close">
        X
      </v-btn>
        <section class="container630 centered">
          <h1 class="grey--text">{{detail.source.name}}</h1>
          <h1>
            <div class="heading">{{detail.title}}</div>
          </h1>
          <p class="text-lg-right grey--text">{{detail.author}}</p>
          <p class="text-lg-right grey--text">{{detail.publishedAt}}</p>
          
          <v-img 
            v-bind:src="detail.urlToImage"
            width:130px 
            height:78px>
          </v-img>
          <div>
          {{detail.description}}
          </div>
          <br>
          <div>
          {{detail.content}}
          </div>
          <v-layout justify-center>
            <v-btn dark large><a v-bind:href="detail.url" target="_blank" style="color : white">Visit Website</a></v-btn>
          </v-layout>
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
  </div>
  
  <!--호성 <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
            style="width:83vw"
      >
        <section class="container630 centered">
          <h1>
            <div class="kicker">ArticleDetail</div>
            <div class="heading">Example</div>
          </h1>
          <v-layout>
    <v-flex>
      <v-card>
        <v-img
          :src="detail.urlToImage"
          aspect-ratio="2"
        ></v-img>
       

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ detail.title }}</h3>
            <h5 style="color:grey;">{{ detail.source.name }} - {{ detail.author }}</h5>
            <br>
            <div> {{ detail.content }} </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
        <v-btn class="green white--text" @click="test">Save changes</v-btn>
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
  </div> -->
</template>

<script>
import('@/assets/profileCss.css')
export default {
  props : ['drawer','detail'],
  methods : {
    close(){
      // console.log(this.detail)
      this.drawer=!this.drawer
      this.$emit('right_drawer', 'closeDetail')
    }
  },
  watch : {
    drawer: function(){
       this.drawer=!this.drawer
       this.$emit('right_drawer', 'closeDetail')
    }
  }
    
}
</script>