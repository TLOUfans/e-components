<template>
  <div class="block">
    <span class="demonstration">Click 指示器触发</span>
    <el-carousel trigger="click" height="1080px">
      <el-carousel-item v-for="(item, index) in items" :key="index">
        <img :src="item" alt=""/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      items: [
        'http://cn.bing.com/az/hprichbg/rb/Hozoviotissa_ZH-CN13142561850_1920x1080.jpg',
        'http://cn.bing.com/az/hprichbg/rb/Kitesurfing_ZH-CN11259743343_1920x1080.jpg',
        'http://cn.bing.com/az/hprichbg/rb/LoxodontaAfricana_ZH-CN10434704249_1920x1080.jpg',
        'http://cn.bing.com/az/hprichbg/rb/CavernduPontdArc_ZH-CN9994344414_1920x1080.jpg'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
