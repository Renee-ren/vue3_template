<template>
  <div class="ui-tabs" :class="{ shrink: shrink, 'bottom-line': showBottomLine }">
    <div
      v-for="(tab, index) in tabs"
      :key="'tab' + index"
      :ref="
        el => {
          if (el) tabItems[index] = el;
        }
      "
      class="tab"
      :class="{ 'tab--active': active === index, 'tab--inactive': active !== index }"
      @click="changeTab(index)"
    >
      {{ tab }}
    </div>
    <div class="tab__line" :style="tabBottomSliderStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, watch } from 'vue';
import { Tabs } from './types';
import { useTabStyle } from './useTabStyle';

const props = withDefaults(
  defineProps<{
    active: number; //tab索引
    tabs: Array<Tabs>; //tab列表
    shrink?: boolean; //排列方式：左对齐/居中对齐
    titleActiveColor?: string; //当前tab标题颜色
    titleActiveSize?: string; //当前tab标题字体大小
    titleInactiveColor?: string; //非当前tab标题颜色
    titlInactiveSize?: string; //非当前tab标题字体大小
    titleBottomGap?: string; //标题距底部边框线的距离
    sliderWidth?: number | string; //底部滑块长度
    sliderColor?: string; //底部滑块颜色
    showBottomLine?: boolean; //是否显示底部边框线
    bottomLineColor?: string; //底部边框线颜色
  }>(),
  {
    shrink: false,
    titleActiveColor: '#111',
    titleActiveSize: '0.32rem',
    titleInactiveColor: '#5c5c5c',
    titlInactiveSize: '0.28rem',
    titleBottomGap: '0.28rem',
    sliderWidth: 18,
    sliderColor: '#ff7500',
    showBottomLine: true,
    bottomLineColor: 'transparent',
  }
);

const emit = defineEmits(['update:active']);

const { tabItems, tabBottomSliderStyle, setTabBottomSliderLocation } = useTabStyle(props);

onMounted(() => {
  /* 在Dom渲染完成后赋初始值，改变小横条的位置*/
  setTabBottomSliderLocation();
});

/* tabs数据发生变化时，实时更新小横条位置 */
watch(
  () => props.tabs,
  () => {
    nextTick(() => {
      setTabBottomSliderLocation();
    });
  },
  { deep: true }
);

/* 点击切换tab方法 */
const changeTab = index => {
  emit('update:active', index);
  nextTick(() => {
    setTabBottomSliderLocation();
  });
};
</script>

<style lang="less" scoped>
.ui-tabs {
  position: relative;
  padding-bottom: v-bind(titleBottomGap);
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  .tab--active {
    font-size: v-bind(titleActiveSize);
    font-weight: bold;
    font-family: PingFangSC, PingFangSC-Medium;
    color: v-bind(titleActiveColor);
  }
  .tab--inactive {
    font-size: v-bind(titlInactiveSize);
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: v-bind(titleInactiveColor);
  }
  .tab__line {
    position: absolute;
    bottom: 1px;
    left: 0;
    z-index: 1;
    height: 3px;
    border-radius: 2px;
    transition-duration: 0.3s;
  }
}
.shrink {
  justify-content: unset;
  .tab:not(:nth-child(1)) {
    margin-left: 16px;
  }
}
.bottom-line {
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: v-bind(bottomLineColor);
    transform: scaleY(0.5);
  }
}
</style>
