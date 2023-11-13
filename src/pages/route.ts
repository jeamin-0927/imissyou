import { Route } from "@/utils/types";

const routes: Route = {
  default: {
    group: ["Home"],
    navigationOptions: {
      headerShown: false,
      animation: "slide_from_right",
      animationDuration: 100,
    },
  },
  modals: {
    group: [],
    navigationOptions: {
      headerShown: false,
      animation: "slide_from_bottom",
      animationDuration: 100,
    },
  },
};

export default routes;
