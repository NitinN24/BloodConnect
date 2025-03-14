import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const DashboardDonor = ({ navigation }: any) => {
  // Sample data - in a real app, this would come from an API
  const donorStats = {
    totalDonations: 5,
    livesImpacted: 15,
    nextAppointment: "2023-05-20",
    lastDonation: "2023-03-15",
    bloodType: "O+",
  };

  const urgentRequests = [
    {
      id: "1",
      patientName: "John Stark",
      bloodType: "A+",
      hospital: "City General Hospital",
      distance: "2.5 km",
      postedTime: "3 hours ago",
    },
    {
      id: "2",
      patientName: "Steve Smith",
      bloodType: "O-",
      hospital: "Memorial Hospital",
      distance: "5 km",
      postedTime: "5 hours ago",
    },
  ];

  const upcomingAppointments = [
    {
      id: "1",
      date: "2023-05-20",
      time: "10:00 AM",
      hospital: "City General Hospital",
      status: "confirmed",
    },
  ];

  const recentDonations = [
    {
      id: "1",
      date: "2023-03-15",
      hospital: "Memorial Hospital",
      units: 1,
      status: "completed",
    },
    {
      id: "2",
      date: "2022-12-10",
      hospital: "City General Hospital",
      units: 1,
      status: "completed",
    },
  ];

  // Format date for display
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate days until next donation
  const calculateDaysUntil = (dateString: string | number | Date) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilNextAppointment = calculateDaysUntil(
    donorStats.nextAppointment
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>Robert</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("DonorProfile")}
        >
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Donor Stats Card */}
        <View style={styles.donorStatsCard}>
          <View style={styles.bloodTypeContainer}>
            <Text style={styles.bloodTypeText}>{donorStats.bloodType}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{donorStats.totalDonations}</Text>
              <Text style={styles.statLabel}>Donations</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{donorStats.livesImpacted}</Text>
              <Text style={styles.statLabel}>Lives Impacted</Text>
            </View>
          </View>

          <View style={styles.nextDonationContainer}>
            {daysUntilNextAppointment > 0 ? (
              <>
                <Text style={styles.nextDonationLabel}>
                  Your next donation is in
                </Text>
                <Text style={styles.nextDonationDays}>
                  {daysUntilNextAppointment} days
                </Text>
                <Text style={styles.nextDonationDate}>
                  {formatDate(donorStats.nextAppointment)}
                </Text>
              </>
            ) : (
              <Text style={styles.nextDonationLabel}>
                No upcoming donations scheduled
              </Text>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate("FindBloodRequests")}
            >
              <View style={styles.quickActionIcon}>
                <Feather name="search" size={24} color="#e60000" />
              </View>
              <Text style={styles.quickActionText}>Find Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate("RequestBlood")}
            >
              <View style={styles.quickActionIcon}>
                <Feather name="droplet" size={24} color="#e60000" />
              </View>
              <Text style={styles.quickActionText}>Request Blood</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate("DonorAppointments")}
            >
              <View style={styles.quickActionIcon}>
                <Feather name="calendar" size={24} color="#e60000" />
              </View>
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Urgent Blood Requests */}
        {urgentRequests.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Urgent Blood Requests</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("FindBloodRequests")}
              >
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {urgentRequests.map((request) => (
              <TouchableOpacity
                key={request.id}
                style={styles.requestCard}
                onPress={() => navigation.navigate("FindBloodRequests")}
              >
                <View style={styles.requestCardHeader}>
                  <View style={styles.bloodTypeSmallContainer}>
                    <Text style={styles.bloodTypeSmallText}>
                      {request.bloodType}
                    </Text>
                  </View>
                  <Text style={styles.requestTime}>{request.postedTime}</Text>
                </View>

                <Text style={styles.requestName}>{request.patientName}</Text>

                <View style={styles.requestDetails}>
                  <View style={styles.requestDetailItem}>
                    <Feather name="map-pin" size={14} color="#666" />
                    <Text style={styles.requestDetailText}>
                      {request.hospital}
                    </Text>
                  </View>

                  <View style={styles.requestDetailItem}>
                    <Feather name="navigation" size={14} color="#666" />
                    <Text style={styles.requestDetailText}>
                      {request.distance}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.respondButton}>
                  <Text style={styles.respondButtonText}>Respond</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("DonorAppointments")}
              >
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {upcomingAppointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
                onPress={() => navigation.navigate("DonorAppointments")}
              >
                <View style={styles.appointmentDateContainer}>
                  <Text style={styles.appointmentDay}>
                    {new Date(appointment.date).getDate()}
                  </Text>
                  <Text style={styles.appointmentMonth}>
                    {new Date(appointment.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </Text>
                </View>

                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentTime}>{appointment.time}</Text>
                  <Text style={styles.appointmentLocation}>
                    {appointment.hospital}
                  </Text>
                  <View style={styles.appointmentStatusContainer}>
                    <View style={styles.appointmentStatusDot} />
                    <Text style={styles.appointmentStatusText}>Confirmed</Text>
                  </View>
                </View>

                <View style={styles.appointmentActions}>
                  <TouchableOpacity style={styles.appointmentActionButton}>
                    <Feather name="calendar" size={16} color="#e60000" />
                    <Text style={styles.appointmentActionText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Recent Donations */}
        {recentDonations.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Donations</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("DonationHistory")}
              >
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {recentDonations.map((donation) => (
              <TouchableOpacity
                key={donation.id}
                style={styles.donationCard}
                onPress={() => navigation.navigate("DonationHistory")}
              >
                <View style={styles.donationIconContainer}>
                  <Feather name="heart" size={20} color="#fff" />
                </View>

                <View style={styles.donationDetails}>
                  <Text style={styles.donationDate}>
                    {formatDate(donation.date)}
                  </Text>
                  <Text style={styles.donationLocation}>
                    {donation.hospital}
                  </Text>
                  <Text style={styles.donationUnits}>
                    {donation.units} unit donated
                  </Text>
                </View>

                <View style={styles.donationStatus}>
                  <Feather name="check-circle" size={20} color="#5cb85c" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Eligibility Reminder */}
        <View style={styles.eligibilityContainer}>
          <View style={styles.eligibilityIcon}>
            <Feather name="info" size={24} color="#e60000" />
          </View>
          <View style={styles.eligibilityContent}>
            <Text style={styles.eligibilityTitle}>Donation Eligibility</Text>
            <Text style={styles.eligibilityText}>
              You are eligible to donate blood again after{" "}
              {formatDate(donorStats.nextAppointment)}. Remember to stay
              hydrated and get enough rest before your donation.
            </Text>
          </View>
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
  donorStatsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bloodTypeContainer: {
    backgroundColor: "#ffebee",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  bloodTypeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e60000",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#eee",
  },
  nextDonationContainer: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
  },
  nextDonationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  nextDonationDays: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e60000",
    marginBottom: 5,
  },
  nextDonationDate: {
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#ffebee",
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
    color: "#e60000",
  },
  requestCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  requestCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  bloodTypeSmallContainer: {
    backgroundColor: "#ffebee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  bloodTypeSmallText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#e60000",
  },
  requestTime: {
    fontSize: 12,
    color: "#999",
  },
  requestName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  requestDetails: {
    flexDirection: "row",
    marginBottom: 15,
  },
  requestDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  requestDetailText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  respondButton: {
    backgroundColor: "#e60000",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
  },
  respondButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
  },
  appointmentDateContainer: {
    width: 50,
    height: 60,
    backgroundColor: "#e60000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  appointmentDay: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  appointmentMonth: {
    fontSize: 12,
    color: "#fff",
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  appointmentLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  appointmentStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appointmentStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5cb85c",
    marginRight: 5,
  },
  appointmentStatusText: {
    fontSize: 12,
    color: "#5cb85c",
  },
  appointmentActions: {
    marginLeft: 10,
  },
  appointmentActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  appointmentActionText: {
    fontSize: 12,
    color: "#e60000",
    marginLeft: 5,
  },
  donationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  donationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e60000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  donationDetails: {
    flex: 1,
  },
  donationDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  donationLocation: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },
  donationUnits: {
    fontSize: 12,
    color: "#999",
  },
  donationStatus: {
    marginLeft: 10,
  },
  eligibilityContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#e60000",
  },
  eligibilityIcon: {
    marginRight: 15,
  },
  eligibilityContent: {
    flex: 1,
  },
  eligibilityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  eligibilityText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default DashboardDonor;
