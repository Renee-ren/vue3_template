export type Tabs = string;

export interface UiTabsProps {
  active: number;
  tabs: Array<Tabs>;
  shrink?: boolean;
  sliderWidth: number | string;
  sliderColor: string;
}

export interface TabBottomSlider {
  width: string; //滑块宽度
  background: string;
  transform: string;
}
