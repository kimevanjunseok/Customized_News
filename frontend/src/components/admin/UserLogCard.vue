<template>
    <v-card>
    <v-card-title>
      <span color="primary">사용자 로그 검색</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search UserId"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="userInfo"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.domain }}</td>
        <td class="text-xs-left">{{ props.item.path }}</td>
        <td class="text-xs-left">{{ props.item.time}}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { userInfo } from 'os';
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'

export default {
  
  data(){
    return{
      headers : [
        {text : '아이디', value: 'id'},
        {text : '도메인', value: 'domain'},
        {text : '접근 페이지', value: 'path'},
        {text : '접속시간', value: 'path'},
        {text : '머무른시간', value: 'time'},
      ],
      userInfo : []
     }
  },
  created(){
    
  }

}
</script>
