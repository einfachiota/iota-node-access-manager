<template>
  <div class="home">
    <div class="hero">
      <h2 class="heading">Welcome to the Tangle Bay</h2>
      <p class="sub-heading">Cluster Access Portal.</p>
    </div>

    <div class="section section-background">
      <div v-if="service_selection" class="container">
        <p>Tangle Bay provides public and private IOTA nodes for daily usage.</p>
        <div>
          <el-button @click="open('com')">Get Cluster access</el-button>
          <br>
          <br>
          <el-button @click="open('org')">Just show #IOTALove</el-button>
        </div>
      </div>

      <div v-else class="container">
        <div v-if="service == 1">
          <br>
          <Payment />
        </div>
        <div v-if="service == 2">
          <h3>Just tip</h3>
          <br>
          <div>
            <img class="qr_code" src="../assets/qr.jpg" />
            <br />
            <a
              class="btn btn-primary"
              href="iota://DTOAQKJL9ZBXMSZYVXOXWQPFXMFRPDUWQJNDLKNLMUMSTVCCPPTRVAPWANVHIEFFFACEVDMXXVLTMNFTWCSAEHWFXC/"
            >Tip with Trinity</a>
            <br>
            <b><p>Trinity Community Node: https://community.tanglebay.org</p></b>
          </div>
        </div>
      </div>
    </div>
    <div>
      <br>
      <br>
      <h3>About</h3>
      <br>
      <p>Tangle Bay tries to provide the IOTA community stable and reliable nodes.</p>
      <p>That's why we're providing an access point for different <a href="https://tanglebay.org/community">nodes of the community</a>, as well as a <a href="https://tanglebay.org/cluster">own node cluster</a> for access to the tangle with your Trinity wallet.</p>
      <p>Tangle Bay offers fast proof of work thanks to its own POW nodes (FPGA).</p>
      <br>
      <!--<b><p>Please read our <a href="https://tanglebay.org/faq">FAQ</a> for more information.</p></b>-->
      <br>
      </div>
    <!--<div class="section">
      <h3>FAQ</h3>
      <FAQ class="faq" />
    </div>-->
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
  min-height: 80vh;
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
