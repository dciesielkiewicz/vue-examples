import Vue, { ComponentOptions } from "vue";
import Vuetify from "vuetify";
import {
  ConfigurationCallback,
  render as testingLibraryRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/vue";
import "@testing-library/jest-dom";
import { VueClass } from "@vue/test-utils";
import router from "@/router";

const vuetify = new Vuetify({});

// Custom container to integrate Vuetify with Vue Testing Library.
// Vuetify requires you to wrap your app with a v-app component that provides
// a <div data-app="true"> node.
export const render = <V extends Vue>(
  TestComponent: VueClass<V> | ComponentOptions<V>,
  OptionsReceived: RenderOptions<V> = {},
  configure?: ConfigurationCallback<V>
): RenderResult => {
  const root = document.createElement("div");
  root.setAttribute("data-app", "true");

  return testingLibraryRender(
    TestComponent,
    {
      ...OptionsReceived,
      container: document.body.appendChild(root),
      router,
      vuetify,
    },
    configure
  );
};
