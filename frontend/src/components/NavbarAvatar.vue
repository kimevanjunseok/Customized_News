<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">

        <v-avatar v-on="on">
            <img
            :src="$store.state.imgSrc ? $store.state.imgSrc : 'http://image.auction.co.kr/itemimage/16/da/c9/16dac970b6.jpg'"
            alt="Profile Image"
            >
        </v-avatar>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.user.email }}</v-list-tile-title>
              <v-list-tile-sub-title>welcome! {{user.user.displayName }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list flat>
          <!-- <v-subheader>REPORTS</v-subheader> -->
          <div color="primary">
            <v-list-tile
              v-for="(item, i) in items"
              :key="i"
              :to="item.url"
            >
              <!-- <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action> -->
              <v-list-tile-content>
                <v-list-tile-title> {{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="Logout">
              <v-list-tile-content>
                <v-list-tile-title>Log Out</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </v-list>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="menu = false">Save</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

  export default {
    data: () => ({
      menu: false,
      imgSrc: "http://1.bp.blogspot.com/-Du37vfsR5RA/VUnNvMwUmEI/AAAAAAAAEJc/9yFnzYYr-lo/s1600/%EC%9D%B4%EB%AF%B8%EC%A7%80%2B2.png",
      user: '',
      items: [
        { name: 'Profile Page', url: '/profile'}, 
        { name: 'Organize Feeds', url: '/category_setting'},
        ],

    }),
    created () {
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    methods: {
      Logout: function() {
        FirebaseService.Logout()
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('categories')
        this.$store.commit('imageSoruceDestroy')
        window.location.href = '/'
      },
    }
  }
</script>