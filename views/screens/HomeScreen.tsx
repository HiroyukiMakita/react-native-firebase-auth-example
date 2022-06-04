import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { auth } from '../../lib/firebase';
import { deleteUser, signOut } from 'firebase/auth';
import JSONTree from 'react-native-json-tree';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState(null as string | null);
  const [phoneNumber, setPhoneNumber] = useState(null as string | null);
  const [loginStatus, setLoginStatus] = useState('');
  const [authToken, setAuthToken] = useState('');

  useFocusEffect(() => {
    setLoginStatus('未ログインまたはログイン方法不明');
    setIsAnonymous(auth?.currentUser?.isAnonymous ?? false);
    setEmail(auth?.currentUser?.email ?? null);
    setPhoneNumber(auth?.currentUser?.phoneNumber ?? null);
    if (isAnonymous) {
      setLoginStatus('匿名ログイン中');
    } else if (email !== null) {
      setLoginStatus('email・password ログイン中');
    } else if (phoneNumber !== null) {
      setLoginStatus('電話番号 ログイン中');
    }
  });

  const handleLogout = async () => {
    if (isAnonymous) {
      await deleteUser(auth.currentUser!)
        .then(() => {
          console.log('deleteUser success');
        })
        .catch((error) => {
          console.log('deleteUser failed: ', error.message);
        });
      return;
    }

    signOut(auth)
      .then(() => {
        console.log('logout');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  // IDトークンを試しにとる
  auth.currentUser!.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      // Send token to your backend via HTTPS
      setAuthToken(idToken);
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });

  const toLinkWithEmailAndPasswordScreen = () => navigation.navigate('LinkWithEmailAndPasswordScreen' as never);

  const toLinkWithPhoneNumberScreen = () => navigation.navigate('LinkWithPhoneNumberScreen' as never);

  return (
    <ScrollView >
      <View style={styles.container}>
        <Text>ホーム画面</Text>
        <Text style={{ color: 'red' }}>{loginStatus}</Text>
        <Text style={{ marginTop: 10 }}>UID：{authToken}</Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
            width: isAnonymous ? 200 : 100,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>ログアウト{isAnonymous && '(ユーザー削除)'}</Text>
        </TouchableOpacity>
        {isAnonymous &&
          [
            { label: 'email・passowrd 認証へ変更', action: toLinkWithEmailAndPasswordScreen },
            { label: '電話番号認証へ変更', action: toLinkWithPhoneNumberScreen }
          ].map((object, index) =>
          (<TouchableOpacity
            key={`link-action-button-${index}`}
            onPress={object.action}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: '#3882c3',
              borderRadius: 10,
              width: 200,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>{object.label}</Text>
          </TouchableOpacity>))}
        <View>
          <Text style={{ marginTop: 30, textAlign: 'center' }}>auth オブジェクト</Text>
          <Text><JSONTree data={auth as any} /></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;