import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import Theme from '../constants/Theme';
import { Routes } from '../constants/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = props => {
  const [name, setName] = useState();
  const [chatRooms, setChatRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setName(props.route.params.name);
  }, []);

  const AddTextInputView = () => {
    const [addName, setAddName] = useState();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
      let userName = addName?.trim();
      if (userName && userName.length > 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [addName]);

    const onSubmit = async () => {
      const date = new Date();
      const userId = date.getTime();
      let newChat = {
        id: userId,
        name: addName,
      };
      setChatRooms([...chatRooms, newChat]);
      setAddName();
      setModalVisible(false);
      navigateToChat(newChat);
    };

    return (
      <>
        <TextInput
          style={styles.textInput}
          onChangeText={setAddName}
          value={addName}
          placeholder="Enter your friend name"
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
          <Text style={styles.submitText}>Open Chat</Text>
        </TouchableOpacity>
      </>
    );
  };

  const NewChatModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <AddTextInputView />
          </View>
        </View>
      </Modal>
    );
  };

  const navigateToChat = data => {
    props.navigation.navigate(Routes.Chat, {
      name: name,
      userData: data,
    });
  };

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Icon
        name="comment-o"
        size={200}
        color={Theme.colors.primaryColor}
        style={{ opacity: 0.5 }}
      />
      <Text style={styles.emptyText}>No chats</Text>
    </View>
  );

  const itemSeperator = () => {
    return <View style={styles.seperator} />;
  };

  const renderData = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderButton}
        onPress={() => navigateToChat(item)}
      >
        <View style={styles.renderView}>
          <Icon name={'user'} size={40} style={styles.personIcon} />
          <Text style={styles.chatName}>{item.name}</Text>
        </View>
        <Icon
          name={'angle-right'}
          size={20}
          style={{ color: Theme.colors.primaryColor }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <NewChatModal />
      <View style={styles.header}>
        <Text style={styles.headingText}>Chats</Text>
        <Icon
          name={'plus'}
          size={30}
          style={{ color: Theme.colors.primaryLight }}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <FlatList
        data={chatRooms}
        renderItem={renderData}
        keyExtractor={item => item.id}
        ListEmptyComponent={emptyComponent}
        ItemSeparatorComponent={itemSeperator}
        contentContainerStyle={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Theme.colors.primaryColor,
    padding: 20,
  },
  headingText: {
    fontSize: Theme.fontSize.xLarge,
    fontWeight: '500',
    color: Theme.colors.primaryLight,
    textAlign: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor: Theme.colors.primaryLight,
    borderRadius: 10,
    marginHorizontal: 25,
    elevation: 5,
    padding: 30,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Theme.colors.primaryColor,
    paddingHorizontal: 15,
    color: Theme.colors.primaryDark,
    textAlign: 'center',
    marginBottom: 30,
  },
  submit: {
    borderRadius: 100,
  },
  submitText: {
    textAlign: 'center',
    color: Theme.colors.primaryLight,
    padding: 10,
  },
  emptyView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: Theme.colors.primaryColor,
    fontSize: Theme.fontSize.large,
    marginTop: 30,
  },
  seperator: {
    borderBottomColor: Theme.colors.placeHolder,
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  flatlist: {
    flex: 1,
    marginTop: 10,
  },
  chatName: {
    fontSize: Theme.fontSize.regular,
    fontWeight: 500,
  },
  renderButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  renderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personIcon: {
    color: Theme.colors.placeHolder,
    marginRight: 20,
  },
});

export default Home;
