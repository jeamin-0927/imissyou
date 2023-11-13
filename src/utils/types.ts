import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { RecoilState } from "recoil";

type Routes = {
  navigationOptions?: NativeStackNavigationOptions;
  group: string[];
  props?: {
    [key: string]: unknown;
  };
  condition?: () => boolean | Promise<boolean> | boolean;
  conditionRecoil?: RecoilState<unknown>;
};

export type Route = {
  default: Routes;
  [key: string]: Routes;
};
