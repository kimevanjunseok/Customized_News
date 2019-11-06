<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
            style="width:83vw"
            temporary
        >
        <section class="container630 centered">
          <h1>
            <div class="kicker">General</div>
            <div class="heading">Example</div>
          </h1>

          <v-layout row wrap>
            <v-flex xs8>
              <div class="form profile mb-2">
                    <div class="text-fields">
                      <v-container fluid>
                      <v-flex class="field" v-for="i in item" :key=i.num>
                        <label>{{i.title}}</label>
                        <span class="grey--text">{{i.subtitle}}</span><br/>
                        <template v-for="k in i.checkbox">
                          <v-checkbox v-model="k.value" :label="`${k.content}`"></v-checkbox>
                        </template>
                      </v-flex>
                      </v-container>
                    </div>
              </div>
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
  </div>
</template>

<script>
export default {
    props : ['drawer','snackbar'],
    methods :{
        test(){
          this.$emit('right_drawer')
          // console.log('right_drawer')
        }
    },
    data(){
      return{
        item :[
          {title : 'title1', 
           subtitle : 'subtitle1',
           checkbox : [
             {
               index : 1,
               content : "test1",
               value : true
             },
              {
               index : 2,
               content : "test2",
               value : false
             },
              {
               index : 3,
               content : "test3",
               value : false
             }
            ]
          },
           {title : 'title2', 
           subtitle : 'subtitle2',
           checkbox : [
             {
               index : 4,
               content : "test4",
               value : true
             },
              {
               index : 5,
               content : "test5",
               value : false
             },
              {
               index : 6,
               content : "test6",
               value : false
             }
            ]
          },
           {title : 'title3', 
           subtitle : 'subtitle3',
           checkbox : [
             {
               index : 7,
               content : "test7",
               value : false
             },
              {
               index : 8,
               content : "test8",
               value : true
             }
            ]
          }
        ]
      }
    }
    
}
</script>
