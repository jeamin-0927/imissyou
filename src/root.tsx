import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";

import Routes from "@/routes";
import colors from "@/utils/colors";

const queryClient = new QueryClient();

export const rootTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.gray000,
  },
};

const Root = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer theme={rootTheme}>
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default Root;
