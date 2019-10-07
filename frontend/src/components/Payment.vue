<template>
  <div>
    <el-form v-if="show">
          <el-alert v-if="data.status == 'error'" show variant="danger">{{data.message}}</el-alert>
          <el-button v-if="data.status == 'error'" @click="onSubmitCharge"  type="submit" variant="primary">Tip again</el-button>

      <el-form-item id="input-group-name" label="Your Username:" label-for="input-name">
        <el-input id="input-name" v-model="form.name" required placeholder="Enter name"></el-input>
      </el-form-item>
      <el-button @click="onSubmit" type="submit" variant="primary">Submit</el-button>
    </el-form>
    <div v-else>
      <el-alert v-if="data.status == 'OK'" show variant="success">{{data.message}}</el-alert>
      <el-alert v-else show variant="danger">{{data.message}}</el-alert>
      <div v-if="data.status == 'OK'">
        <p>
          Username:
          <strong>{{user.name}}</strong>
        </p>
        <div v-if="!paymentSuccess">
          <p>The minimum amount for a tip is 1 MIOTA.</p>
          <p>Please wait and leave the page open until the transaction has been confirmed!</p>
          <img v-if="qr_code_data" v-bind:src="qr_code_data.src" alt="QR CODE">
          <br>
          <br>
          <a
            class="btn btn-primary"
            :href="`iota://${data.payment.address}/?amount=${data.payment.value}`"
          >TIP with Trinity</a>
        </div>
        <div v-else>
          <p v-if="user.password">
            Password:
            <strong>{{user.password}}</strong>
            <el-button
              class="btn-copy"
              size="sm"
              variant="info"
              v-clipboard:copy="user.password"
            >Copy!</el-button>
          </p>
          <p>
            <strong>https://nodes.tanglebay.com</strong>
            <el-button
              class="btn-copy"
              size="sm"
              variant="info"
              v-clipboard:copy="'https://nodes.tanglebay.com'"
            >Copy!</el-button>
          </p>
          <br>
          <br>
          <p><b>Please save the credentials because a recovery is not possible.</b></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import * as IotaQR from "@tangle-frost/iota-qr-lib/pkg/iota-qr-lib.js";

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL

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
        this.data.message = "Transaction successful";
      }
    }
  },
  methods: {
    onSubmit(evt) {
      let self = this;
      evt.preventDefault();

      axios
        .post(`${BACKEND_URL}/register`, this.form)
        .then(function(response) {
          console.log(response);
          self.data = response.data;
          self.user = JSON.parse(response.data.payment.data);
          let paymentData = IotaQR.TrinityPaymentQR.generatePaymentData(
            response.data.payment.address,
            response.data.payment.value,
            "",
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
    },
    onSubmitCharge(evt) {
      let self = this;
      evt.preventDefault();

      axios
        .post(`${BACKEND_URL}/charge`, this.form)
        .then(function(response) {
          console.log(response);
          self.data = response.data;
          self.user = JSON.parse(response.data.payment.data);
          let paymentData = IotaQR.TrinityPaymentQR.generatePaymentData(
            response.data.payment.address,
            response.data.payment.value,
            "",
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
