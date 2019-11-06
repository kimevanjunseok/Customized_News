<template>
  <v-container> 
    <h1 class="admin_h1">Admin Page</h1>
    <v-layout wrap>
      <v-flex class="admin_flex" xs4 sm4 md4 lg4 xl4>
        <h2>신규 가입자 수</h2>
        <NewUserGraph/>
      </v-flex>
      <v-flex class="admin_flex" xs4 sm4 md4 lg4 xl4>
        <h2>전체 사용자 방문 수</h2>
        <TotalUserGraph/>
      </v-flex>
      <v-flex class="admin_flex" xs4 sm4 md4 lg4 xl4>
        <h2>전체 방문자 수</h2>
        <TotalVisitorGraph/>
      </v-flex>
    </v-layout>
<!-- 
    <h2>전체 사용자 :{{ users.length }}명</h2> -->

    <v-layout class="admin_layout" row>
      <v-flex>
        <v-card>
          <v-toolbar color="green" dark>
            <v-toolbar-title class="text-xs-center">전체 사용자 :{{ users.length }}명</v-toolbar-title>

            <!-- <v-spacer></v-spacer> -->

            <!-- <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn> -->
          </v-toolbar>

          <v-list>
            <v-subheader>
              <i class="fa fa-search"></i>
              <input style="margin: 4px; height: 70%;" v-model="admin_search" :placeholder="placeholder"/>
            </v-subheader>
            
            <v-list-tile v-for="user in users">

              <v-list-tile-content>
                <v-list-tile-title>{{user.email}}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon @click="Deleteuser(user.uid)" size="20">fas fa-trash-alt</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>


    <!-- <v-layout wrap>
      <v-flex v-for="user in users" xs3 sm3 md3 lg3 xl3>
          <v-card>
            <v-avatar size="150">
              <v-img class="admin_img" :src="user.photoURL"></v-img>
            </v-avatar>
            <v-card-title>{{ user.email }}</v-card-title>
            <v-card-text><v-btn @click="Deleteuser(user.uid)">회원탈퇴</v-btn></v-card-text>
          </v-card> 
      </v-flex>
    </v-layout> -->


  </v-container>
</template>

<script>
import firebase from 'firebase'
import NewUserGraph from '../components/admin/NewUserGraph'
import TotalUserGraph from '../components/admin/TotalUserGraph'
import TotalVisitorGraph from '../components/admin/TotalVisitorGraph'

export default {
  data() {
    return {
      users: [],
      backup: [],
      admin_search: '',
      placeholder: 'Search user...',
    }
  },
  components: {
    NewUserGraph,
    TotalUserGraph,
    TotalVisitorGraph,

  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$http.get('/api/allusers').then(res => {
        this.users = res.data
        this.backup = res.data
      })
    },
    Deleteuser(uid) {
      const judge = confirm('탈퇴시키겠습니까?')
      if (judge) {
        this.$http.get(`/api/allusers/delete/${uid}`)
        alert("탈퇴되었습니다.")
        this.init()
      } else {
        alert("취소하셨습니다.")
      }

    },
    search() {
      if (this.admin_search) {
        this.users = []
        for (var i in this.backup) {
          if (this.backup[i].email.indexOf(this.admin_search) !== -1) {
            this.users.push(this.backup[i])
          }
        }
       
    

      } else {
        this.users = this.backup
      }
    }
  },
  watch: {
    admin_search: function() {
      this.search()
    }
  }
}
</script>

<style>
  .admin_h1 {
    margin-bottom: 10px;
  }
  .admin_flex {
    margin-left: 0px;
    margin-right: 0px;
  }
  .admin_img {
    margin: 10px;
  }
  .admin_layout {
    margin-top: 10px;
  }
</style>