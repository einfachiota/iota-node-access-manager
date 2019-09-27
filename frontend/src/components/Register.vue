<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
          <b-alert v-if="data.status == 'error'" show variant="danger">{{data.message}}</b-alert>
      <b-form-group id="input-group-name" label="Your Name:" label-for="input-name">
        <b-form-input id="input-name" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <div v-else>
      <b-alert v-if="data.status == 'OK'" show variant="success">{{data.message}}</b-alert>
      <b-alert v-else show variant="danger">{{data.message}}</b-alert>
      <div v-if="data.status == 'OK'">
        <p>
          Username:
          <strong>{{user.name}}</strong>
        </p>
        <div v-if="!paymentSuccess">
          <p>Please pay 1000 IOTA and you get your passwort!</p>
          <img v-if="qr_code_data" v-bind:src="qr_code_data.src" alt="QR CODE">
          <br>
          <br>
          <a
            class="btn btn-primary"
            :href="`iota://${data.payment.address}/?amount=${data.payment.value}`"
          >Pay with Trinty</a>
        </div>
        <div v-else>
          <p>
            Password:
            <strong>{{user.password}}</strong>
            <b-button
              class="btn-copy"
              size="sm"
              variant="info"
              v-clipboard:copy="user.password"
            >Copy Address!</b-button>
          </p>
          <p>
            <strong>https://nodes.tanglebay.com</strong>
            <b-button
              class="btn-copy"
              size="sm"
              variant="info"
              v-clipboard:copy="'https://nodes.tanglebay.com'"
            >Copy!</b-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import * as IotaQR from "@tangle-frost/iota-qr-lib/pkg/iota-qr-lib.js";

export default {
  data() {
    return {
      form: {
        name: ""
      },
      show: true,
      data: {
        status: null,
        message: ""
      },
      qr_code_data: false,
      user: {
        name: "",
        password: ""
      },
      paymentSuccess: false
    };
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    payments: function(message) {
      console.log("payments", message);
      if (message.status == "paymentSuccess") {
        this.paymentSuccess = true;
        let data = JSON.parse(message.payment.data);
        this.user.password = data.password;
        this.data.message = "Payment success";
      }
    }
  },
  methods: {
    onSubmit(evt) {
      let self = this;
      evt.preventDefault();

      axios
        .post("http://localhost:3000/register", this.form)
        .then(function(response) {
          console.log(response);
          self.data = response.data;
          self.user = JSON.parse(response.data.payment.data);
          let paymentData = IotaQR.TrinityPaymentQR.generatePaymentData(
            response.data.payment.address,
            response.data.payment.value,
            "EINFACHIOTA",
            ""
          );
          IotaQR.TrinityPaymentQR.renderHtml(paymentData, "png", 8).then(
            qr_code_data => {
              self.show = false;

              self.qr_code_data = qr_code_data
              console.log("qr_code_data", qr_code_data);
              console.log("qr_code_data", qr_code_data.src);
            }
          );
        })
        .catch(function(error) {
          console.log("CLG")
          console.log(error);
          self.data.status = "error";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-copy {
  margin-left: 10px;
}
</style>