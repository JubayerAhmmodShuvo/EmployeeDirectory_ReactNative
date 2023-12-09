import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import EmployeeDetailsScreen from "./EmployeeDetailsScreen";

const Stack = createStackNavigator();

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [viewType, setViewType] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    // Your data fetching logic here, for example:
    await fetchData();

    setRefreshing(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: "Employee Directory",
            headerRight: () => (
              <Button
                title={
                  viewType === "list" ? "Switch to Cards" : "Switch to List"
                }
                onPress={() =>
                  setViewType(viewType === "list" ? "card" : "list")
                }
              />
            ),
          }}
        >
          {({ navigation }) => (
            <View>
              <FlatList
                data={employees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <EmployeeCard
                    employee={item}
                    viewType={viewType}
                    onSelect={() => {
                      if (viewType === "list") {
                        setSelectedEmployee(item);
                        navigation.navigate("EmployeeDetails", {
                          employee: item,
                        });
                      }
                    }}
                    navigation={navigation}
                  />
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="EmployeeDetails"
          component={EmployeeDetailsScreen}
          options={{ title: "Employee Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
});
