var client_id = 'Gk7dbhZqf7TEcErEezxb'
var client_secret = 'TvK2G6LADw'
const axios = require('axios')

axios.get('https://openapi.naver.com/v1/search/news.json?query=trump', {
    headers: {
        'X-Naver-Client-Id':client_id,
        'X-Naver-Client-Secret': client_secret
    }
}).then(res=> {
    console.log(res.data.items)
})