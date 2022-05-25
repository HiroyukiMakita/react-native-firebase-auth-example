import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

const HomeScreen = () => {
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
    <View style={styles.container}>
      <Text>ホーム画面</Text>
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
    </View>
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