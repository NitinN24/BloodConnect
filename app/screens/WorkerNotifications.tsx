"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const WorkerNotifications = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample data - in a real app, this would come from an API
  const notifications = [
    {
      id: "1",
      type: "new_donor",
      title: "New Donor Registered",
      message: "John Doe (A+) has registered as a new donor.",
      time: "10 minutes ago",
      read: false,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      type: "donation_confirmed",
      title: "Donation Confirmed",
      message:
        "Sarah Smith (O-) has confirmed her appointment for tomorrow at 10:30 AM.",
      time: "1 hour ago",
      read: false,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      type: "urgent_request",
      title: "Urgent Blood Request",
      message:
        "City General Hospital needs 2 units of AB- blood urgently for emergency surgery.",
      time: "2 hours ago",
      read: true,
      image: null,
    },
    {
      id: "4",
      type: "appointment_cancelled",
      title: "Appointment Cancelled",
      message:
        "Mike Johnson (B+) has cancelled his appointment scheduled for today at 3:00 PM.",
      time: "3 hours ago",
      read: true,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "5",
      type: "donation_completed",
      title: "Donation Completed",
      message: "Emma Wilson (AB+) has successfully donated 1 unit of blood.",
      time: "1 day ago",
      read: true,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "6",
      type: "system",
      title: "System Maintenance",
      message:
        "The system will be under maintenance tonight from 2:00 AM to 4:00 AM.",
      time: "2 days ago",
      read: true,
      image: null,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "urgent") return notification.type === "urgent_request";
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_donor":
        return <Feather name="user-plus" size={20} color="#4a89dc" />;
      case "donation_confirmed":
        return <Feather name="calendar" size={20} color="#5cb85c" />;
      case "urgent_request":
        return <Feather name="alert-circle" size={20} color="#d9534f" />;
      case "appointment_cancelled":
        return <Feather name="x-circle" size={20} color="#f0ad4e" />;
      case "donation_completed":
        return <Feather name="check-circle" size={20} color="#5cb85c" />;
      case "system":
        return <Feather name="settings" size={20} color="#777" />;
      default:
        return <Feather name="bell" size={20} color="#4a89dc" />;
    }
  };

  const renderNotificationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadNotification]}
    >
      <View style={styles.notificationIconContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.notificationImage}
          />
        ) : (
          <View
            style={[
              styles.notificationIcon,
              item.type === "urgent_request"
                ? styles.urgentIcon
                : item.type === "system"
                ? styles.systemIcon
                : styles.defaultIcon,
            ]}
          >
            {getNotificationIcon(item.type)}
          </View>
        )}
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>

        <Text style={styles.notificationMessage}>{item.message}</Text>

        {item.type === "urgent_request" && (
          <View style={styles.urgentActions}>
            <TouchableOpacity style={styles.urgentActionButton}>
              <Text style={styles.urgentActionText}>Respond</Text>
            </TouchableOpacity>
          </View>
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
          <Feather name="more-vertical" size={24} color="#333" />
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
        <TouchableOpacity style={styles.markAllReadButton}>
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
  badgeContainer: {
    backgroundColor: "#d9534f",
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
    backgroundColor: "#f0f5ff",
  },
  notificationIconContainer: {
    marginRight: 15,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultIcon: {
    backgroundColor: "#f0f5ff",
  },
  urgentIcon: {
    backgroundColor: "#ffebee",
  },
  systemIcon: {
    backgroundColor: "#f5f5f5",
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
  },
  urgentActions: {
    marginTop: 10,
  },
  urgentActionButton: {
    backgroundColor: "#d9534f",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  urgentActionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4a89dc",
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
    backgroundColor: "#4a89dc",
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

export default WorkerNotifications;
