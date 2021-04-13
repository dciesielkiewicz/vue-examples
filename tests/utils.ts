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

export const render = <V extends Vue>(
  TestComponent: VueClass<V> | ComponentOptions<V>,
  OptionsReceived: RenderOptions<V> = {},
  configure?: ConfigurationCallback<V>
): RenderResult =>
  testingLibraryRender(
    TestComponent,
    { ...OptionsReceived, router, vuetify },
    configure
  );
