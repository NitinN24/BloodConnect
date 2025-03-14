"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const DonorLogin = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "You are now signed in!");
      navigation.navigate("DashboardDonor"); // ✅ Update navigation name
    } catch (error: any) {
      Alert.alert("Error", "Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Success",
          "Password reset link sent successfully. Please check your email."
        );
      })
      .catch((error) => {
        console.log("Password reset error: ", error);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>❤️</Text>
          <Text style={styles.headerTitle}>BloodConnect</Text>
          <Text style={styles.headerSubtitle}>Donor Portal</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Donor</Text>
          <Text style={styles.subtitle}>Login to save lives</Text>

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
              autoCapitalize="none"
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

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => handleForgetPassword()}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#e60000" />
          ) : (
            <>
              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {/* Create Account Button */}
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() => navigation.navigate("DonorSignup")} // Navigate to SignUp screen
              >
                <Text style={styles.createAccountButtonText}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContainer: { flexGrow: 1, padding: 20 },
  header: { alignItems: "center", marginTop: 40, marginBottom: 40 },
  headerIcon: { fontSize: 40, marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#333" },
  headerSubtitle: { fontSize: 16, color: "#e60000", marginTop: 5 },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 25 },
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
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16 },
  eyeIcon: { padding: 10 },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 20 },
  forgotPasswordText: { color: "#e60000", fontSize: 14 },

  loginButton: {
    backgroundColor: "#e60000",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Reduced margin for spacing
  },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  // Create Account Button
  createAccountButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e60000",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "#e60000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DonorLogin;
