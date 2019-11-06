<template>
  <div>
    <v-card style="border-radius: 10px;">
        <a class="weatherwidget-io" href="https://forecast7.com/en/36d35127d38/daejeon/" data-label_1="DAEJEON" data-label_2="WEATHER" data-font="Roboto Slab" data-icons="Climacons Animated" data-days="5" data-theme="pure">DAEJEON WEATHER</a>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
    }),
    watch : {},
    created () {
      // console.log('a', document)
      this.weather(document,'script','weatherwidget-io-js')
    },
    methods: {
      weather: function (d,s,id) {
        var js,fjs=d.getElementsByTagName(s)[0]
        js=d.createElement(s)
        js.id=id
        js.src='https://weatherwidget.io/js/widget.min.js'
        fjs.parentNode.insertBefore(js,fjs)
      }
    }
  }
</script>