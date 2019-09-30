<template>
  <div class="home">
    <div class="hero">
      <h1 class="heading">Welcome to Tanglebay Supporter</h1>
    <p class="sub-heading">your node for trinity.</p>
    </div>

    <div class="section section-background">
      <div class="container">
            <h2>Support Tanglebay now!</h2>
        <Payment />
      </div>
    </div>
  </div>
</template>

<script>
import Payment from "../components/Payment.vue";

export default {
  name: "home",
  components: {
    Payment
  }
};
</script>

<style lang="scss">
.el-main {
  padding: 0px !important;
}
.home {
  text-align: center;
}
.hero {
  margin: 0 10px;
}
.section {
  padding: 80px 0;
  &-background {
    background-color: var(--light);
    p {
      max-width: 600px;
      margin: 15px auto 30px;
    }
    a {
      text-decoration: none;
    }
  }
  .headline-wrapper {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
@media only screen and (max-width: 740px) {
  .hero {
      padding-top: 40px;
  }
  .headline-wrapper {
    flex-wrap: wrap;
    h2 {
      margin-bottom: 20px;
    }
  }
  .btn-social  {
      margin-bottom: 5px !important;
  }
}
</style>