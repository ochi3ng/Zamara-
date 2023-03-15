import { View, Text } from "react-native";
import React, { useState } from "react";
import CreateStaff from "./staffComponents/CreateStaff";
import ListStaffComponent from "./staffComponents/ListStaffComponent ";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const stack = createNativeStackNavigator();
const StaffDetailScreen = () => {
    return (
        <stack.Navigator initialRouteName={"list"}>
            <stack.Screen name="create" component={CreateStaff} options={{ headerShown: false }} />
            <stack.Screen name="list" component={ListStaffComponent} options={{ headerShown: false }} />
        </stack.Navigator>
    );
};

export default StaffDetailScreen;