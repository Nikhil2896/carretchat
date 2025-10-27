import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = props => {
  useEffect(() => {
    console.log(props.route.params);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Chat;
