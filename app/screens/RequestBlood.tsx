import React, { useState } from "react";
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

const RequestBlood = ({ navigation }: any) => {
  const [patientName, setPatientName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("1");
  const [hospital, setHospital] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [reason, setReason] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Low", "Medium", "High"];

  const handleSubmitRequest = () => {
    // Validate form
    if (
      !patientName ||
      !bloodType ||
      !units ||
      !hospital ||
      !urgency ||
      !reason ||
      !contactNumber
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    if (!agreeToTerms) {
      Alert.alert(
        "Terms Agreement",
        "Please agree to the terms and conditions"
      );
      return;
    }

    // In a real app, this would submit the request to an API
    Alert.alert(
      "Request Submitted",
      "Your blood request has been successfully submitted. You will be notified when donors respond.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("dashboard"),
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
        <Text style={styles.headerTitle}>Request Blood</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Patient Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Patient Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter patient name"
                value={patientName}
                onChangeText={setPatientName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Blood Type Required</Text>
            <View style={styles.bloodTypeContainer}>
              {bloodTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.bloodTypeButton,
                    bloodType === type && styles.selectedBloodType,
                  ]}
                  onPress={() => setBloodType(type)}
                >
                  <Text
                    style={[
                      styles.bloodTypeText,
                      bloodType === type && styles.selectedBloodTypeText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Units Required</Text>
            <View style={styles.unitsContainer}>
              <TouchableOpacity
                style={styles.unitButton}
                onPress={() =>
                  setUnits((prev) => Math.max(1, parseInt(prev) - 1).toString())
                }
              >
                <Feather name="minus" size={20} color="#e60000" />
              </TouchableOpacity>
              <View style={styles.unitInputContainer}>
                <TextInput
                  style={styles.unitInput}
                  value={units}
                  onChangeText={setUnits}
                  keyboardType="numeric"
                  textAlign="center"
                />
              </View>
              <TouchableOpacity
                style={styles.unitButton}
                onPress={() =>
                  setUnits((prev) => (parseInt(prev) + 1).toString())
                }
              >
                <Feather name="plus" size={20} color="#e60000" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Request Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Hospital/Location</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter hospital or location"
                value={hospital}
                onChangeText={setHospital}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Urgency Level</Text>
            <View style={styles.urgencyContainer}>
              {urgencyLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.urgencyButton,
                    urgency === level && styles.selectedUrgency,
                    level === "Low"
                      ? styles.lowUrgency
                      : level === "Medium"
                      ? styles.mediumUrgency
                      : styles.highUrgency,
                  ]}
                  onPress={() => setUrgency(level)}
                >
                  <Text
                    style={[
                      styles.urgencyText,
                      urgency === level && styles.selectedUrgencyText,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Reason for Request</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter reason for blood request"
                value={reason}
                onChangeText={setReason}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contact Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter contact number"
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Additional Information (Optional)
            </Text>
            <View style={[styles.inputContainer, { height: 100 }]}>
              <TextInput
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                placeholder="Enter any additional details that might help donors"
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
                multiline
              />
            </View>
          </View>

          <View style={styles.switchContainer}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Mark as Emergency</Text>
              <Text style={styles.switchDescription}>
                Emergency requests are highlighted and sent as notifications to
                nearby donors
              </Text>
            </View>
            <Switch
              value={isEmergency}
              onValueChange={setIsEmergency}
              trackColor={{ false: "#ccc", true: "#e60000" }}
              thumbColor={isEmergency ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View
                style={[
                  styles.checkbox,
                  agreeToTerms && styles.checkedCheckbox,
                ]}
              >
                {agreeToTerms && (
                  <Feather name="check" size={14} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I confirm that this is a genuine request and agree to the{" "}
              <Text style={styles.termsLink}>terms and conditions</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!agreeToTerms || !patientName || !bloodType || !hospital) &&
                styles.disabledButton,
            ]}
            onPress={handleSubmitRequest}
            disabled={!agreeToTerms || !patientName || !bloodType || !hospital}
          >
            <Text style={styles.submitButtonText}>Submit Request</Text>
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
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  input: {
    height: 45,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  bloodTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bloodTypeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    minWidth: 50,
    alignItems: "center",
  },
  selectedBloodType: {
    backgroundColor: "#e60000",
    borderColor: "#e60000",
  },
  bloodTypeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  selectedBloodTypeText: {
    color: "#fff",
  },
  unitsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitButton: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  unitInputContainer: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  unitInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  urgencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  lowUrgency: {
    backgroundColor: "#e8f5e9",
  },
  mediumUrgency: {
    backgroundColor: "#fff8e1",
  },
  highUrgency: {
    backgroundColor: "#ffebee",
  },
  selectedUrgency: {
    borderColor: "#e60000",
    borderWidth: 2,
  },
  urgencyText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedUrgencyText: {
    color: "#e60000",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  switchInfo: {
    flex: 1,
    marginRight: 10,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  switchDescription: {
    fontSize: 12,
    color: "#666",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  checkboxContainer: {
    marginRight: 10,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#e60000",
    borderColor: "#e60000",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  termsLink: {
    color: "#e60000",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#e60000",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RequestBlood;
