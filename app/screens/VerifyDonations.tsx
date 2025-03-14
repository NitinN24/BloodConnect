"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const VerifyDonations = ({ navigation }: any) => {
  const [donorId, setDonorId] = useState("");
  const [donorName, setDonorName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("1");
  const [donationDate, setDonationDate] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [weight, setWeight] = useState("");
  const [pulse, setPulse] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [isEligible, setIsEligible] = useState(true);
  const [notes, setNotes] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Sample donor data - in a real app, this would come from scanning or API
  const sampleDonor = {
    id: "D12345",
    name: "Robert Johnson",
    bloodType: "O+",
    age: 28,
    gender: "Male",
    lastDonation: "2023-02-15",
    contactNumber: "+1 234-567-8901",
    address: "123 Main St, Anytown, USA",
  };

  const handleScanQR = () => {
    setIsScanning(true);
    // In a real app, this would trigger the camera for QR scanning
    // For demo purposes, we'll simulate finding a donor after a delay
    setTimeout(() => {
      setIsScanning(false);
      setDonorId(sampleDonor.id);
      setDonorName(sampleDonor.name);
      setBloodType(sampleDonor.bloodType);
      // Set today's date as donation date
      const today = new Date();
      setDonationDate(today.toISOString().split("T")[0]);
    }, 2000);
  };

  const handleVerifyDonation = () => {
    // Validate form
    if (
      !donorId ||
      !donorName ||
      !bloodType ||
      !units ||
      !donationDate ||
      !hemoglobin ||
      !weight ||
      !pulse ||
      !temperature ||
      !bloodPressure
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    // In a real app, this would submit the verification to an API
    Alert.alert(
      "Donation Verified",
      `Donation from ${donorName} has been successfully verified and recorded.`,
      [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setDonorId("");
            setDonorName("");
            setBloodType("");
            setUnits("1");
            setDonationDate("");
            setHemoglobin("");
            setWeight("");
            setPulse("");
            setTemperature("");
            setBloodPressure("");
            setIsEligible(true);
            setNotes("");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Donation</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.scanSection}>
          <Text style={styles.sectionTitle}>Donor Identification</Text>
          <Text style={styles.sectionDescription}>
            Scan donor's QR code or enter details manually
          </Text>

          <TouchableOpacity
            style={styles.scanButton}
            onPress={handleScanQR}
            disabled={isScanning}
          >
            <Feather name="camera" size={20} color="#fff" />
            <Text style={styles.scanButtonText}>
              {isScanning ? "Scanning..." : "Scan Donor QR Code"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Donor ID</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter donor ID"
                value={donorId}
                onChangeText={setDonorId}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Donor Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter donor name"
                value={donorName}
                onChangeText={setDonorName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Blood Type</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter blood type"
                value={bloodType}
                onChangeText={setBloodType}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Units Donated</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter units"
                value={units}
                onChangeText={setUnits}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Donation Date</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={donationDate}
                onChangeText={setDonationDate}
              />
              <TouchableOpacity style={styles.inputIcon}>
                <Feather name="calendar" size={20} color="#4a89dc" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Health Check
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Hemoglobin (g/dL)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter hemoglobin level"
                value={hemoglobin}
                onChangeText={setHemoglobin}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight (kg)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Pulse (bpm)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter pulse rate"
                value={pulse}
                onChangeText={setPulse}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Temperature (°C)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter temperature"
                value={temperature}
                onChangeText={setTemperature}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Blood Pressure (mmHg)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., 120/80"
                value={bloodPressure}
                onChangeText={setBloodPressure}
              />
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              Donor is eligible for donation
            </Text>
            <Switch
              value={isEligible}
              onValueChange={setIsEligible}
              trackColor={{ false: "#ccc", true: "#4a89dc" }}
              thumbColor={isEligible ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Notes</Text>
            <View style={[styles.inputContainer, { height: 100 }]}>
              <TextInput
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                placeholder="Enter any additional notes"
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.verifyButton, !isEligible && styles.disabledButton]}
            onPress={handleVerifyDonation}
            disabled={!isEligible}
          >
            <Feather name="check-circle" size={20} color="#fff" />
            <Text style={styles.verifyButtonText}>
              Verify & Record Donation
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  scanSection: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a89dc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  orText: {
    fontSize: 14,
    color: "#999",
    marginVertical: 15,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputIcon: {
    padding: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  switchLabel: {
    fontSize: 14,
    color: "#333",
  },
  verifyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5cb85c",
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  verifyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default VerifyDonations;
