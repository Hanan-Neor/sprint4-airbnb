<template>
  <section v-if="center">
    <!-- {{ center }} -->
    <GmapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 480px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="center = m.position"
        :icon="{ url: require('../assets/img/icons/home.svg') }"
      />
    </GmapMap>
  </section>
</template>

<script>
export default {
  props: { loc: Object },

  data() {
    return {
      center: {},
      markers: [{ lat: 0, lng: 0 }],
      location: { lat: 0, lng: 0 },
    };
  },

  created() {
    this.center = { lat: this.loc.lat, lng: this.loc.lng };
    console.log(this.center);
    this.markers.push({
      position: this.center,
    });
  },
};
</script>

<style></style>
