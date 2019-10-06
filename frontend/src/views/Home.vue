<template>
  <div class="home">
    <div class="hero">
      <h2 class="heading">Welcome to the TangleBay Tip-Portal</h2>
      <p class="sub-heading">Your gate to the Tangle.</p>
    </div>

    <div class="section section-background">
      <div v-if="service_selection" class="container">
        <p>Tanglebay provides public and private IOTA nodes for daily usage.</p>
        <div>
          <el-button @click="open('org')">Tip without getting node access</el-button>
          <el-button @click="open('com')">Tip with getting node access</el-button>
        </div>
      </div>

      <div v-else class="container">
        <div v-if="service == 1">
          <h3>Tip with getting node access</h3>
          <Payment />
        </div>
        <div v-if="service == 2">
          <h3>Tip without getting node access</h3>
          <div>
            <img class="qr_code" src="../assets/qr.jpg" />
            <br />
            <a
              class="btn btn-primary"
              href="iota://DTOAQKJL9ZBXMSZYVXOXWQPFXMFRPDUWQJNDLKNLMUMSTVCCPPTRVAPWANVHIEFFFACEVDMXXVLTMNFTWCSAEHWFXC"
            >Tip with Trinity</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <h3>FAQ</h3>
      <FAQ class="faq" />
    </div>
  </div>
</template>

<script>
import Payment from "../components/Payment.vue";
import FAQ from "../components/FAQ.vue";

export default {
  name: "home",
  components: {
    Payment,
    FAQ
  },
  data() {
    return {
      service_selection: true,
      service: 0
    };
  },
  methods: {
    open(service) {
      if (service === "com") {
        this.service_selection = false;
        this.service = 1;
      } else if (service === "org") {
        this.service_selection = false;
        this.service = 2;
      }
    }
  }
};
</script>

<style lang="scss">
.el-main {
  padding: 0px !important;
}
.home {
  text-align: center;
  height: 80vh;
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
  .qr_code {
    width: 300px;
    margin: 20px 0;
  }
  .faq {
    margin: 0 auto;
    max-width: 860px;
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
  .btn-social {
    margin-bottom: 5px !important;
  }
}
</style>
