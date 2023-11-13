// Path: ../../../src/pages//Home/route.ts
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Main from "./Main";

type StackParamList = {"Main":undefined};

const Stack = createNativeStackNavigator<StackParamList>();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{"headerShown":false,"animation":"slide_from_right","animationDuration":100}}>
      
      <Stack.Group
        screenOptions={{"headerShown":false,"animation":"slide_from_right","animationDuration":100}}
      >
        <Stack.Screen name="Main" component={Main} />
      </Stack.Group>

    </Stack.Navigator>
  );
};

export default Route;