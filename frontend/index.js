import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './user/login';
import Register from './user/register';
import UpdateClient from './pages/updateExpense';
import Create from './pages/createExpense';
import Dashboard from './pages/dashboard';

const Stack = createStackNavigator();


const MainApp = () => (
  <NavigationContainer >
    <Stack.Navigator initialRouteName='dashboard' screenOptions={{headerShown: true}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="createExpense" component={Create} />
      <Stack.Screen name="updateExpense" component={UpdateClient} />
    </Stack.Navigator>
  </NavigationContainer>
);

registerRootComponent(MainApp);

