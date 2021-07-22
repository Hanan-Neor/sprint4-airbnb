<template>
  <section class="space-list" v-if="explores">

        <explore-preview @gotoSpaces="gotoSpaces" v-for="explore in explores" :key="explore.id" :explore="explore" />
  </section>
</template>



<script>
import explorePreview from "./explore-preview.vue";
export default {
//   props: ["explores"], //TODO send the 4 closest locations from a list of popular locations
  data(){
      return {
          explores: [//TODO convert this to a prop later
              { 
                id:1,
              imgUrls: [
                'https://wallpapercave.com/wp/wp2777203.jpg',
                'https://wallpapercave.com/wp/wp2184552.jpg',
            ],
            loc: {
        country: 'Switzerland',
        address: 'Grindelwald, Bern',
        lat: 46.62433,
        lng: 8.03403,
      },
          },
           { id:2,
              imgUrls: [
                'http://1.bp.blogspot.com/-dC4TroE-cw0/Usj8bGQ8n-I/AAAAAAAAAvw/oKBKOtJkejU/s1600/tower_bridge_london_wallpaper_hd-1440x900.jpg',
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.BWlDOH2ajHyn-Tb6XD31xgHaEo%26pid%3DApi&f=1',
            ],
            loc: {
        country: 'United Kingdom',
        address: 'london, england',
            "lat": 51.5033331,
            "lng": -0.0793664
      },
          },
           { id:3,
              imgUrls: [
                'https://cdn.theculturetrip.com/wp-content/uploads/2015/12/beach.jpeg',
                'https://wallpapercave.com/wp/wp3134443.jpg',
            ],
            loc: { 
        country: 'Israel',
        address: 'tel aviv, israel',
            "lat": 32.072407,
            "lng": 34.782362
      },
          },
           { id:4,
              imgUrls: [
                'https://getwallpapers.com/wallpaper/full/d/1/2/994028-paris-france-wallpaper-2200x1375-for-samsung.jpg',
                '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs2.best-wallpaper.net%2Fwallpaper%2F1920x1440%2F1608%2FBonnieux-France-houses-pink-flowers_1920x1440.jpg&f=1&nofb=1',
            ],
            loc: {
            "country": "France",
            "countryCode": "FR",
            "address": "Fresse sur Moselle, Grand Est",
            "lat": 47.87556,
            "lng": 6.78865
      },
          }
          
          ]
      }
  },
  name: "exploreList",
  methods: {
    gotoSpaces(country){
      this.$emit('gotoSpaces', country)
    },
  },
  components: {
    explorePreview,
  },
};
</script>

