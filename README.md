<p align="center"><img src="https://user-images.githubusercontent.com/45934061/68114280-f8dd1280-ff38-11e9-8581-f43fc882fe99.png"></img></p><h1 align="center">IDLE</h1><p align="center">당신의 IDLE time을 책임지는 뉴스웹페이지, IDLE</p>

GitHub : [IDLE](<https://github.com/kimevanjunseok/Customized_News_Page>)

IDLE은 Customized News Page로써, 키워드 기반, 신문사 기반의 뉴스 구독을 서비스하는 개인화 뉴스 웹페이지 서비스입니다. 키워드, 신문사를 유저가 원하는대로 등록하고, 그에 따른 개인별 페이지를 제공받을 수 있습니다.



# Getting Started

## Prerequisites

- `frontend` 폴더에서 npm 모듈을 install 합니다.

  ```bash
  $ npm install
  ```

- `backend` 폴더에서 npm 모듈을 install 합니다.

  ```bash
  $ npm install
  ```



# Deployment

로컬 서버를 실행시킵니다.

```bash
$ npm run serve # frontend 폴더에서
$ npm start # backend 폴더에서
```



# 서비스 소개

### 기본 main page

<img src="https://user-images.githubusercontent.com/45934061/68114280-f8dd1280-ff38-11e9-8581-f43fc882fe99.png"/>
<img src="https://user-images.githubusercontent.com/45934061/68114865-689fcd00-ff3a-11e9-9da0-70eb8e0e0ca9.png"/>

idle의 서비스 소개와 페이지 이미지를 확인할 수 있습니다. 



`GET STARTED FOP FREE`버튼을 누를 시, `signup` 모달이 켜집니다.

![start_for_free](https://user-images.githubusercontent.com/45934061/68115341-8ae61a80-ff3b-11e9-8706-cd79f62e5564.gif)



`navbar`의 `login` 버튼을 누를 시 로그인 할 수 있습니다.

<img src="https://user-images.githubusercontent.com/45934061/68115525-eca68480-ff3b-11e9-8f62-9582cf45025a.gif">

`google login`과 `facebook login`을 지원합니다.

`CREATE ONE`버튼을 누르면 login창에서도 signup을 진행할 수 있으며, signup되면 자동으로 로그인되어 메인페이지로 넘어갑니다.



### Login시 main page

#### Main

<img src="https://user-images.githubusercontent.com/45934061/62856062-d8812b80-bd2e-11e9-8739-80e5f83a1658.PNG">

메인페이지에서는 최신 기사들과 날씨, 유저들이 최근에 가장 많이 등록한 키워드와 신문사 리스트를 확인할 수 있습니다.



#### SideBar

<img src="https://user-images.githubusercontent.com/45934061/68115673-43ac5980-ff3c-11e9-876e-c37d7ebfd75f.png" style="width:300px;">

feeds에 아무것도 등록되어있지 않으면 위와 같은 사이드바를 볼 수 있습니다. 

`CREATE YOUR FIRST FEED`를 누르거나, `ADD CONTENT`를 눌러 feed를 등록하는 페이지로 갈 수 있습니다.



### Feed 등록

<img src="https://user-images.githubusercontent.com/45934061/68116051-39d72600-ff3d-11e9-9b13-2553fb01f567.gif">

신문사와 keyword 기준의 feed를 등록할 수 있습니다.



### Feed 수정

<img src="https://user-images.githubusercontent.com/45934061/68116332-e5807600-ff3d-11e9-93bc-83c0d2a71ffa.gif">

수정창에서 feed를 수정하고 조직할 수 있습니다.



##### 사용 기술 및 도구

- vue.js (2.6.10)
- Firebase (6.3.0)
- Vue CLI (3.9.0)
- Node.js (10.16.0)
- vuetify.js (1.5.5)
- JIRA, gitlab
- vuex (3.0.1)



### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



#### Developers

<img src="https://user-images.githubusercontent.com/45934061/68181814-fda6d280-ffdb-11e9-9431-5b6cf7331c53.png">