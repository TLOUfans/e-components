<template>
  <div>
    <el-select
    v-model="value"
    multiple
    filterable
    remote
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <div class="block" :style="{ width: width }">
      <npms-carousel trigger="click" :height="height" :review="true" :imgWidth="imgWidth">
        <npms-carousel-item v-for="(item, index) in items" :key="index">
          <img :src="item.src" alt="" :width="width" :des="item.des" @click.stop="handleImgClick(index)"/>
        </npms-carousel-item>
      </npms-carousel>
      <div class="text_container">
        <div class="title">
          <span>{{ title }}</span>
        </div>
        <div class="content">
          <span>{{ content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      items: [{
        src: 'http://cn.bing.com/az/hprichbg/rb/Hozoviotissa_ZH-CN13142561850_1920x1080.jpg',
        des: '描述1',
        title: '标题1',
        content: '内容1'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/Kitesurfing_ZH-CN11259743343_1920x1080.jpg',
        des: '描述2',
        title: '标题2',
        content: '内容2'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/LoxodontaAfricana_ZH-CN10434704249_1920x1080.jpg',
        des: '描述3',
        title: '标题3',
        content: '内容3'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/CavernduPontdArc_ZH-CN9994344414_1920x1080.jpg',
        des: '描述4',
        title: '标题4',
        content: '内容4'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/JantarJaipur_ZH-CN12917938653_1920x1080.jpg',
        des: '描述5',
        title: '标题5',
        content: '内容5'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/YellowNPFirehole_ZH-CN14661526309_1920x1080.jpg',
        des: '描述6',
        title: '标题6',
        content: '内容6'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/KingPhoto_ZH-CN13184031948_1920x1080.jpg',
        des: '描述7',
        title: '标题7',
        content: '内容7'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/Hozoviotissa_ZH-CN13142561850_1920x1080.jpg',
        des: '描述1',
        title: '标题1',
        content: '内容1'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/Kitesurfing_ZH-CN11259743343_1920x1080.jpg',
        des: '描述2',
        title: '标题2',
        content: '内容2'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/LoxodontaAfricana_ZH-CN10434704249_1920x1080.jpg',
        des: '描述3',
        title: '标题3',
        content: '内容3'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/CavernduPontdArc_ZH-CN9994344414_1920x1080.jpg',
        des: '描述4',
        title: '标题4',
        content: '内容4'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/JantarJaipur_ZH-CN12917938653_1920x1080.jpg',
        des: '描述5',
        title: '标题5',
        content: '内容5'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/YellowNPFirehole_ZH-CN14661526309_1920x1080.jpg',
        des: '描述6',
        title: '标题6',
        content: '内容6'
      }, {
        src: 'http://cn.bing.com/az/hprichbg/rb/KingPhoto_ZH-CN13184031948_1920x1080.jpg',
        des: '描述7',
        title: '标题7',
        content: '内容7'
      }],
      imgWidth: '100px',
      height: '320px',
      width: '600px',
      title: '',
      content: '',
      value: '',
      options: [],
      loading: false
    }
  },
  methods: {
    handleImgClick(index) {
      this.title = this.items[index].title;
      this.content = this.items[index].content;
    },
    remoteMethod(query) {
      if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = [{label: 'a', value: 1}, {label: 'b', value: 2}, {label: 'c', value: 3}, {label: 'd', value: 4}];
          }, 200);
        } else {
          this.options = [];
        }
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
