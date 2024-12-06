import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Dashboard  from '../screens/Dashboard';
import Soumission  from '../screens/Soumission';
import Login  from '../screens/Login';
import SignUp  from '../screens/SignUp';
import Reclamation  from '../screens/Reclamation';
import Notification from '../screens/Notification';
import Admin from '../screens/Admin';
import User from '../screens/User';

const stack = createStackNavigator();

const AppNavigator = ()=>{
    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName="Login">
                <stack.Screen name="Dashboard" component={Dashboard}/>
                <stack.Screen name="Soumission" component={Soumission}/>
                <stack.Screen name="Login" component={Login}/>
                <stack.Screen name="signUp" component={SignUp}/>
                <stack.Screen name="Reclamation" component={Reclamation}/>
                <stack.Screen name="Notification" component={Notification }/>
                <stack.Screen name='Admin' component={Admin}/>
                <stack.Screen name='User' component={User}/>
            </stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigator;