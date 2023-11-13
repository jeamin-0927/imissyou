import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => {}}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
