<template>
  <div>
    <div
      class="el-carousel"
      :class="{ 'el-carousel--card': type === 'card' }"
      @mouseenter.stop="handleMouseEnter"
      @mouseleave.stop="handleMouseLeave">
      <div
        class="el-carousel__container"
        :style="{ height: height }">
        <transition name="carousel-arrow-left">
          <button
            v-if="arrow !== 'never'"
            v-show="arrow === 'always' || hover"
            @mouseenter="handleButtonEnter('left')"
            @mouseleave="handleButtonLeave"
            @click.stop="throttledArrowClick(activeIndex - 1)"
            class="el-carousel__arrow el-carousel__arrow--left">
            <i class="el-icon-arrow-left"></i>
          </button>
        </transition>
        <transition name="carousel-arrow-right">
          <button
            v-if="arrow !== 'never'"
            v-show="arrow === 'always' || hover"
            @mouseenter="handleButtonEnter('right')"
            @mouseleave="handleButtonLeave"
            @click.stop="throttledArrowClick(activeIndex + 1)"
            class="el-carousel__arrow el-carousel__arrow--right">
            <i class="el-icon-arrow-right"></i>
          </button>
        </transition>
        <slot></slot>
      </div>
      <ul
        class="el-carousel__indicators"
        v-if="indicatorPosition !== 'none'"
        :class="{ 'el-carousel__indicators--labels': hasLabel, 'el-carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card' }">
        <li
          v-for="(item, index) in items"
          class="el-carousel__indicator"
          :class="{ 'is-active': index === activeIndex }"
          @mouseenter="throttledIndicatorHover(index)"
          @click.stop="handleIndicatorClick(index)">
          <button class="el-carousel__button"><span v-if="hasLabel">{{ item.label }}</span></button>
        </li>
      </ul>
    </div>
    <ul 
      class="npms-carousel-review" v-if="review" 
      @mouseenter.stop="handleMouseEnter"
      @mouseleave.stop="handleMouseLeave"
      :style="{ width: $props.width }">
      <li v-for="(item, index) in $children">
        <div class="npms-carousel-review-container">
          <div 
          class="npms-carousel-review-border" 
          :class="{ 'npms-review-active': index === activeIndex }"
          @click.stop="handleIndicatorClick(index, $parent)">
            <img :src="item.$slots.default[0].data.attrs.src" alt="" :style="{ float: 'left', width: imgWidth }">
            <span class="describe" v-show="index === activeIndex">{{ item.$slots.default[0].data.attrs.des }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import throttle from 'throttle-debounce/throttle';
import { addResizeListener, removeResizeListener } from '@/utils/resize-event';

export default {
  name: 'NpmsCarousel',
  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: String,
    review: false,
    imgWidth: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };
  },
  computed: {
    hasLabel() {
      return this.items.some(item => item.label.toString().length > 0);
    }
  },
  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    activeIndex(val, oldVal) {
      this.resetItemPosition();
      this.$emit('change', val, oldVal);
    },
    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    }
  },
  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },
    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },
    itemInStage(item, index) {
      const length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
        return 'right';
      }
      return false;
    },
    handleButtonEnter(arrow) {
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },
    handleButtonLeave() {
      this.items.forEach(item => {
        item.hover = false;
      });
    },
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'NpmsCarouselItem');
    },
    resetItemPosition() {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex);
      });
    },
    playSlides() {
      document.querySelectorAll('.npms-carousel-review li').forEach(v => {
        v.style.left = -this.arr[this.activeIndex + 1] + 'px';
      })
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    pauseTimer() {
      clearInterval(this.timer);
    },
    startTimer() {
      if (this.interval <= 0 || !this.autoplay) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },
    setActiveItem(index) {
      if (typeof index === 'string') {
        const filteredItems = this.items.filter(item => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        process.env.NODE_ENV !== 'production' &&
        console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      let length = this.items.length;
      if (index < 0) {
        this.activeIndex = length - 1;
      } else if (index >= length) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = index;
      }
    },
    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },
    next() {
      this.setActiveItem(this.activeIndex + 1);
    },
    handleIndicatorClick(index, parent) {
      this.activeIndex = index;
      document.querySelectorAll('.npms-carousel-review li').forEach(v => {
        v.style.left = -this.arr[index] + 'px';
      })
    },
    handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    }
  },
  created() {
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index);
    });
  },
  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
      let containerWidth = document.querySelector('.npms-carousel-review-container').offsetWidth;
      let ulWidth = document.querySelector('.npms-carousel-review').offsetWidth;
      let count = Math.ceil(ulWidth / 2 / containerWidth);
      this.arr = [];
      let limitWidth = 0;
      if(parseInt(count * containerWidth - ulWidth / 2) >= 0) {
        limitWidth = containerWidth / 2 + parseInt(count * containerWidth - ulWidth / 2);
      } else {
        limitWidth = Math.abs(parseInt(count * containerWidth - ulWidth / 2));
      }
      for(var i = 0; i < this.items.length; i++) {
        if(i < count) {
          this.arr.push(0);
        } else if(i >= count && i < this.items.length - count) {
          this.arr.push(limitWidth + (i - count) * containerWidth);
        } else if(i >= this.items.length - count) {
          this.arr.push(containerWidth * this.items.length - ulWidth);
        }
      }
    });
  },
  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
  }
};
</script>

<style scoped>
  .npms-carousel-review {
    list-style: none;
    margin: 3px 0 0 0;
    padding: 0;
    overflow-x: hidden;
    white-space:nowrap;
  }
  .npms-carousel-review > li{
    display: inline-block;
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: left 300ms;
    left: 0;
  }
  .npms-carousel-review-container {
    position: relative;
  }
  .npms-carousel-review-container .npms-carousel-review-border {
    padding: 2px;
    border: 2px solid #fff;
    overflow: hidden;
    transition: all 500ms;
  }
  .npms-review-active {
    border: 2px solid #FF4949 !important;
    transition: all 500ms;
  }
  .describe {
    position: absolute;
    left: 0;
    bottom: 2px;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.6);
    width: 100%;
    padding: 2px 0 2px 0;
  }
</style>