import { App, render, createVNode } from 'vue';

import uiLoading from './index.vue';

const Loading: any = (app: App, props: any) => {
  const divElement: any = document.querySelector('#uiLoading');

  if (!props.visible || divElement) {
    document.body.removeChild(divElement);
  }

  if (!props.visible) {
    return;
  }

  const node = document.createElement('div');
  node.id = 'uiLoading';

  const vm = createVNode(uiLoading, props as any);
  vm.appContext = app._context;
  render(vm, node);

  document.body.appendChild(node);
};

export default {
  install(app: App): void {
    app.config.globalProperties.$loading = {
      open() {
        Loading(app, { visible: true });
      },

      close() {
        Loading(app, { visible: false });
      },
    };
  },
};
