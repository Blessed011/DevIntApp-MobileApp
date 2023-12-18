import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModulesListScreen from './screens/ModulesListScreen';
import ModuleInfoScreen from './screens/ModuleInfoScreen';
import { store } from './store';
import { Provider } from 'react-redux';

global.Buffer = require('buffer').Buffer;

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    contentStyle: {
                        backgroundColor: '#FFFFFF'
                    }
                }}>
                    <Stack.Screen
                        name='ModulesList'
                        component={ModulesListScreen}
                        options={{
                            title: 'Список модулей',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        }}
                    />
                    <Stack.Screen
                        name='ModuleInfo'
                        component={ModuleInfoScreen}
                        options={({ route }) => ({
                            title: route.params.marking || 'Информация о модуле',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}