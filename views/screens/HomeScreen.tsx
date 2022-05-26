import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from '../../lib/firebase';
import { deleteUser, signOut } from 'firebase/auth';
import JSONTree from 'react-native-json-tree';

const HomeScreen = () => {
  const [loginStatus, setLoginStatus] = useState('');

  const isAnonymous = useMemo(() => {
    return auth?.currentUser?.isAnonymous ?? false;
  }, [auth]);

  useEffect(() => {
    if (isAnonymous) {
      setLoginStatus('匿名ログイン中');
    } else {
      setLoginStatus('email・password ログイン中');
    }
  }, [isAnonymous]);

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
          <Text style={{ color: 'white', textAlign: 'center' }}>ログアウト</Text>
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