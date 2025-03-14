"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const ManageBloodRequests = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  // Sample data - in a real app, this would come from an API
  const requests = [
    {
      id: "1",
      patientName: "Jake Paul",
      bloodType: "A+",
      units: 2,
      hospital: "City General Hospital",
      urgency: "High",
      date: "2023-05-15",
      status: "pending",
      requestedBy: "Dr. Smith",
      contactNumber: "+1 234-567-8901",
      notes: "Patient scheduled for surgery tomorrow morning",
    },
    {
      id: "2",
      patientName: "Steve Smith",
      bloodType: "O-",
      units: 1,
      hospital: "Memorial Hospital",
      urgency: "Medium",
      date: "2023-05-14",
      status: "pending",
      requestedBy: "Dr. Johnson",
      contactNumber: "+1 234-567-8902",
      notes: "Accident victim, needs transfusion",
    },
    {
      id: "3",
      patientName: "Mike Johnson",
      bloodType: "B+",
      units: 3,
      hospital: "St. Mary Medical Center",
      urgency: "Low",
      date: "2023-05-13",
      status: "approved",
      requestedBy: "Dr. Williams",
      contactNumber: "+1 234-567-8903",
      notes: "Regular transfusion patient",
    },
    {
      id: "4",
      patientName: "Emma Wilson",
      bloodType: "AB+",
      units: 2,
      hospital: "City General Hospital",
      urgency: "High",
      date: "2023-05-12",
      status: "rejected",
      requestedBy: "Dr. Brown",
      contactNumber: "+1 234-567-8904",
      notes: "Emergency surgery required",
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || request.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const renderRequestItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <View style={styles.bloodTypeContainer}>
            <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusContainer,
            item.status === "pending"
              ? styles.pendingStatus
              : item.status === "approved"
              ? styles.approvedStatus
              : styles.rejectedStatus,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <Feather name="home" size={14} color="#666" />
          <Text style={styles.detailText}>{item.hospital}</Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="calendar" size={14} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="droplet" size={14} color="#666" />
          <Text style={styles.detailText}>{item.units} units needed</Text>
        </View>

        <View style={styles.detailRow}>
          <Feather name="user" size={14} color="#666" />
          <Text style={styles.detailText}>
            Requested by: {item.requestedBy}
          </Text>
        </View>
      </View>

      <View style={styles.requestNotes}>
        <Text style={styles.notesLabel}>Notes:</Text>
        <Text style={styles.notesText}>{item.notes}</Text>
      </View>

      {item.status === "pending" && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.approveButton}>
            <Feather name="check" size={16} color="#fff" />
            <Text style={styles.actionButtonText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rejectButton}>
            <Feather name="x" size={16} color="#fff" />
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Full Details</Text>
        <Feather name="chevron-right" size={16} color="#4a89dc" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Blood Requests</Text>
        <TouchableOpacity>
          <Feather name="plus" size={24} color="#4a89dc" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, blood type, hospital..."
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

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

          <TouchableOpacity
            style={[styles.tab, activeTab === "pending" && styles.activeTab]}
            onPress={() => setActiveTab("pending")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "pending" && styles.activeTabText,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "approved" && styles.activeTab]}
            onPress={() => setActiveTab("approved")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "approved" && styles.activeTabText,
              ]}
            >
              Approved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "rejected" && styles.activeTab]}
            onPress={() => setActiveTab("rejected")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "rejected" && styles.activeTabText,
              ]}
            >
              Rejected
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.requestsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No blood requests found</Text>
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
  tabsContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeTab: {
    backgroundColor: "#4a89dc",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  requestsList: {
    padding: 15,
  },
  requestCard: {
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
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  bloodTypeContainer: {
    backgroundColor: "#f0f5ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bloodTypeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4a89dc",
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  pendingStatus: {
    backgroundColor: "#fff8e1",
  },
  approvedStatus: {
    backgroundColor: "#e8f5e9",
  },
  rejectedStatus: {
    backgroundColor: "#ffebee",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  requestDetails: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  requestNotes: {
    marginBottom: 15,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  notesText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  approveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5cb85c",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
  },
  rejectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d9534f",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  viewDetailsText: {
    color: "#4a89dc",
    fontWeight: "bold",
    marginRight: 5,
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

export default ManageBloodRequests;
