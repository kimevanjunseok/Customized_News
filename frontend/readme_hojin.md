# 190708.hojin

## 1. FireStore 프로젝트 생성 및 세팅
## 2. 게시판 예제 CRUD sql 정보
## 3. 리스트폼, 입력폼, 상세정보폼

# 초기 세팅

```
var config = {
  apiKey: "AIzaSyARNJXenXmx7kNBCxAxkOjQf1zVWr0u1Ew",
  authDomain: "firetest-d3c57.firebaseapp.com",
  databaseURL: "https://firetest-d3c57.firebaseio.com",
  projectId: "firetest-d3c57",
  storageBucket: "",
  messagingSenderId: "208732228701",
};

firebase.initializeApp(config);
var db = firebase.firestore();

```
# CRUD methods

## ex. 리스트 조회

```
router.get('/boardList', function(req, res, next) {
    db.collection('board').orderBy("brddate", "desc").get()
        .then((snapshot) => {
            var rows = [];
            snapshot.forEach((doc) => {
                var childData = doc.data();
                childData.brddate = dateFormat(childData.brddate, "yyyy-mm-dd");
                rows.push(childData);
            });
            res.render('board2/boardList', {rows: rows});
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
});

```
# 참고 사이트
https://firebase.google.com/docs/firestore/quickstart?hl=ko

# 보안 방향

## 1. view component구현
## 2. select 기능 직접 구현

### 2-1. where

```
// Create a reference to the cities collection
var citiesRef = db.collection('cities');

// Create a query against the collection
var queryRef = citiesRef.where('state', '==', 'CA');

var brazilCities = citiesRef.where('state', '==', 'CA');
var smallCities = citiesRef.where('population', '<', 1000000);
var afterParis = citiesRef.where('name', '>=', 'San Francisco');
```

### 2-2. orderby, limit
```
var lastThree = citiesRef.orderBy('name', 'desc').limit(3);
```

### 2-3. where + orderby, limit
#### - where 조건과 사용시 동일한 필드에 한해 필터 사용
```
citiesRef.where('population', '>', 2500000).orderBy('population');
```
