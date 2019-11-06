<template>
  <v-footer
    dark
    class="my-5"
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-xs-center"
      width="100%"
    >
      <v-card-text>
        
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3 white--text"
          icon
        >
          <a v-if="icon == 'fab fa-github'" href="https://lab.ssafy.com/HSx3/webmobile-sub2" target="_blank" style="color:white;"><v-icon size="24px">{{ icon }}</v-icon></a>
          <a v-else href="#" target="_blank" style="color:white;"><v-icon size="24px">{{ icon }}</v-icon></a>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
          {{ weather.one }}, {{ weather.two }}<br>
          the low : {{ weather.temp_min }} °C<br>
          the high : {{ weather.temp_max }} °C
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2019.07.08 — <strong>Idle</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
        weather: {
          one:'',
          two:'',
          temp_max:'',
          temp_min:'',
          raw:''
        },
      icons: [
        'fab fa-github',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }),
    created() {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=daejeon&appid=ab8589d621c1abe7a5d4d62b9bb21c33')
            .then(res => {
              this.weather.raw = res.data
              this.weather.one = res.data.weather[0].main
              this.weather.two = res.data.length>1 ? res.data.weather[1].main : ''
              this.weather.temp_max = res.data.main.temp_max - 273.15
              this.weather.temp_min = res.data.main.temp_min - 273.15
              })
            .catch(error => console.log(error))
    }
  }
</script>


<style>
/* .v-card__text button {
  color: white;
} */
a {
  color: white;
  text-decoration: none;
}
</style>
