"use client";

import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Roles from "./app/screens/Roles";
import DonorLogin from "./app/screens/DonorLogin";
import DonorSignup from "./app/screens/DonorSignup";
import HealthWorkerLogin from "./app/screens/HealthWorkerLogin";
import HealthWorkerSignup from "./app/screens/HealthWorkerSignup";
import DashboardDonor from "./app/screens/DashboardDonor";
import DashboardWorker from "./app/screens/DashboardWorker";
import ManageBloodRequests from "./app/screens/ManageBloodRequests";
import VerifyDonations from "./app/screens/VerifyDonations";
import DonorList from "./app/screens/DonorList";
import HealthWorkerProfile from "./app/screens/HealthWorkerProfile";
import AppointmentsManagement from "./app/screens/AppointmentsManagement";
import Notifications from "./app/screens/WorkerNotifications";
import FindBloodRequests from "./app/screens/FindBloodRequests";
import RequestBlood from "./app/screens/RequestBlood";
import DonationHistory from "./app/screens/DonationHistory";
import DonorProfile from "./app/screens/DonorProfile";
import DonorAppointments from "./app/screens/DonorAppointments";
import WorkerNotifications from "./app/screens/WorkerNotifications";
import DonorNotifications from "./app/screens/DonorNotifications";

const Stack = createStackNavigator();

export default function App() {
  const [showRoles, setShowRoles] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const dropAnim = useRef(new Animated.Value(-100)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const splashFadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          { iterations: 3 }
        ),
        Animated.timing(dropAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(splashFadeOut, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRoles(true);
    });
  }, []);

  if (!showRoles) {
    return (
      <Animated.View style={[styles.container, { opacity: splashFadeOut }]}>
        <StatusBar style="light" />
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.heartContainer,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text style={styles.heart}>❤️</Text>
            <Animated.View
              style={[
                styles.droplet,
                { transform: [{ translateY: dropAnim }] },
              ]}
            />
          </Animated.View>
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: textAnim,
                transform: [
                  {
                    translateY: textAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            BloodConnect
          </Animated.Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Roles">
        <Stack.Screen
          name="Roles"
          component={Roles}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonorLogin"
          component={DonorLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonorSignup"
          component={DonorSignup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthWorkerLogin"
          component={HealthWorkerLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthWorkerSignup"
          component={HealthWorkerSignup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardDonor" // ✅ Update the name here
          component={DashboardDonor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardWorker" // ✅ Update the name here
          component={DashboardWorker}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageBloodRequests" // ✅ Update the name here
          component={ManageBloodRequests}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyDonations" // ✅ Update the name here
          component={VerifyDonations}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonorList" // ✅ Update the name here
          component={DonorList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthWorkerProfile" // ✅ Update the name here
          component={HealthWorkerProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppointmentsManagement" // ✅ Update the name here
          component={AppointmentsManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WorkerNotifications" // ✅ Update the name here
          component={WorkerNotifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FindBloodRequests" // ✅ Update the name here
          component={FindBloodRequests}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestBlood" // ✅ Update the name here
          component={RequestBlood}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonationHistory" // ✅ Update the name here
          component={DonationHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonorProfile" // ✅ Update the name here
          component={DonorProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonorAppointments" // ✅ Update the name here
          component={DonorAppointments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DonorNotifications" // ✅ Update the name here
          component={DonorNotifications}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  heartContainer: {
    marginBottom: 20,
    position: "relative",
    alignItems: "center",
  },
  heart: {
    fontSize: 80,
    textShadowColor: "rgba(255, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
    textShadowColor: "rgba(255, 0, 0, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  droplet: {
    position: "absolute",
    width: 10,
    height: 20,
    backgroundColor: "#e60000",
    borderRadius: 10,
    bottom: -15,
    shadowColor: "#e60000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
});
