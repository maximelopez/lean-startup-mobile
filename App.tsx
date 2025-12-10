import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import "./global.css"

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Score from './screens/Score';
import Profile from './screens/Profile';
import { useAuthStore } from './store/useAuthStore';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Score"
        component={Score}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="insights" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { isLoggedIn, hydrated, loadAuthState } = useAuthStore();

  useEffect(() => {
    loadAuthState();
  }, []);

  // Tant que l'état n'est pas chargé, afficher un loader
  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A3983" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <Stack.Screen name="AppTabs" component={AppTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
