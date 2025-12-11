import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';
import "./global.css"

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Score from './screens/Score';
import Dashboard from './screens/Dashboard';
import Questionnaire from './screens/Questionnaire';
import Challenges from './screens/Challenges';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

// Stack interne pour le Dashboard
function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen name="Questionnaire" component={Questionnaire} />
    </DashboardStack.Navigator>
  );
}

// Tabs principales
function AppTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false ,
        tabBarActiveTintColor: "#6C0FF2",
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        }    
      }}
    >
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
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="bar-chart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="emoji-events" size={size} color={color} />
          ),
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

// App principale
export default function App() {
  //const { isLoggedIn, hydrated, loadAuthState } = useAuthStore();
  const isLoggedIn = true 

  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
        <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
