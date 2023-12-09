// EmployeeDetailsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmployeeDetailsScreen = ({ route }) => {
  const { employee } = route.params;

  return (
    <View
      style={[styles.container, { backgroundColor: employee.backgroundColor }]}
    >
      <Text style={styles.title}>{employee.name}</Text>
      <Text>{employee.email}</Text>
      <Text>{employee.phone}</Text>
      <Text>Manager: {employee.parentId ? "Yes" : "No"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default EmployeeDetailsScreen;
