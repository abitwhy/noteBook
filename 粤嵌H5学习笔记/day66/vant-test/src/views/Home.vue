<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld></HelloWorld>
    <!-- 使用局部按需引入组件 Button -->
    <Button>btn</Button>
    <!-- 使用全局按需引入组件 van-button -->
    <van-button type="primary">btn</van-button>

    <h1>Bitcoin Price Index</h1>

    <section v-if="errored">
      <p>加载出错了...</p>
    </section>
    <div v-if="loading">loading...</div>
    <div v-else v-for="(currency,index) in info" :key="index">
      {{currency.description }}
      <span class="lighten">
        <span v-html="currency.symbol"></span>{{currency.rate_float|currencydecimal}}
      </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Button } from 'vant' // 局部按需引入


const axios = require('axios').default;

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Button
  },
  data(){
    return {
      info:null,
      errored:false,
      loading:true
    }
  },
  filters:{
    currencydecimal(value){
      console.log(value);
      return value && value.toFixed(2);
    }
  },
  mounted(){
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.info = response.data.bpi;
        })
      .catch(error=>console.log(error))
      .finally(()=>this.loading =false)
  }
}
</script>
<style lang="stylus" scoped>
 .lighten
  color red
</style>
