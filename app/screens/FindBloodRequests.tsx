import React, { useState } from "react";
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

const FindBloodRequests = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeDistance, setActiveDistance] = useState("all");

  // Sample data - in a real app, this would come from an API
  const bloodRequests = [
    {
      id: "1",
      patientName: "John Stark",
      bloodType: "A+",
      hospital: "City General Hospital",
      distance: "2.5 km",
      urgency: "High",
      postedTime: "3 hours ago",
      units: 2,
      reason: "Surgery",
      contact: "+1 234-567-8901",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      patientName: "Steve Smith",
      bloodType: "O-",
      hospital: "Memorial Hospital",
      distance: "5 km",
      urgency: "Medium",
      postedTime: "5 hours ago",
      units: 1,
      reason: "Accident",
      contact: "+1 234-567-8902",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      patientName: "Mike Johnson",
      bloodType: "B+",
      hospital: "St. Mary Medical Center",
      distance: "8 km",
      urgency: "Low",
      postedTime: "1 day ago",
      units: 3,
      reason: "Chronic condition",
      contact: "+1 234-567-8903",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      patientName: "Emma Wilson",
      bloodType: "AB+",
      hospital: "City General Hospital",
      distance: "3 km",
      urgency: "High",
      postedTime: "2 days ago",
      units: 2,
      reason: "Emergency surgery",
      contact: "+1 234-567-8904",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "5",
      patientName: "Robert Brown",
      bloodType: "O+",
      hospital: "Memorial Hospital",
      distance: "12 km",
      urgency: "Medium",
      postedTime: "3 days ago",
      units: 1,
      reason: "Anemia treatment",
      contact: "+1 234-567-8905",
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
  const distanceFilters = ["all", "0-5 km", "5-10 km", "10+ km"];

  const filteredRequests = bloodRequests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBloodType =
      activeFilter === "all" || request.bloodType === activeFilter;

    const matchesDistance =
      activeDistance === "all" ||
      (activeDistance === "0-5 km" && parseFloat(request.distance) <= 5) ||
      (activeDistance === "5-10 km" &&
        parseFloat(request.distance) > 5 &&
        parseFloat(request.distance) <= 10) ||
      (activeDistance === "10+ km" && parseFloat(request.distance) > 10);

    return matchesSearch && matchesBloodType && matchesDistance;
  });

  const renderRequestItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.requestCard}
      onPress={() => {
        // In a real app, this would navigate to a detailed view of the request
        console.log("View request details:", item.id);
      }}
    >
      <View style={styles.requestHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.image }} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{item.patientName}</Text>
            <Text style={styles.postedTime}>{item.postedTime}</Text>
          </View>
        </View>
        <View
          style={[
            styles.urgencyContainer,
            item.urgency === "High"
              ? styles.highUrgency
              : item.urgency === "Medium"
              ? styles.mediumUrgency
              : styles.lowUrgency,
          ]}
        >
          <Text style={styles.urgencyText}>{item.urgency}</Text>
        </View>
      </View>

      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="droplet" size={16} color="#e60000" />
            <Text style={styles.detailText}>{item.bloodType}</Text>
          </View>

          <View style={styles.detailItem}>
            <Feather name="package" size={16} color="#666" />
            <Text style={styles.detailText}>{item.units} units</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="map-pin" size={16} color="#666" />
            <Text style={styles.detailText}>{item.hospital}</Text>
          </View>

          <View style={styles.detailItem}>
            <Feather name="navigation" size={16} color="#666" />
            <Text style={styles.detailText}>{item.distance}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Feather name="info" size={16} color="#666" />
            <Text style={styles.detailText}>Reason: {item.reason}</Text>
          </View>
        </View>
      </View>

      <View style={styles.requestActions}>
        <TouchableOpacity style={styles.respondButton}>
          <Text style={styles.respondButtonText}>Respond</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactButton}>
          <Feather name="phone" size={16} color="#e60000" />
          <Text style={styles.contactButtonText}>Contact</Text>
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
        <Text style={styles.headerTitle}>Find Blood Requests</Text>
        <TouchableOpacity>
          <Feather name="sliders" size={24} color="#e60000" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, hospital..."
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
        <Text style={styles.filterLabel}>Blood Type:</Text>
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
                {item === "all" ? "All Types" : item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        />
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filterLabel}>Distance:</Text>
        <FlatList
          horizontal
          data={distanceFilters}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeDistance === item && styles.activeFilterButton,
              ]}
              onPress={() => setActiveDistance(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeDistance === item && styles.activeFilterText,
                ]}
              >
                {item === "all" ? "Any Distance" : item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        />
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.requestsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={50} color="#ccc" />
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
  filtersContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  filtersContent: {
    paddingRight: 20,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeFilterButton: {
    backgroundColor: "#e60000",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
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
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postedTime: {
    fontSize: 12,
    color: "#999",
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
  requestDetails: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  requestActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  respondButton: {
    flex: 1,
    backgroundColor: "#e60000",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 10,
  },
  respondButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffebee",
    borderRadius: 8,
    paddingVertical: 10,
  },
  contactButtonText: {
    color: "#e60000",
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
  },
});

export default FindBloodRequests;
