<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="What types of tips are there?" name="1">
      <div>There is once the possibility to send normal tips and once the possibility to send tips and get access to my private nodes. If you don't want to get access, you can use the alternative one.</div>
      <div>I also offer the possibility to use the Community Nodes of TangleBay (https://nodes.tanglebay.org) and of course also completely free of charge.</div>
    </el-collapse-item>
    <el-collapse-item title="Do I have to tip for the private nodes?" name="2">
      <div>I hereby expressly do not sell access to my nodes, but I must ensure that they are not misused. For my protection, it is my gift to you as a thank-you for your support.</div>
      <div>If you don't want to type or even want to have access, you can simply use my Community Node from TangleBay (https://nodes.tanglebay.org), which is also completely free and without access restrictions.</div>
    </el-collapse-item>
    <el-collapse-item title="How long can I get access to the private nodes" name="3">
      <div>The access per user has always a maximum of 30 days, so that unused users are sorted out and no accesses can be exploited.</div>
      <div>Of course you can send me another tip at any time and the period will be updated or you can use my completely free node (https://nodes.tanglebay.org).</div>
    </el-collapse-item>
    <el-collapse-item title="Why should anyone tip me?" name="4">
      <div>The tips help me to continue using the services of TangleBay for the community. Furthermore it enables me to run future services for TangleBay.</div>
      <div>Since I don't sell goods or advertise, I'm happy about any support from the community and thank you all for that!</div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1"
    };
  }
};
</script>