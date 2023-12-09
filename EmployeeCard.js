import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

const EmployeeCard = ({ employee, viewType, onSelect, navigation }) => {
  const { name, email, phone, manager, backgroundColor, subordinates } =
    employee;

  const textColor = backgroundColor === "black" ? "white" : "black";

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{name}</Text>
      <Text style={{ color: textColor }}>{email}</Text>
      <Text style={{ color: textColor }}>{phone}</Text>
      <Text style={{ color: textColor }}>
        Manager: {employee.parentId ? "Yes" : "No"}
      </Text>
      {manager && (
        <View>
          <Text style={[styles.subtitle, { color: textColor }]}>Manager:</Text>
          <Text style={{ color: textColor }}>{manager.name}</Text>
        </View>
      )}
      {viewType === "single" && (
        <>
          <Text style={[styles.subtitle, { color: textColor }]}>
            Subordinates:
          </Text>
          {subordinates && (
            <FlatList
              data={subordinates}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={{ color: textColor }} key={item.id}>
                  {item.name}
                </Text>
              )}
            />
          )}
        </>
      )}
      {viewType === "list" && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSelect}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "indigo",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EmployeeCard;
