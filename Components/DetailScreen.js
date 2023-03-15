import "react-native-gesture-handler";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createDrawerNavigator } from "@react-navigation/drawer";
import UserDetailScreen from "./UserDetailScreen";
import StaffDetailScreen from "./StaffDetailScreen";
import ContinentScreen from "./ContinentScreen";
import LogOutScreen from "./LogOutScreen";

const DetailScreen = ({ route }) => {
  const Drawer = createDrawerNavigator();
  const { userId, name } = route.params;
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen
        name="home"
        component={UserDetailScreen}
        options={{ drawerLabel: "Home" }}
        initialParams={{ userId: userId }}
      />
      <Drawer.Screen name="staff" component={StaffDetailScreen} options={{ drawerLabel: "Staff" }} />
      <Drawer.Screen name="continents" component={ContinentScreen} options={{ drawerLabel: "Continents" }} />
      <Drawer.Screen name="log out" component={LogOutScreen} options={{ drawerLabel: "Log Out" }} initialParams={{ userId: userId, name: name }} />
    </Drawer.Navigator>
  );
};

export default DetailScreen;