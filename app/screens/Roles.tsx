import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Roles = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HealthWorkerLogin")}
        >
          <View style={styles.iconContainer}>
            <Feather name="user-plus" size={24} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Health Worker</Text>
          <Text style={styles.buttonDescription}>
            Register patients, manage blood requests
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.donorButton]}
          onPress={() => navigation.navigate("DonorLogin")}
        >
          <View style={[styles.iconContainer, styles.donorIcon]}>
            <Feather name="heart" size={24} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Donor</Text>
          <Text style={styles.buttonDescription}>
            Donate blood, view requests, save lives
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Your contribution can save lives</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonsContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donorButton: {
    borderColor: "#e60000",
    borderWidth: 1,
  },
  iconContainer: {
    backgroundColor: "#4a89dc",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  donorIcon: {
    backgroundColor: "#e60000",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  buttonDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
});

export default Roles;
