<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="What is the difference between Tip with node-auth and without node-auth?" name="1">
      <div>If you want to enter a tip without node-auth, you will receive the normal tip address of TangleBay. For a tip with node-auth, you can use the TangleBay node with authentication (more secure) later.</div>
    </el-collapse-item>
    <el-collapse-item title="Do I have to tip to use TangleBay?" name="2">
      <div>No! The TangleBay Community Nodes are free to use and free of charge. The use of the private nodes of TangleBay is only possible via authentication. The nodes are also accessible via the community node, so there is no disadvantage.</div>
    </el-collapse-item>
    <el-collapse-item title="How long is the access time to the TangleBay private nodes?" name="3">
      <div>The access per user has always a maximum of 30 days, so that unused users are sorted out and no accesses can be exploited. Of course you can send another tip at any time and the period will be updated or you can use the completely free TangleBay community node (https://nodes.tanglebay.org).</div>
    </el-collapse-item>
    <el-collapse-item title="Why should anyone tip for TangleBay?" name="4">
      <div>The tips help me to continue using the services of TangleBay for the community. Furthermore it enables me to run future services for TangleBay. Since I don't sell goods or advertise, I'm happy about any support from the community and thank you all for that!</div>
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