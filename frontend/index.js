import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UpdateClient from './pages/updateExpense';
import Create from './pages/createExpense';
import Dashboard from './pages/dashboard';

const Stack = createStackNavigator();


const MainApp = () => (
  <NavigationContainer >
    <Stack.Navigator initialRouteName='dashboard' screenOptions={{headerShown: false}}>
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="createExpense" component={Create} />
      <Stack.Screen name="updateExpense" component={UpdateClient} />
    </Stack.Navigator>
  </NavigationContainer>
);

registerRootComponent(MainApp);

