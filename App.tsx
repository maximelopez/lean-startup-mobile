import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import "./assets/styles/global.css";

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Score from './screens/Score';
import Dashboard from './screens/Dashboard';
import Questionnaire from './screens/Questionnaire';
import Challenges from './screens/Challenges';
import Profile from './screens/Profile';

// Redux
import { Provider, useSelector } from 'react-redux';
import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './reducers/user';

const reducers = combineReducers({ user });

const persistConfig = {
  key: 'tribu',
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// Navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        component={Dashboard}
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
          tabBarIcon: ({ color, size }) => <MaterialIcons name="account-circle" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Composant principal qui lit le state Redux
function MainNavigator() {
  const userState = useSelector((state: any) => state.user);
  const isLoggedIn = userState.loggedIn;
  const hasCompletedQuestionnaire = userState.user.hasCompletedQuestionnaire;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : !hasCompletedQuestionnaire ?(
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
      ) : (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      )}
    </Stack.Navigator>
  );
}

// App principale
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
