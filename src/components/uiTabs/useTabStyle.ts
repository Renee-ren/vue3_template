import { ref, reactive } from 'vue';
import { UiTabsProps, TabBottomSlider } from './types';

export function useTabStyle<T>(props: UiTabsProps) {
  /* 动态绑定tab的ref */
  const tabItems = ref<any>([]);

  /* tab底部小滑块样式 */
  const tabBottomSliderStyle = reactive<TabBottomSlider>({
    width: props.sliderWidth + 'px',
    background: props.sliderColor,
    transform: '',
  });

  /* 动态获取当前tab宽度方法 */
  const getActiveTabWidth = () => {
    const doms = tabItems.value;
    const activeDom = doms.filter(div => div.classList.contains('tab--active'))[0];
    const { offsetLeft, offsetWidth } = activeDom;
    const left = offsetLeft + offsetWidth / 2;
    return left;
  };

  /* 定位底部滑块位置方法 */
  const setTabBottomSliderLocation = () => {
    tabBottomSliderStyle.transform = `translateX(${getActiveTabWidth()}px) translateX(-50%)`;
  };

  return {
    tabItems,
    tabBottomSliderStyle,
    setTabBottomSliderLocation,
  };
}
