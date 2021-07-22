<template>
  <section class="host-profile">
    <div class="profile-pic">
      <img :src="host.imgUrl" />
    </div>
    <p class="host-name">{{ host.fullname }}</p>
    <router-link class="link" to="/space/host/edit">add space</router-link>
  </section>
</template>

<script>
export default {
  props: ['host'],
};
</script>

<style></style>
