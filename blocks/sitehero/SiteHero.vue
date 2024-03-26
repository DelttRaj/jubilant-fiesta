<template>
  <div class="hero-image">
    <img v-bind:src="data.image" alt="sushi" data-aos="fade-up" />
    <h2 data-aos="fade-up">
      日 <br />
      本 <br />
      食
    </h2>
    <div class="hero-image__overlay"></div>
  </div>

  <div class="hero-content">
    <div class="hero-content-info" data-aos="fade-left">
      <h1>{{ data.headline }}</h1>
      <p>{{ data.description }}</p>

      <div class="hero-content__buttons">
        <button class="hero-content__order-button">
          {{ data.ctaOrderNow }}
        </button>
        <button class="hero-content__play-button">
          {{ data.ctaHowToOrder }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SiteHero",
  props: {
    data: Object,
  },
};
</script>
