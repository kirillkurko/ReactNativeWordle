import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen } from './Screen';
import { Game } from '../screens';
import { RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screen.Game}>
        <Stack.Group
          screenOptions={{
            headerStyle: {
              backgroundColor: '#a69cac',
            },
          }}
        >
          <Stack.Screen name={Screen.Game} component={Game} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
