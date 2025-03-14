"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorSignup = ({ navigation }: any) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("DonorLogin");
    } catch (error: any) {
      Alert.alert("Error", "Signup failed: " + error.message);
    }
  };

  const goToLogin = () => {
    navigation.navigate("DonorLogin");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goToLogin}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Become a Donor</Text>
          <Text style={styles.headerSubtitle}>
            Your donation can save lives
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Feather
              name="user"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather
              name="mail"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather
              name="phone"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Feather
              name="calendar"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </View>

          <Text style={styles.bloodTypeLabel}>Select Your Blood Type:</Text>
          <View style={styles.bloodTypeContainer}>
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.bloodTypeButton,
                  selectedBloodType === type && styles.selectedBloodType,
                ]}
                onPress={() => setSelectedBloodType(type)}
              >
                <Text
                  style={[
                    styles.bloodTypeText,
                    selectedBloodType === type && styles.selectedBloodTypeText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.termsText}>
            By signing up, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Register as Donor</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Already registered? </Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Why Donate Blood?</Text>
          <Text style={styles.infoText}>
            • One donation can save up to three lives{"\n"}• Blood cannot be
            manufactured, only donated{"\n"}• Someone needs blood every two
            seconds{"\n"}• Most people can donate blood every 56 days
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e60000",
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  bloodTypeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  bloodTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  bloodTypeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedBloodType: {
    backgroundColor: "#e60000",
    borderColor: "#e60000",
  },
  bloodTypeText: {
    color: "#333",
    fontWeight: "bold",
  },
  selectedBloodTypeText: {
    color: "#fff",
  },
  termsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
  },
  termsLink: {
    color: "#e60000",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#e60000",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginPromptText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#e60000",
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#e60000",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default DonorSignup;
