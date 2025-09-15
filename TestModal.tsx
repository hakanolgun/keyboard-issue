import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function TestModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const {top, bottom} = useSafeAreaInsets();
  const [text, setText] = useState('');

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      avoidKeyboard={false} // dont make it true, use keyboardavoiding in children until maintainers fix it
      hasBackdrop={true}
      coverScreen={true}
      backdropColor={'#000'}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      style={[styles.modal, {paddingTop: top}]}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}>
        <View
          style={[
            styles.bottomCard,
            {paddingBottom: Math.max(bottom, Platform.OS === 'ios' ? 20 : 40)},
          ]}>
          <TextInput value={text} onChangeText={setText} style={styles.input} />
          <Button title="Close" onPress={onClose} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomCard: {
    backgroundColor: 'darkgray',
    width: Dimensions.get('window').width,
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    gap: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
});
