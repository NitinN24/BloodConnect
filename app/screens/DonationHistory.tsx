"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const DonationHistory = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample data - in a real app, this would come from an API
  const donations = [
    {
      id: "1",
      date: "2023-03-15",
      hospital: "Memorial Hospital",
      address: "123 Medical Center Blvd, Cityville",
      units: 1,
      status: "completed",
      certificate: true,
      bloodPressure: "120/80",
      hemoglobin: "14.5",
      notes: "Successful donation, no complications.",
    },
    {
      id: "2",
      date: "2022-12-10",
      hospital: "City General Hospital",
      address: "456 Healthcare Ave, Townsville",
      units: 1,
      status: "completed",
      certificate: true,
      bloodPressure: "118/78",
      hemoglobin: "14.2",
      notes: "Donor was well hydrated, quick recovery.",
    },
    {
      id: "3",
      date: "2022-09-05",
      hospital: "Red Cross Blood Drive",
      address: "Community Center, 789 Main St, Villagetown",
      units: 1,
      status: "completed",
      certificate: false,
      bloodPressure: "122/82",
      hemoglobin: "13.8",
      notes:
        "Slight dizziness after donation, recovered after rest and fluids.",
    },
    {
      id: "4",
      date: "2022-06-20",
      hospital: "Memorial Hospital",
      address: "123 Medical Center Blvd, Cityville",
      units: 1,
      status: "completed",
      certificate: true,
      bloodPressure: "124/84",
      hemoglobin: "14.0",
      notes: "Successful donation, no complications.",
    },
    {
      id: "5",
      date: "2022-03-12",
      hospital: "City General Hospital",
      address: "456 Healthcare Ave, Townsville",
      units: 1,
      status: "completed",
      certificate: true,
      bloodPressure: "120/80",
      hemoglobin: "14.3",
      notes: "Successful donation, no complications.",
    },
  ];

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate total donations and impact
  const totalDonations = donations.length;
  const totalUnits = donations.reduce(
    (sum, donation) => sum + donation.units,
    0
  );
  const livesImpacted = totalUnits * 3; // Assuming each unit can help up to 3 people

  const filteredDonations = donations.filter((donation) => {
    if (activeTab === "all") return true;
    if (activeTab === "certificates") return donation.certificate;
    return true;
  });

  const renderDonationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.donationCard}
      onPress={() => {
        // In a real app, this would navigate to a detailed view of the donation
        console.log("View donation details:", item.id);
      }}
    >
      <View style={styles.donationHeader}>
        <View style={styles.donationDate}>
          <Text style={styles.donationDay}>
            {new Date(item.date).getDate()}
          </Text>
          <Text style={styles.donationMonth}>
            {new Date(item.date).toLocaleString("default", { month: "short" })}
          </Text>
          <Text style={styles.donationYear}>
            {new Date(item.date).getFullYear()}
          </Text>
        </View>

        <View style={styles.donationInfo}>
          <Text style={styles.donationHospital}>{item.hospital}</Text>
          <Text style={styles.donationAddress}>{item.address}</Text>
          <View style={styles.donationDetails}>
            <View style={styles.donationDetail}>
              <Feather name="droplet" size={14} color="#e60000" />
              <Text style={styles.donationDetailText}>{item.units} unit</Text>
            </View>

            {item.certificate && (
              <View style={styles.donationDetail}>
                <Feather name="award" size={14} color="#e60000" />
                <Text style={styles.donationDetailText}>Certificate</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.donationActions}>
        {item.certificate && (
          <TouchableOpacity style={styles.certificateButton}>
            <Feather name="download" size={16} color="#e60000" />
            <Text style={styles.certificateButtonText}>Certificate</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Feather name="chevron-right" size={16} color="#e60000" />
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
        <Text style={styles.headerTitle}>Donation History</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalDonations}</Text>
            <Text style={styles.statLabel}>Total Donations</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalUnits}</Text>
            <Text style={styles.statLabel}>Units Donated</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{livesImpacted}</Text>
            <Text style={styles.statLabel}>Lives Impacted</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
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
            All Donations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "certificates" && styles.activeTab]}
          onPress={() => setActiveTab("certificates")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "certificates" && styles.activeTabText,
            ]}
          >
            Certificates
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredDonations}
        renderItem={renderDonationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.donationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="heart" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No donations found</Text>
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
  statsCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e60000",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#eee",
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
  donationsList: {
    padding: 15,
  },
  donationCard: {
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
  donationHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  donationDate: {
    width: 50,
    alignItems: "center",
    marginRight: 15,
  },
  donationDay: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e60000",
  },
  donationMonth: {
    fontSize: 12,
    color: "#666",
  },
  donationYear: {
    fontSize: 12,
    color: "#999",
  },
  donationInfo: {
    flex: 1,
  },
  donationHospital: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  donationAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  donationDetails: {
    flexDirection: "row",
  },
  donationDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  donationDetailText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  donationActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  certificateButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  certificateButtonText: {
    fontSize: 14,
    color: "#e60000",
    marginLeft: 5,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButtonText: {
    fontSize: 14,
    color: "#e60000",
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

export default DonationHistory;
