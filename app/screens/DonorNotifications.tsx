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

const DonorNotifications = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample data - in a real app, this would come from an API
  const notifications = [
    {
      id: "1",
      type: "urgent_request",
      title: "Urgent Blood Request",
      message:
        "City General Hospital needs O+ blood urgently. You are a match!",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "appointment_reminder",
      title: "Appointment Reminder",
      message:
        "Your donation appointment is tomorrow at 10:00 AM at Memorial Hospital.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "donation_eligibility",
      title: "You Can Donate Again",
      message:
        "It's been 3 months since your last donation. You are now eligible to donate again!",
      time: "2 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "thank_you",
      title: "Thank You for Donating",
      message:
        "Your recent blood donation has helped save lives. Thank you for your generosity!",
      time: "3 days ago",
      read: true,
    },
    {
      id: "5",
      type: "nearby_drive",
      title: "Blood Drive Near You",
      message:
        "There's a blood drive happening at Community Center this weekend. Would you like to participate?",
      time: "1 week ago",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent_request":
        return <Feather name="alert-circle" size={20} color="#e60000" />;
      case "appointment_reminder":
        return <Feather name="calendar" size={20} color="#5cb85c" />;
      case "donation_eligibility":
        return <Feather name="check-circle" size={20} color="#5cb85c" />;
      case "thank_you":
        return <Feather name="heart" size={20} color="#e60000" />;
      case "nearby_drive":
        return <Feather name="map-pin" size={20} color="#4a89dc" />;
      default:
        return <Feather name="bell" size={20} color="#e60000" />;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "urgent") return notification.type === "urgent_request";
    return true;
  });

  const renderNotificationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadNotification]}
      onPress={() => {
        // In a real app, this would mark the notification as read
        console.log("View notification details:", item.id);
      }}
    >
      <View style={styles.notificationIconContainer}>
        <View
          style={[
            styles.notificationIcon,
            item.type === "urgent_request"
              ? styles.urgentIcon
              : item.type === "appointment_reminder" ||
                item.type === "donation_eligibility"
              ? styles.reminderIcon
              : styles.defaultIcon,
          ]}
        >
          {getNotificationIcon(item.type)}
        </View>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>

        <Text style={styles.notificationMessage}>{item.message}</Text>

        {item.type === "urgent_request" && (
          <View style={styles.notificationActions}>
            <TouchableOpacity style={styles.respondButton}>
              <Text style={styles.respondButtonText}>Respond</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dismissButton}>
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.type === "appointment_reminder" && (
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigation.navigate("appointments")}
          >
            <Text style={styles.viewButtonText}>View Appointment</Text>
          </TouchableOpacity>
        )}
      </View>

      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#e60000" />
        </TouchableOpacity>
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
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "unread" && styles.activeTab]}
          onPress={() => setActiveTab("unread")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "unread" && styles.activeTabText,
            ]}
          >
            Unread
          </Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              {notifications.filter((n) => !n.read).length}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "urgent" && styles.activeTab]}
          onPress={() => setActiveTab("urgent")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "urgent" && styles.activeTabText,
            ]}
          >
            Urgent
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="bell-off" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No notifications found</Text>
          </View>
        }
      />

      {notifications.some((n) => !n.read) && (
        <TouchableOpacity
          style={styles.markAllReadButton}
          onPress={() => {
            // In a real app, this would mark all notifications as read
            console.log("Mark all as read");
          }}
        >
          <Text style={styles.markAllReadText}>Mark All as Read</Text>
        </TouchableOpacity>
      )}
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
    flexDirection: "row",
    justifyContent: "center",
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
  badgeContainer: {
    backgroundColor: "#e60000",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  notificationsList: {
    padding: 15,
    paddingBottom: 80, // Add padding for the mark all read button
  },
  notificationCard: {
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
  unreadNotification: {
    backgroundColor: "#ffebee",
  },
  notificationIconContainer: {
    marginRight: 15,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultIcon: {
    backgroundColor: "#f0f5ff",
  },
  urgentIcon: {
    backgroundColor: "#ffebee",
  },
  reminderIcon: {
    backgroundColor: "#e8f5e9",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
  notificationActions: {
    flexDirection: "row",
  },
  respondButton: {
    backgroundColor: "#e60000",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  respondButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  dismissButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dismissButtonText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#f0f5ff",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#4a89dc",
    fontSize: 12,
    fontWeight: "bold",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e60000",
    position: "absolute",
    top: 15,
    right: 15,
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
  markAllReadButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#e60000",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  markAllReadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DonorNotifications;
