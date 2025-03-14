"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const DonorAppointments = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Sample data - in a real app, this would come from an API
  const appointments = [
    {
      id: "1",
      date: "2023-05-20",
      time: "10:00 AM",
      hospital: "City General Hospital",
      address: "123 Medical Center Blvd, Cityville",
      status: "confirmed",
      notes: "Please bring your ID and be well hydrated.",
    },
    {
      id: "2",
      date: "2023-06-15",
      time: "02:30 PM",
      hospital: "Memorial Hospital",
      address: "456 Healthcare Ave, Townsville",
      status: "pending",
      notes: "Awaiting confirmation from the hospital.",
    },
    {
      id: "3",
      date: "2023-03-15",
      time: "09:15 AM",
      hospital: "Memorial Hospital",
      address: "456 Healthcare Ave, Townsville",
      status: "completed",
      notes: "Successful donation, thank you!",
    },
    {
      id: "4",
      date: "2023-01-10",
      time: "11:30 AM",
      hospital: "City General Hospital",
      address: "123 Medical Center Blvd, Cityville",
      status: "completed",
      notes: "Successful donation, thank you!",
    },
    {
      id: "5",
      date: "2022-12-05",
      time: "03:00 PM",
      hospital: "Red Cross Blood Drive",
      address: "Community Center, 789 Main St, Villagetown",
      status: "cancelled",
      notes: "Cancelled due to illness.",
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

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "upcoming") {
      return ["confirmed", "pending"].includes(appointment.status);
    } else if (activeTab === "past") {
      return ["completed", "cancelled"].includes(appointment.status);
    }
    return true;
  });

  const handleReschedule = (appointmentId: string) => {
    // In a real app, this would open a date picker and update the appointment
    Alert.alert(
      "Reschedule Appointment",
      "Would you like to reschedule this appointment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reschedule",
          onPress: () => console.log("Reschedule appointment:", appointmentId),
        },
      ]
    );
  };

  const handleCancel = (appointmentId: string) => {
    // In a real app, this would update the appointment status to cancelled
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          onPress: () => console.log("Cancel appointment:", appointmentId),
          style: "destructive",
        },
      ]
    );
  };

  const renderAppointmentItem = ({ item }: { item: any }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateDay}>{new Date(item.date).getDate()}</Text>
          <Text style={styles.dateMonth}>
            {new Date(item.date).toLocaleString("default", { month: "short" })}
          </Text>
          <Text style={styles.dateYear}>
            {new Date(item.date).getFullYear()}
          </Text>
        </View>

        <View style={styles.appointmentInfo}>
          <Text style={styles.appointmentTime}>{item.time}</Text>
          <Text style={styles.appointmentLocation}>{item.hospital}</Text>
          <Text style={styles.appointmentAddress}>{item.address}</Text>
        </View>

        <View
          style={[
            styles.statusContainer,
            item.status === "confirmed"
              ? styles.confirmedStatus
              : item.status === "pending"
              ? styles.pendingStatus
              : item.status === "completed"
              ? styles.completedStatus
              : styles.cancelledStatus,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      {(item.status === "confirmed" || item.status === "pending") && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.rescheduleButton}
            onPress={() => handleReschedule(item.id)}
          >
            <Feather name="calendar" size={16} color="#e60000" />
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(item.id)}
          >
            <Feather name="x" size={16} color="#666" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <TouchableOpacity
          onPress={() => {
            // In a real app, this would navigate to a screen to schedule a new appointment
            console.log("Schedule new appointment");
          }}
        >
          <Feather name="plus" size={24} color="#e60000" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredAppointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.appointmentsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="calendar" size={50} color="#ccc" />
            <Text style={styles.emptyText}>
              {activeTab === "upcoming"
                ? "No upcoming appointments"
                : "No past appointments"}
            </Text>
            {activeTab === "upcoming" && (
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={() => {
                  // In a real app, this would navigate to a screen to schedule a new appointment
                  console.log("Schedule new appointment");
                }}
              >
                <Text style={styles.scheduleButtonText}>Schedule Donation</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
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
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#e60000",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#e60000",
    fontWeight: "bold",
  },
  appointmentsList: {
    padding: 15,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  dateContainer: {
    width: 50,
    alignItems: "center",
    marginRight: 15,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e60000",
  },
  dateMonth: {
    fontSize: 12,
    color: "#666",
  },
  dateYear: {
    fontSize: 12,
    color: "#999",
  },
  appointmentInfo: {
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
    marginBottom: 3,
  },
  appointmentAddress: {
    fontSize: 12,
    color: "#999",
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    height: 24,
    justifyContent: "center",
  },
  confirmedStatus: {
    backgroundColor: "#e8f5e9",
  },
  pendingStatus: {
    backgroundColor: "#fff8e1",
  },
  completedStatus: {
    backgroundColor: "#e3f2fd",
  },
  cancelledStatus: {
    backgroundColor: "#ffebee",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  notesContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },
  notesText: {
    fontSize: 12,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rescheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffebee",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
  },
  rescheduleButtonText: {
    color: "#e60000",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
    marginBottom: 20,
  },
  scheduleButton: {
    backgroundColor: "#e60000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  scheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default DonorAppointments;
