"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const AppointmentsManagement = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("2023-05-15");
  const [activeTab, setActiveTab] = useState("upcoming");

  // Sample dates for the date picker
  const dates = [
    { date: "2023-05-14", day: "Sun", formatted: "14" },
    { date: "2023-05-15", day: "Mon", formatted: "15" },
    { date: "2023-05-16", day: "Tue", formatted: "16" },
    { date: "2023-05-17", day: "Wed", formatted: "17" },
    { date: "2023-05-18", day: "Thu", formatted: "18" },
    { date: "2023-05-19", day: "Fri", formatted: "19" },
    { date: "2023-05-20", day: "Sat", formatted: "20" },
  ];

  // Sample appointments data - in a real app, this would come from an API
  const appointments = [
    {
      id: "1",
      donorName: "Jake Paul",
      donorId: "D12345",
      bloodType: "A+",
      time: "09:00 AM",
      date: "2023-05-15",
      status: "confirmed",
      contactNumber: "+1 234-567-8901",
      notes: "First-time donor, needs guidance",
    },
    {
      id: "2",
      donorName: "Steve Smith",
      donorId: "D12346",
      bloodType: "O-",
      time: "10:30 AM",
      date: "2023-05-15",
      status: "confirmed",
      contactNumber: "+1 234-567-8902",
      notes: "Regular donor, prefers right arm for donation",
    },
    {
      id: "3",
      donorName: "Mike Johnson",
      donorId: "D12347",
      bloodType: "B+",
      time: "01:00 PM",
      date: "2023-05-15",
      status: "pending",
      contactNumber: "+1 234-567-8903",
      notes: "Has low iron levels sometimes, check before donation",
    },
    {
      id: "4",
      donorName: "Emma Wilson",
      donorId: "D12348",
      bloodType: "AB+",
      time: "03:30 PM",
      date: "2023-05-15",
      status: "cancelled",
      contactNumber: "+1 234-567-8904",
      notes: "Cancelled due to illness",
    },
    {
      id: "5",
      donorName: "Robert Brown",
      donorId: "D12349",
      bloodType: "O+",
      time: "04:45 PM",
      date: "2023-05-15",
      status: "completed",
      contactNumber: "+1 234-567-8905",
      notes: "Donated 1 unit successfully",
    },
    {
      id: "6",
      donorName: "Jennifer Lee",
      donorId: "D12350",
      bloodType: "A-",
      time: "11:15 AM",
      date: "2023-05-16",
      status: "confirmed",
      contactNumber: "+1 234-567-8906",
      notes: "Prefers afternoon appointments usually",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.donorId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = appointment.date === selectedDate;

    const matchesTab =
      (activeTab === "upcoming" &&
        ["confirmed", "pending"].includes(appointment.status)) ||
      (activeTab === "completed" && appointment.status === "completed") ||
      (activeTab === "cancelled" && appointment.status === "cancelled") ||
      activeTab === "all";

    return matchesSearch && matchesDate && matchesTab;
  });

  const renderAppointmentItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.timeContainer}>
          <Text style={styles.appointmentTime}>{item.time}</Text>
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

      <View style={styles.appointmentContent}>
        <View style={styles.donorInfo}>
          <Text style={styles.donorName}>{item.donorName}</Text>
          <View style={styles.donorDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>ID:</Text>
              <Text style={styles.detailText}>{item.donorId}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Blood Type:</Text>
              <View style={styles.bloodTypeContainer}>
                <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.appointmentActions}>
          {(item.status === "confirmed" || item.status === "pending") && (
            <>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="check-circle" size={20} color="#5cb85c" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Feather name="x-circle" size={20} color="#d9534f" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Feather name="edit-2" size={20} color="#4a89dc" />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="more-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}

      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.contactButton}>
          <Feather name="phone" size={16} color="#4a89dc" />
          <Text style={styles.contactButtonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactButton}>
          <Feather name="message-square" size={16} color="#4a89dc" />
          <Text style={styles.contactButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity>
          <Feather name="plus" size={24} color="#4a89dc" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.datePickerContainer}>
        <FlatList
          horizontal
          data={dates}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateItem,
                selectedDate === item.date && styles.selectedDateItem,
              ]}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text
                style={[
                  styles.dateDay,
                  selectedDate === item.date && styles.selectedDateText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateNumber,
                  selectedDate === item.date && styles.selectedDateText,
                ]}
              >
                {item.formatted}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datePickerContent}
        />
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
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "completed" && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("cancelled")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "cancelled" && styles.activeTabText,
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "all" && styles.activeTabText,
            ]}
          >
            All
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
            <Text style={styles.emptyText}>No appointments found</Text>
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  datePickerContainer: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  datePickerContent: {
    paddingHorizontal: 15,
  },
  dateItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
  },
  selectedDateItem: {
    backgroundColor: "#4a89dc",
  },
  dateDay: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDateText: {
    color: "#fff",
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
    borderBottomColor: "#4a89dc",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#4a89dc",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  timeContainer: {
    backgroundColor: "#f0f5ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a89dc",
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
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
    fontSize: 12,
    fontWeight: "bold",
  },
  appointmentContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  donorInfo: {
    flex: 1,
  },
  donorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  donorDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: "#999",
    marginRight: 5,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
  },
  bloodTypeContainer: {
    backgroundColor: "#f0f5ff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bloodTypeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4a89dc",
  },
  appointmentActions: {
    flexDirection: "row",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
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
  contactContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  contactButtonText: {
    fontSize: 14,
    color: "#4a89dc",
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
  },
});

export default AppointmentsManagement;
