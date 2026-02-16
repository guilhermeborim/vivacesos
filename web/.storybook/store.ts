import { configureStore } from "@reduxjs/toolkit";
import { LAYOUT_THEME_COLOR } from "../src/shared/constants/layout";
import LayoutReducer, { initialState } from "../src/slices/layouts/reducer";

export function createStorybookStore() {
  return configureStore({
    reducer: {
      Layout: LayoutReducer,
    },
    preloadedState: {
      Layout: {
        ...initialState,
        layoutThemeColorType: LAYOUT_THEME_COLOR.PURPLE, // 👈 força seu tema
      },
    },
  });
}
