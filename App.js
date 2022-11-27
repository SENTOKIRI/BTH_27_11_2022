import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import Context from './context/Context'
import NewsScreen from './Screens/NewsScreen';
import Signup from './Screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Saved from './Screens/Saved';
import ExploreScreen from './Screens/ExploreScreen';
import Login from './Screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={NewsScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="Saved"
            component={Saved}
            options={{ title: 'Saved News' }}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Explore" component={ExploreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
