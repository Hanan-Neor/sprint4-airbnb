<template>
  
</template>

<script>
export default {










  mounted() {
    const sectionOne = document.querySelector(".top-bg");
    const options = {
      threshold: 1,
      rootMargin: "0px",
    };
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        eventBusService.$emit("searchPos", entry.isIntersecting);
      });
    }, options);
    observer.observe(sectionOne);
  },












}

</script>

<style>

</style>