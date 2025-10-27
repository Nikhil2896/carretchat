import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = props => {
  const [name, setName] = useState();

  useEffect(() => {
    setName(props.route.params.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello {name}</Text>
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

export default Home;
