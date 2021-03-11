<template>
  <div class="newest">
    最新音乐
    <carousel :imgs="imgs" controls></carousel>
  </div>
</template>
<script>
import carousel from "@/components/Carousel.vue";
export default {
  name: "Newest",
  components: {
    carousel,
  },
  data() {
    return {
      imgs: [
        "../assets/images/01.jpg",
        "../assets/images/02.jpg",
        "../assets/images/03.jpg",
        "../assets/images/04.jpg",
        "../assets/images/05.jpg",
      ],
    };
  },
};
</script>
