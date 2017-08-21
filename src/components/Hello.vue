<template>
  <div class="block" id="CarouselContainer">
    <el-carousel trigger="click" :height="height" :review="true" :imgWidth="imgWidth">
      <el-carousel-item v-for="(item, index) in items" :key="index">
        <img :src="item.src" alt="" :width="width" :des="item.des"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      items: [{
        src: 'http://cn.bing.com/az/hprichbg/rb/Hozoviotissa_ZH-CN13142561850_1920x1080.jpg',
        des: '描述1'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/Kitesurfing_ZH-CN11259743343_1920x1080.jpg',
        des: '描述2'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/LoxodontaAfricana_ZH-CN10434704249_1920x1080.jpg',
        des: '描述3'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/CavernduPontdArc_ZH-CN9994344414_1920x1080.jpg',
        des: '描述4'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/JantarJaipur_ZH-CN12917938653_1920x1080.jpg',
        des: '描述5'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/YellowNPFirehole_ZH-CN14661526309_1920x1080.jpg',
        des: '描述6'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/KingPhoto_ZH-CN13184031948_1920x1080.jpg',
        des: '描述7'
      }],
      imgWidth: '200px',
      height: '540px',
      width: '960px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #CarouselContainer {
    width: 960px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item img {
    cursor: pointer;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
