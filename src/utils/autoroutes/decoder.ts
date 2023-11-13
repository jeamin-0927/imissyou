/* eslint-disable quotes */
/* eslint-disable indent */

import { Route } from "../types";

const decoder = async (filePath: string) => {
  const route = ((await import(filePath)) as { default: Route }).default;

  let groups: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = {};
  Object.entries(route).map(([, value]) => {
    groups = [...groups, ...value.group];
    for (const component of value.group) {
      props[component] = undefined;
    }
    Object.entries(value.props || {}).map(([key, v]) => {
      props[key] = v;
    });
  });
  groups = [...new Set(groups)];

  const stackParamList = JSON.stringify(props, (k, v) =>
    v === undefined ? null : v,
  )
    .replaceAll(',"', ';"')
    .replaceAll("null", "undefined");

  const groupImports = groups.length
    ? groups
        .map(group => {
          return `import ${group} from "./${group}";`;
        })
        .join("\n")
    : "";

  const groupScreens = (groupName: string) =>
    route[groupName].group.length
      ? route[groupName].group.map(group => {
          return `<Stack.Screen name="${group}" component={${group}} />`;
        })
      : "";

  const StackGroups = Object.entries(route).map(([key, value]) =>
    value.group.length
      ? `
      <Stack.Group
        screenOptions={${JSON.stringify(value.navigationOptions)}}
      >
        ${groupScreens(key)}
      </Stack.Group>`
      : "",
  );

  const routeFile = `// Path: ${filePath}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
${"\n" + groupImports}

type StackParamList = ${stackParamList};

const Stack = createNativeStackNavigator<StackParamList>();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="${route.default.group[0]}"
      screenOptions={${JSON.stringify(route.default.navigationOptions)}}>
      ${StackGroups.join("\n")}
    </Stack.Navigator>
  );
};

export default Route;`;
  return routeFile;
};

export default decoder;
