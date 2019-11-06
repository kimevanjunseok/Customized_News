import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    followSource : {},
    followReturn : {},
    imgSrc: '',

    userKeyword : {},
    userCategorys :[],
    followList:[],

    //
    sourceSubTitle:"source",
    keywordSubTitle:"keyword",

    keywordFollowing : false,
    follow_openIdx : -1
  },
  mutations: {
    loadUserinfoData(state, fromDB){
      state.followSource = fromDB.follow;
      state.userKeyword = fromDB.keyword;
    },
    loadRes (state){
      // console.log('loadRes start');
      
      state.userCategorys = [];
      let followList = [];
      let sequenceId = 0;
      let lowestId = -1;
        // firebase.firestore().collection('Userinfo').doc(this.userInfo.user.uid).get()
        //   .then(docs => {
          let res = state.followSource
            for (let key in res) {
              // 여기서 받는 key는 source의 name들임
              // name들에 category있는지 확인해야함.
              let judge = -1;
              followList.find((v, i) => {
                if (v.name == res[key]) {
                  judge = i
                }
                })
              
              if (judge == -1) {
                // 카테고리가 없는 경우
                followList.push({
                  name: res[key],
                  id:sequenceId++,
                  children: [
                    {
                    name: state.sourceSubTitle,
                    id:sequenceId++,
                    category:res[key],
                    children: [
                      {
                        name: key,
                        type: state.sourceSubTitle,
                        id:lowestId--,
                      }
                    ]
                  },
                  {
                    name: state.keywordSubTitle,
                    id:sequenceId++,
                    category:res[key],
                    children: []
                  },
                ]
              })
                state.userCategorys.push(res[key])
              } else {
                // 카테고리가 있는 경우
                followList[judge].children[0].children.push({
                  name: key,
                  type: state.sourceSubTitle,
                  id:lowestId--,
                })
              }
            }
            let resK = state.userKeyword
            for (let key in resK) {
              // 여기서 받는 key는 source의 name들임
              // name들에 category있는지 확인해야함.
              let judge = -1;
              followList.find((v, i) => {
                if (v.name == resK[key]) {judge = i}
                })
              if (judge == -1) {
                // 카테고리가 없는 경우
                followList.push({
                  name: resK[key],
                  id:sequenceId++,
                  children: [
                    {
                      name: state.sourceSubTitle,
                      id:sequenceId++,
                      category: resK[key],
                      children: []
                    },
                    {
                    name: state.keywordSubTitle,
                    id:sequenceId++,
                    category: resK[key],
                    children: [
                      {
                        name: key,
                        type: state.keywordSubTitle,
                        id:lowestId--,
                      }
                    ]
                  }]
                })
                state.userCategorys.push(resK[key])
              } else {
                // 카테고리가 있는 경우
                // if (folliwList[judge].children.find((v,i)=> {
                //   if (v.name == 'key')
                // })
                followList[judge].children[1].children.push({
                  name: key,
                  type: state.keywordSubTitle,
                  id:lowestId--,
                })
              }
            }
        //   })
        state.followList = followList

        //followList
          // console.log(followList);
            
          // console.log('loadRes end');
    },
    updateFollowList(state, data) {
      state.followList = data
    },
    imageSoruceUpdate(state, image){
      state.imgSrc = image
    },
    imageSoruceDestroy(state) {
      state.imgSrc = ''
    }
  },
  actions: {

  }
})
