<template>
  <div class="home">
    <div class="hero">
      <h2 class="heading">Welcome to the TangleBay Tip-Portal</h2>
      <p class="sub-heading">Your gate to the Tangle.</p>
    </div>

    <div class="section section-background">
      <div v-if="service_selection" class="container">
        <p>TangleBay provides public and private IOTA nodes for daily usage.</p>
        <div>
          <el-button @click="open('com')">Tip with Node-Auth</el-button>
          <br>
          <br>
          <el-button @click="open('org')">Tip without Node-Auth</el-button>
        </div>
      </div>

      <div v-else class="container">
        <div v-if="service == 1">
          <h3>Tip with Node-Auth</h3>
          <br>
          <Payment />
        </div>
        <div v-if="service == 2">
          <h3>Tip without Node-Auth</h3>
          <br>
          <div>
            <img class="qr_code" src="../assets/qr.jpg" />
            <br />
            <a
              class="btn btn-primary"
              href="iota://DTOAQKJL9ZBXMSZYVXOXWQPFXMFRPDUWQJNDLKNLMUMSTVCCPPTRVAPWANVHIEFFFACEVDMXXVLTMNFTWCSAEHWFXC/"
            >Tip with Trinity</a>
            <br>
            <p>Trinity Community Node: https://nodes.tanglebay.org<p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <br>
      <h3>FAQ</h3>
      <br>
      <p><b>What is the difference between Tip with node-auth and without node-auth?</b></p>
      <p>If you want to enter a tip without node-auth, you will receive the normal tip address of TangleBay. For a tip with node-auth, you can use the TangleBay node with authentication (more secure) later.</p>
      <br>
      <p><b>Do I have to tip to use TangleBay?</b></p>
      <p>No! The TangleBay Community Nodes are free to use and free of charge. The use of the private nodes of TangleBay is only possible via authentication. The nodes are also accessible via the community node, so there is no disadvantage.</p>
      <br>
      <p><b>How long is the access time to the TangleBay private nodes?</b></p>
      <p>The access per user has always a maximum of 30 days, so that unused users are sorted out and no accesses can be exploited. Of course you can send another tip at any time and the period will be updated or you can use the completely free TangleBay community node (https://nodes.tanglebay.org).</p>
      <br>
      <p><b>Why should anyone tip for TangleBay?</b></p>
      <p>The tips help me to continue using the services of TangleBay for the community. Furthermore it enables me to run future services for TangleBay. Since I don't sell goods or advertise, I'm happy about any support from the community and thank you all for that!</p>
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
