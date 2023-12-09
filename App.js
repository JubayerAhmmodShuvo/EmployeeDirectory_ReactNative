import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  RefreshControl,
  Text,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import EmployeeDetailsScreen from "./EmployeeDetailsScreen";
import AddEmployeeScreen from "./AddEmployeeScreen";

const Stack = createStackNavigator();

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [viewType, setViewType] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d"
      );
      if (response.status === 200) {
        setEmployees(response.data);
        setError(null);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Error fetching data");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            title: "Employee Directory",
            headerRight: () => (
              <View style={styles.headerButtonContainer}>
                <Button
                  title={
                    viewType === "list" ? "Switch to Cards" : "Switch to List"
                  }
                  onPress={() =>
                    setViewType(viewType === "list" ? "card" : "list")
                  }
                  color="#3498db"
                />
                <Button
                  title="Add"
                  onPress={() => navigation.navigate("AddEmployee")}
                  color="#27ae60"
                />
              </View>
            ),
          })}
        >
          {({ navigation }) => (
            <View style={styles.container}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {error ? (
                <Text>Error: {error}</Text>
              ) : (
                <FlatList
                  style={{ flex: 1 }}
                  data={filteredEmployees}
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
              )}
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="EmployeeDetails"
          component={EmployeeDetailsScreen}
          options={{ title: "Employee Details" }}
        />
        <Stack.Screen
          name="AddEmployee"
          component={AddEmployeeScreen}
          options={{ title: "Add Employee" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    margin: 10,
  },
  container: {
    flex: 1,
  },
});

export default App;
