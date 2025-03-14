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

const DonorProfile = ({ navigation }: any) => {
  // Sample profile data - in a real app, this would come from an API
  const [profile, setProfile] = useState({
    id: "D12345",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 234-567-8901",
    bloodType: "O+",
    age: 28,
    gender: "Male",
    weight: "75",
    height: "180",
    address: "123 Main St, Anytown, USA",
    lastDonation: "2023-03-15",
    totalDonations: 5,
    medicalConditions: "None",
    allergies: "None",
    medications: "None",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [emergencyAlertsEnabled, setEmergencyAlertsEnabled] = useState(true);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSaveProfile = () => {
    // Validate form
    if (
      !editedProfile.name ||
      !editedProfile.email ||
      !editedProfile.phone ||
      !editedProfile.bloodType
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

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Feather name={isEditing ? "x" : "edit"} size={24} color="#e60000" />
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
              <View style={styles.bloodTypeContainer}>
                <Text style={styles.bloodTypeText}>{profile.bloodType}</Text>
              </View>
              <Text style={styles.donationCount}>
                {profile.totalDonations} donations
              </Text>
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
              <View style={styles.bloodTypeSelector}>
                {bloodTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.bloodTypeButton,
                      editedProfile.bloodType === type &&
                        styles.selectedBloodType,
                    ]}
                    onPress={() =>
                      setEditedProfile({ ...editedProfile, bloodType: type })
                    }
                  >
                    <Text
                      style={[
                        styles.bloodTypeButtonText,
                        editedProfile.bloodType === type &&
                          styles.selectedBloodTypeText,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
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
                  <Feather name="mail" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoText}>{profile.email}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="phone" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoText}>{profile.phone}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="calendar" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Age</Text>
                  <Text style={styles.infoText}>{profile.age} years</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="user" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Gender</Text>
                  <Text style={styles.infoText}>{profile.gender}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="map-pin" size={16} color="#e60000" />
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

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.inputLabel}>Age</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Age"
                      value={editedProfile.age.toString()}
                      onChangeText={(text) =>
                        setEditedProfile({
                          ...editedProfile,
                          age: Number(text),
                        })
                      }
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Gender"
                      value={editedProfile.gender}
                      onChangeText={(text) =>
                        setEditedProfile({ ...editedProfile, gender: text })
                      }
                    />
                  </View>
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
          <Text style={styles.sectionTitle}>Health Information</Text>

          {!isEditing ? (
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="calendar" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Last Donation</Text>
                  <Text style={styles.infoText}>
                    {formatDate(profile.lastDonation)}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="activity" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Weight</Text>
                  <Text style={styles.infoText}>{profile.weight} kg</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="trending-up" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Height</Text>
                  <Text style={styles.infoText}>{profile.height} cm</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="alert-circle" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Medical Conditions</Text>
                  <Text style={styles.infoText}>
                    {profile.medicalConditions}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="x-circle" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Allergies</Text>
                  <Text style={styles.infoText}>{profile.allergies}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Feather name="package" size={16} color="#e60000" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Medications</Text>
                  <Text style={styles.infoText}>{profile.medications}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.editContainer}>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.inputLabel}>Weight (kg)</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Weight"
                      value={editedProfile.weight}
                      onChangeText={(text) =>
                        setEditedProfile({ ...editedProfile, weight: text })
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Height (cm)</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Height"
                      value={editedProfile.height}
                      onChangeText={(text) =>
                        setEditedProfile({ ...editedProfile, height: text })
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Medical Conditions</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Medical Conditions (if any)"
                    value={editedProfile.medicalConditions}
                    onChangeText={(text) =>
                      setEditedProfile({
                        ...editedProfile,
                        medicalConditions: text,
                      })
                    }
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Allergies</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Allergies (if any)"
                    value={editedProfile.allergies}
                    onChangeText={(text) =>
                      setEditedProfile({ ...editedProfile, allergies: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Medications</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Medications (if any)"
                    value={editedProfile.medications}
                    onChangeText={(text) =>
                      setEditedProfile({ ...editedProfile, medications: text })
                    }
                  />
                </View>
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
                  Receive alerts for blood requests
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#ccc", true: "#e60000" }}
                thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Location Services</Text>
                <Text style={styles.settingDescription}>
                  Allow access to your location
                </Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: "#ccc", true: "#e60000" }}
                thumbColor={locationEnabled ? "#fff" : "#f4f3f4"}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Emergency Alerts</Text>
                <Text style={styles.settingDescription}>
                  Receive urgent blood request notifications
                </Text>
              </View>
              <Switch
                value={emergencyAlertsEnabled}
                onValueChange={setEmergencyAlertsEnabled}
                trackColor={{ false: "#ccc", true: "#e60000" }}
                thumbColor={emergencyAlertsEnabled ? "#fff" : "#f4f3f4"}
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
          <Feather name="log-out" size={18} color="#e60000" />
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
    backgroundColor: "#e60000",
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
    marginBottom: 10,
  },
  bloodTypeContainer: {
    backgroundColor: "#ffebee",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  bloodTypeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e60000",
  },
  donationCount: {
    fontSize: 14,
    color: "#666",
  },
  profileEditInfo: {
    width: "100%",
  },
  bloodTypeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  bloodTypeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  selectedBloodType: {
    backgroundColor: "#e60000",
    borderColor: "#e60000",
  },
  bloodTypeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  selectedBloodTypeText: {
    color: "#fff",
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
    backgroundColor: "#ffebee",
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
  inputRow: {
    flexDirection: "row",
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
    backgroundColor: "#e60000",
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
    color: "#e60000",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default DonorProfile;
