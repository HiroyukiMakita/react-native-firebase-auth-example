import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './views/screens/HomeScreen';
import RegisterScreen from './views/screens/auth/email-and-password/RegisterUseEmailAndPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginByAnonymousScreen from './views/screens/auth/anonymous/LoginByAnonymousScreen';
import LinkWithEmailAndPasswordScreen from './views/screens/auth/anonymous/LinkWithEmailAndPasswordScreen';
import LoginUseEmailAndPasswordScreen from './views/screens/auth/email-and-password/LoginUseEmailAndPasswordScreen';
import RegisterUsePhoneNumberScreen from './views/screens/auth/phone/RegisterUsePhoneNumberScreen';
import LinkWithPhoneNumberScreen from './views/screens/auth/anonymous/LinkWithPhoneNumberScreen';

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
                  <Stack.Screen name="LoginUseEmailAndPasswordScreen" component={LoginUseEmailAndPasswordScreen} options={{ title: 'ログイン(email・password)' }} />
                  <Stack.Screen name="LoginByAnonymousScreen" component={LoginByAnonymousScreen} options={{ title: 'ログイン(匿名認証)' }} />
                  <Stack.Screen name="RegisterUsePhoneNumberScreen" component={RegisterUsePhoneNumberScreen} options={{ title: '電話番号認証' }} />
                  <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '新規登録' }} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ホーム' }} />
                  <Stack.Screen name="LinkWithEmailAndPasswordScreen" component={LinkWithEmailAndPasswordScreen} options={{ title: '匿名認証アカウントを email・password 認証でリンク' }} />
                  <Stack.Screen name="LinkWithPhoneNumberScreen" component={LinkWithPhoneNumberScreen} options={{ title: '匿名認証アカウントを電話番号認証でリンク' }} />
                </>
              )
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
