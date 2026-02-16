import type { Preview } from "@storybook/react-vite";
import { Provider } from "react-redux";
import { createStorybookStore } from "./store";

import "../src/assets/scss/bootstrap.scss";
import "../src/assets/scss/themes.scss";

const store = createStorybookStore();

const preview: Preview = {
  decorators: [
    (Story) => {
      document.documentElement.setAttribute("data-theme", "classic");
      document.documentElement.setAttribute("data-bs-theme", "light");

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
