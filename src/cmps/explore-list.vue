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
              name:'Tel Aviv',
              imgUrls: [
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394084/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/b5a5444a-91ab-43cf-abf1-79832793a56d_dcvqpm.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/a91d2c6f-e5b2-4e96-90f2-e0579d69038a_bviirx.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/77cdae47-7827-4fa6-9b8d-5b9dfcbe15ef_i3ycet.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7f273de4-b8eb-4242-8df4-3355c6df7223_crtfad.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7e7fca56-6af0-491a-95ba-fa92e96a9a0c_o5ux7j.webp',
            ],
            loc: {
        country: 'Switzerland',
        countryCode: 'IL',
        address: 'Grindelwald, Bern',
        lat: 46.62433,
        lng: 8.03403,
      },
          },
           { id:2,
              name:'Tel Aviv',
              imgUrls: [
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394084/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/b5a5444a-91ab-43cf-abf1-79832793a56d_dcvqpm.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/a91d2c6f-e5b2-4e96-90f2-e0579d69038a_bviirx.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/77cdae47-7827-4fa6-9b8d-5b9dfcbe15ef_i3ycet.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7f273de4-b8eb-4242-8df4-3355c6df7223_crtfad.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7e7fca56-6af0-491a-95ba-fa92e96a9a0c_o5ux7j.webp',
            ],
            loc: {
        country: 'United Kingdom',
        countryCode: 'IL',
        address: 'Grindelwald, Bern',
        lat: 46.62433,
        lng: 8.03403,
      },
          },
           { id:3,
              name:'Tel Aviv',
              imgUrls: [
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394084/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/b5a5444a-91ab-43cf-abf1-79832793a56d_dcvqpm.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/a91d2c6f-e5b2-4e96-90f2-e0579d69038a_bviirx.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/77cdae47-7827-4fa6-9b8d-5b9dfcbe15ef_i3ycet.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7f273de4-b8eb-4242-8df4-3355c6df7223_crtfad.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7e7fca56-6af0-491a-95ba-fa92e96a9a0c_o5ux7j.webp',
            ],
            loc: { 
        country: 'Israel',
        countryCode: 'IL',
        address: 'Grindelwald, Bern',
        lat: 46.62433,
        lng: 8.03403,
      },
          },
           { id:4,
              name:'Tel Aviv',
              imgUrls: [
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394084/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/b5a5444a-91ab-43cf-abf1-79832793a56d_dcvqpm.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/a91d2c6f-e5b2-4e96-90f2-e0579d69038a_bviirx.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/77cdae47-7827-4fa6-9b8d-5b9dfcbe15ef_i3ycet.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7f273de4-b8eb-4242-8df4-3355c6df7223_crtfad.webp',
                'https://res.cloudinary.com/dymtestxz/image/upload/v1626394082/sprint4/spaces/2-%20Chalet%20Eigernordwand/space/7e7fca56-6af0-491a-95ba-fa92e96a9a0c_o5ux7j.webp',
            ],
            loc: {
        country: 'France',
        countryCode: 'IL',
        address: 'Grindelwald, Bern',
        lat: 46.62433,
        lng: 8.03403,
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

