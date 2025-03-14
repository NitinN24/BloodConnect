import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const HealthWorkerDashboard = ({ navigation }: any) => {
  // Sample data - in a real app, this would come from an API
  const stats = {
    pendingRequests: 12,
    availableDonors: 28,
    todayAppointments: 5,
    urgentRequests: 3,
  };

  const recentRequests = [
    {
      id: "1",
      name: "Jake Paul",
      bloodType: "A+",
      urgency: "High",
      time: "2 hours ago",
    },
    {
      id: "2",
      name: "Steve Smith",
      bloodType: "O-",
      urgency: "Medium",
      time: "5 hours ago",
    },
    {
      id: "3",
      name: "Mike Johnson",
      bloodType: "B+",
      urgency: "Low",
      time: "1 day ago",
    },
  ];

  const upcomingAppointments = [
    {
      id: "1",
      name: "Emma Wilson",
      bloodType: "AB+",
      time: "10:00 AM",
      date: "Today",
    },
    {
      id: "2",
      name: "Robert Brown",
      bloodType: "O+",
      time: "2:30 PM",
      date: "Today",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.userName}>Dr. Sarah</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("HealthWorkerProfile")}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statsCard, { backgroundColor: "#4a89dc" }]}>
              <View style={styles.statsIconContainer}>
                <Feather name="droplet" size={20} color="#fff" />
              </View>
              <Text style={styles.statsNumber}>{stats.pendingRequests}</Text>
              <Text style={styles.statsLabel}>Pending Requests</Text>
            </View>

            <View style={[styles.statsCard, { backgroundColor: "#5cb85c" }]}>
              <View style={styles.statsIconContainer}>
                <Feather name="users" size={20} color="#fff" />
              </View>
              <Text style={styles.statsNumber}>{stats.availableDonors}</Text>
              <Text style={styles.statsLabel}>Available Donors</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statsCard, { backgroundColor: "#f0ad4e" }]}>
              <View style={styles.statsIconContainer}>
                <Feather name="calendar" size={20} color="#fff" />
              </View>
              <Text style={styles.statsNumber}>{stats.todayAppointments}</Text>
              <Text style={styles.statsLabel}>Today's Appointments</Text>
            </View>

            <View style={[styles.statsCard, { backgroundColor: "#d9534f" }]}>
              <View style={styles.statsIconContainer}>
                <Feather name="alert-circle" size={20} color="#fff" />
              </View>
              <Text style={styles.statsNumber}>{stats.urgentRequests}</Text>
              <Text style={styles.statsLabel}>Urgent Requests</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate("ManageBloodRequests")}
            >
              <View style={styles.quickActionIcon}>
                <Feather name="plus-circle" size={24} color="#4a89dc" />
              </View>
              <Text style={styles.quickActionText}>New Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate("VerifyDonations")}
            >
              <View style={styles.quickActionIcon}>
                <Feather name="check-circle" size={24} color="#4a89dc" />
              </View>
              <Text style={styles.quickActionText}>Verify Donation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate("DonorList")}
            >
              <View style={styles.quickActionIcon}>
                <Feather name="search" size={24} color="#4a89dc" />
              </View>
              <Text style={styles.quickActionText}>Find Donor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Blood Requests */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Blood Requests</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ManageBloodRequests")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentRequests.map((request) => (
            <TouchableOpacity
              key={request.id}
              style={styles.requestCard}
              onPress={() => navigation.navigate("ManageBloodRequests")}
            >
              <View style={styles.requestInfo}>
                <Text style={styles.requestName}>{request.name}</Text>
                <Text style={styles.requestTime}>{request.time}</Text>
              </View>

              <View style={styles.requestDetails}>
                <View style={styles.bloodTypeContainer}>
                  <Text style={styles.bloodTypeText}>{request.bloodType}</Text>
                </View>

                <View
                  style={[
                    styles.urgencyContainer,
                    request.urgency === "High"
                      ? styles.highUrgency
                      : request.urgency === "Medium"
                      ? styles.mediumUrgency
                      : styles.lowUrgency,
                  ]}
                >
                  <Text style={styles.urgencyText}>{request.urgency}</Text>
                </View>
              </View>

              <Feather name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AppointmentsManagement")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentCard}
              onPress={() => navigation.navigate("AppointmentsManagement")}
            >
              <View style={styles.appointmentTimeContainer}>
                <Text style={styles.appointmentTime}>{appointment.time}</Text>
                <Text style={styles.appointmentDate}>{appointment.date}</Text>
              </View>

              <View style={styles.appointmentDivider} />

              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentName}>{appointment.name}</Text>
                <View style={styles.bloodTypeSmallContainer}>
                  <Text style={styles.bloodTypeSmallText}>
                    {appointment.bloodType}
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentActions}>
                <TouchableOpacity style={styles.appointmentActionButton}>
                  <Feather name="phone" size={16} color="#4a89dc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.appointmentActionButton}>
                  <Feather name="message-circle" size={16} color="#4a89dc" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  statsContainer: {
    padding: 15,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statsCard: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  statsLabel: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  quickActionsContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  quickActionButton: {
    alignItems: "center",
    width: "30%",
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f5ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  sectionContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#4a89dc",
  },
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  requestTime: {
    fontSize: 12,
    color: "#999",
  },
  requestDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  bloodTypeContainer: {
    backgroundColor: "#f0f5ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  bloodTypeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4a89dc",
  },
  urgencyContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  highUrgency: {
    backgroundColor: "#ffebee",
  },
  mediumUrgency: {
    backgroundColor: "#fff8e1",
  },
  lowUrgency: {
    backgroundColor: "#e8f5e9",
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  appointmentTimeContainer: {
    width: 70,
    alignItems: "center",
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentDate: {
    fontSize: 12,
    color: "#999",
  },
  appointmentDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#eee",
    marginHorizontal: 15,
  },
  appointmentInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  appointmentName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  bloodTypeSmallContainer: {
    backgroundColor: "#f0f5ff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bloodTypeSmallText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4a89dc",
  },
  appointmentActions: {
    flexDirection: "row",
  },
  appointmentActionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f5ff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});

export default HealthWorkerDashboard;
