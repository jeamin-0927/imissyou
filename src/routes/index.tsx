// Path: ../../../src/pages//route.ts
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Home from "./Home";

type StackParamList = {"Home":undefined};

const Stack = createNativeStackNavigator<StackParamList>();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{"headerShown":false,"animation":"slide_from_right","animationDuration":100}}>
      
      <Stack.Group
        screenOptions={{"headerShown":false,"animation":"slide_from_right","animationDuration":100}}
      >
        <Stack.Screen name="Home" component={Home} />
      </Stack.Group>

    </Stack.Navigator>
  );
};

export default Route;