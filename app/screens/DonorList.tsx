"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const DonorList = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample data - in a real app, this would come from an API
  const donors = [
    {
      id: "1",
      name: "Jake Paul",
      bloodType: "A+",
      age: 28,
      gender: "Male",
      lastDonation: "2023-05-01",
      contactNumber: "+1 234-567-8901",
      address: "123 Main St, Anytown, USA",
      donationCount: 5,
      status: "active",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Steve Smith",
      bloodType: "O-",
      age: 35,
      gender: "Female",
      lastDonation: "2023-04-15",
      contactNumber: "+1 234-567-8902",
      address: "456 Oak Ave, Somewhere, USA",
      donationCount: 8,
      status: "active",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Mike Johnson",
      bloodType: "B+",
      age: 42,
      gender: "Male",
      lastDonation: "2023-03-20",
      contactNumber: "+1 234-567-8903",
      address: "789 Pine St, Nowhere, USA",
      donationCount: 3,
      status: "inactive",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      name: "Emma Wilson",
      bloodType: "AB+",
      age: 30,
      gender: "Female",
      lastDonation: "2023-02-10",
      contactNumber: "+1 234-567-8904",
      address: "101 Elm St, Elsewhere, USA",
      donationCount: 12,
      status: "active",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "5",
      name: "Robert Brown",
      bloodType: "O+",
      age: 25,
      gender: "Male",
      lastDonation: "2023-01-05",
      contactNumber: "+1 234-567-8905",
      address: "202 Cedar St, Anywhere, USA",
      donationCount: 2,
      status: "active",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  const bloodTypeFilters = [
    "all",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.contactNumber.includes(searchQuery) ||
      donor.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || donor.bloodType === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const renderDonorItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.donorCard}>
      <Image source={{ uri: item.image }} style={styles.donorImage} />

      <View style={styles.donorInfo}>
        <View style={styles.donorHeader}>
          <Text style={styles.donorName}>{item.name}</Text>
          <View style={styles.bloodTypeContainer}>
            <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
          </View>
        </View>

        <View style={styles.donorDetails}>
          <View style={styles.detailRow}>
            <Feather name="phone" size={14} color="#666" />
            <Text style={styles.detailText}>{item.contactNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <Feather name="calendar" size={14} color="#666" />
            <Text style={styles.detailText}>
              Last donation: {item.lastDonation}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Feather name="droplet" size={14} color="#666" />
            <Text style={styles.detailText}>
              {item.donationCount} donations
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.donorActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="phone" size={20} color="#4a89dc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-square" size={20} color="#4a89dc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Feather name="more-vertical" size={20} color="#4a89dc" />
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
        <Text style={styles.headerTitle}>Donor List</Text>
        <TouchableOpacity>
          <Feather name="plus" size={24} color="#4a89dc" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, phone, address..."
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

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={bloodTypeFilters}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === item && styles.activeFilterButton,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.activeFilterText,
                ]}
              >
                {item === "all" ? "All Blood Types" : item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        />
      </View>

      <FlatList
        data={filteredDonors}
        renderItem={renderDonorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.donorsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="users" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No donors found</Text>
          </View>
        }
      />

      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{donors.length}</Text>
          <Text style={styles.statLabel}>Total Donors</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {donors.filter((donor) => donor.status === "active").length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {donors.reduce((total, donor) => total + donor.donationCount, 0)}
          </Text>
          <Text style={styles.statLabel}>Donations</Text>
        </View>
      </View>
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
  filtersContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filtersContent: {
    paddingHorizontal: 15,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeFilterButton: {
    backgroundColor: "#4a89dc",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  donorsList: {
    padding: 15,
    paddingBottom: 80, // Add padding for the stats bar
  },
  donorCard: {
    flexDirection: "row",
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
  donorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  donorInfo: {
    flex: 1,
  },
  donorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  donorName: {
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
  donorDetails: {},
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
  donorActions: {
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f5ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
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
  statsBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a89dc",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#eee",
  },
});

export default DonorList;
