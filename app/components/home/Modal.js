import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
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
        onSwipeComplete={() => toggleVisible()}
        animationInTiming={400}
        animationOutTiming={400}>
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
    backgroundColor: '#F9F9F9',
    height: '86%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
});
