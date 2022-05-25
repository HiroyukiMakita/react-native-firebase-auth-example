import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './views/screens/HomeScreen';
import RegisterScreen from './views/screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './views/screens/LoginScreen';

/** ユーザーの状態を保持 */
type UserState = User | null;

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null as UserState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: UserState) => {
      setLoading(false);
      if (user === null) {
        setUser(null);
      } else {
        console.log(user);
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {
            user === null
              ? (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'ログイン' }} />
                  <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '新規登録' }} />
                </>
              )
              : <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ホーム' }} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
