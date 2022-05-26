import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from '../../lib/firebase';
import { Auth, signOut } from 'firebase/auth';
import JSONTree from 'react-native-json-tree';

const HomeScreen = () => {
  const [loginStatus, setLoginStatus] = useState('');
  useEffect(() => {
    if (auth?.currentUser?.isAnonymous ?? false) {
      setLoginStatus('匿名ログイン中');
    } else {
      setLoginStatus('email・password ログイン中');
    }
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('logout');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <ScrollView >
      <View style={styles.container}>
        <Text>ホーム画面</Text>
        <Text style={{ color: 'red' }}>{loginStatus}</Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: '#88cb7f',
            borderRadius: 10,
            width: 100,
          }}
        >
          <Text style={{ color: 'white' }}>ログアウト</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 30 }}>auth オブジェクト</Text>
        <Text><JSONTree data={auth as any} /></Text>
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