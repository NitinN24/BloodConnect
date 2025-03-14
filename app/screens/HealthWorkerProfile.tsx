"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const HealthWorkerProfile = ({ navigation }: any) => {
  // Sample profile data - in a real app, this would come from an API
  const [profile, setProfile] = useState({
    id: "HW12345",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1 234-567-8901",
    hospital: "City General Hospital",
    department: "Hematology",
    licenseId: "MD-987654",
    address: "123 Medical Center Blvd, Cityville, USA",
    bio: "Experienced hematologist with 8 years of specialization in blood disorders and transfusion medicine. Passionate about improving blood donation processes and patient care.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [availableForEmergency, setAvailableForEmergency] = useState(true);

  const handleSaveProfile = () => {
    // Validate form
    if (
      !editedProfile.name ||
      !editedProfile.email ||
      !editedProfile.phone ||
      !editedProfile.hospital
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    // In a real app, this would update the profile via an API
    setProfile(editedProfile);
    setIsEditing(false);
    Alert.alert("Success", "Your profile has been updated successfully");
  };

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          // In a real app, this would clear auth tokens and navigate to login
          console.log("User logged out");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Feather name={isEditing ? "x" : "edit"} size={24} color="#4a89dc" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profile.image }}
              style={styles.profileImage}
            />
            {isEditing && (
              <TouchableOpacity style={styles.changePhotoButton}>
                <Feather name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          {!isEditing ? (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileHospital}>{profile.hospital}</Text>
              <View style={styles.profileBadge}>
                <Feather name="shield" size={12} color="#4a89dc" />
                <Text style={styles.profileBadgeText}>
                  Verified Health Worker
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.profileEditInfo}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={editedProfile.name}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, name: text })
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Hospital/Clinic"
                  value={editedProfile.hospital}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, hospital: text })
                  }
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {!isEditing ? (
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="mail" size={16} color="#4a89dc" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoText}>{profile.email}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="phone" size={16} color="#4a89dc" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoText}>{profile.phone}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="briefcase" size={16} color="#4a89dc" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Department</Text>
                  <Text style={styles.infoText}>{profile.department}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="credit-card" size={16} color="#4a89dc" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>License ID</Text>
                  <Text style={styles.infoText}>{profile.licenseId}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="map-pin" size={16} color="#4a89dc" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoText}>{profile.address}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.editContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={editedProfile.email}
                    onChangeText={(text) =>
                      setEditedProfile({ ...editedProfile, email: text })
                    }
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={editedProfile.phone}
                    onChangeText={(text) =>
                      setEditedProfile({ ...editedProfile, phone: text })
                    }
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Department</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Department"
                    value={editedProfile.department}
                    onChangeText={(text) =>
                      setEditedProfile({ ...editedProfile, department: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>License ID</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="License ID"
                    value={editedProfile.licenseId}
                    onChangeText={(text) =>
                      setEditedProfile({ ...editedProfile, licenseId: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={editedProfile.address}
                    onChangeText={(text) =>
                      setEditedProfile({ ...editedProfile, address: text })
                    }
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio</Text>

          {!isEditing ? (
            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </View>
          ) : (
            <View style={styles.inputGroup}>
              <View style={[styles.inputContainer, { height: 100 }]}>
                <TextInput
                  style={[
                    styles.input,
                    { height: 100, textAlignVertical: "top" },
                  ]}
                  placeholder="Tell us about yourself"
                  value={editedProfile.bio}
                  onChangeText={(text) =>
                    setEditedProfile({ ...editedProfile, bio: text })
                  }
                  multiline
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingsContainer}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive alerts for new requests
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#ccc", true: "#4a89dc" }}
                thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Email Alerts</Text>
                <Text style={styles.settingDescription}>
                  Receive daily summary emails
                </Text>
              </View>
              <Switch
                value={emailAlertsEnabled}
                onValueChange={setEmailAlertsEnabled}
                trackColor={{ false: "#ccc", true: "#4a89dc" }}
                thumbColor={emailAlertsEnabled ? "#fff" : "#f4f3f4"}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Available for Emergency</Text>
                <Text style={styles.settingDescription}>
                  Can be contacted for urgent cases
                </Text>
              </View>
              <Switch
                value={availableForEmergency}
                onValueChange={setAvailableForEmergency}
                trackColor={{ false: "#ccc", true: "#4a89dc" }}
                thumbColor={availableForEmergency ? "#fff" : "#f4f3f4"}
              />
            </View>
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={18} color="#d9534f" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4a89dc",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileHospital: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f5ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  profileBadgeText: {
    fontSize: 12,
    color: "#4a89dc",
    marginLeft: 5,
  },
  profileEditInfo: {
    width: "100%",
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoContainer: {},
  infoRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f5ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 3,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  bioContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
  },
  bioText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  settingsContainer: {},
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 12,
    color: "#999",
  },
  editContainer: {},
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
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 45,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4a89dc",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: "#d9534f",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default HealthWorkerProfile;
