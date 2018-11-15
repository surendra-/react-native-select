import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const colors = {
  whiteTransparent: 'rgba(255, 255, 255, 0.5)',
  blackColor: '#000',
  whiteColor: '#FFFFFF',
};

const { width, height } = Dimensions.get('window');

const style = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 10,
    flexDirection: 'row',
  },
  iconStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  topView: {
    flex: 1,
  },
  popupContainer: {
    backgroundColor: colors.whiteTransparent,
    flex: 1,
  },
  listItem: { padding: 10, borderBottomWidth: 1, borderColor: '#F5F5F5' },
  listItemText: { fontSize: 22 },
  content: {
    width: width * 0.8,
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    maxHeight: height * 0.7,
    backgroundColor: colors.whiteColor,
    ...Platform.select({
      ios: {
        shadowColor: colors.blackColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
      },
      android: {
        borderWidth: 0.1,
        borderColor: colors.blackColor,
        elevation: 6,
      },
    }),
  },
};

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      picked: null,
    };
  }

  onShow = () => {
    this.setState({ visible: true });
  };

  onSelect = (picked) => {
    const { onChange } = this.props;
    this.setState({
      picked: picked.label,
      visible: false,
    });
    onChange(picked);
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, picked } = this.state;
    const { options, placeHolder } = this.props;

    return (
      <View style={style.container}>
        <TouchableOpacity style={style.inputStyle} onPress={this.onShow}>
          <View style={{ flex: 3 }}>
            <Text>{picked || placeHolder}</Text>
          </View>
          <View style={style.iconStyle}>
            <Icon name="arrow-drop-down" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <Modal animationType="fade" transparent visible={visible} onRequestClose={this.onCancel}>
          <View style={style.popupContainer}>
            <TouchableWithoutFeedback onPress={this.onCancel} style={style.topView}>
              <View style={style.topView} />
            </TouchableWithoutFeedback>
            <View style={style.content}>
              {options.map(option => (
                <TouchableOpacity onPress={() => this.onSelect(option)}>
                  <View style={style.listItem}>
                    <Text style={style.listItemText}>{option.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableWithoutFeedback onPress={this.onCancel} style={style.topView}>
              <View style={style.topView} />
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </View>
    );
  }
}

Select.propTypes = {
  placeHolder: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  placeHolder: '',
  options: [],
  onChange: () => {},
};
