import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Settings from '../settings/Settings';

export default class ModalScreen extends Component {
  render() {
    const {isVisible, toggleVisible} = this.props;
    return (
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        onBackdropPress={() => toggleVisible()}
        swipeDirection="down"
        swipeThreshold={400}
        onSwipeComplete={() => toggleVisible()}>
        <View style={styles.modalContent}>
          <Settings closeModal={toggleVisible} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'red',
    height: '70%',
    borderRadius: 40,
    alignItems: 'center',
  },
});
