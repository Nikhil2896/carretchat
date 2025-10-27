import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import Theme from '../constants/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputView = props => {
  const [newMessage, setNewMessage] = useState();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let msg = newMessage?.trim();
    if (msg && msg.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [newMessage]);

  const onSend = msg => {
    const date = new Date();
    const messageId = date.getTime();
    let messageData = {
      sender: props.name,
      messageId: messageId,
      timeStamp: date,
      senderId: 12345,
      message: newMessage,
    };
    props.setMessageList(prev => [...prev, messageData]);
    setNewMessage();
  };
  return (
    <View style={styles.sendView}>
      <TextInput
        style={styles.textInput}
        onChangeText={setNewMessage}
        value={newMessage}
        placeholder="Your message....."
        placeholderTextColor={Theme.colors.placeHolder}
        maxLength={300}
        selectionColor={Theme.colors.primaryColor}
      />
      <View style={styles.sendButton}>
        <Icon
          name={'paper-plane'}
          size={20}
          style={{ color: Theme.colors.primaryLight }}
          onPress={() => onSend(newMessage)}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const Chat = props => {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    setMessageList([]);
    const date = new Date();
    const messageId = date.getTime();
    let firstMessage = {
      sender: props.route.params.userData.name,
      messageId: messageId,
      timeStamp: date,
      senderId: props.route.params.userData.id,
      message: 'Hey!!!',
    };
    setMessageList([...messageList, firstMessage]);
  }, []);

  const renderMessages = ({ item }) => {
    return (
      <View
        style={[
          styles.messageView,
          item.senderId === 12345 ? styles.myMessage : styles.othersMessage,
        ]}
      >
        <Text style={{ color: Theme.colors.white }}>{item.message}</Text>
      </View>
    );
  };

  const MessagesView = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={messageList}
          renderItem={renderMessages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MessagesView />
      <InputView
        name={props.route.params.name}
        setMessageList={setMessageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryLight,
    paddingHorizontal: 20,
  },
  sendView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Theme.colors.primaryColor,
    paddingHorizontal: 15,
    color: Theme.colors.primaryDark,
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: Theme.colors.primaryColor,
    padding: 10,
    borderRadius: 50,
  },
  messageView: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: Theme.colors.primaryColor,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  othersMessage: {
    backgroundColor: Theme.colors.placeHolder,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  flatlist: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

export default Chat;
