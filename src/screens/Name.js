import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Theme from '../constants/Theme';
import { Routes } from '../constants/Constants';

const Name = props => {
  const [name, setName] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let userName = name?.trim();
    if (userName && userName.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name]);

  const onSubmit = async () => {
    props.navigation.navigate(Routes.Home, {
      name: name.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', paddingHorizontal: 30 }}>
        <Text style={styles.heading}>Carret Chat</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
          placeholderTextColor={Theme.colors.placeHolder}
          maxLength={20}
          selectionColor={Theme.colors.primaryColor}
        />
        <TouchableOpacity
          style={[
            styles.submit,
            {
              backgroundColor: disabled
                ? Theme.colors.placeHolder
                : Theme.colors.primaryColor,
            },
          ]}
          disabled={disabled}
          onPress={onSubmit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Theme.colors.primaryLight,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Theme.colors.primaryColor,
    paddingHorizontal: 15,
    color: Theme.colors.primaryDark,
    marginVertical: 60,
    textAlign: 'center',
  },
  heading: {
    fontSize: Theme.fontSize.heading,
    fontWeight: '700',
    color: Theme.colors.primaryColor,
    textAlign: 'center',
  },
  submit: {
    borderRadius: 100,
  },
  submitText: {
    textAlign: 'center',
    color: Theme.colors.primaryLight,
    padding: 10,
  },
});

export default Name;
