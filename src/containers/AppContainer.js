/* eslint class-methods-use-this:off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform, SafeAreaView } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
import { Body, Button, Container, Content, Footer, Header, Left, Right, Root, Text, Title, Toast, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';

import { Auth, AskProfile, Main } from '../router';
import styles from '../styles';
import LoadingScreen from '../components/LoadingScreen';
import { isProfileCompleted } from '../utils';

class AppContainer extends Component {
  static propTypes = {
  }

  async componentDidMount() {
    // const { dispatch } = this.props;
    // NetInfo.addEventListener('connectionChange', this.connectionListener);

    // const { type, effectiveType } = await NetInfo.getConnectionInfo();
    // if (type === 'wifi') {
    //   dispatch({ type: 'ON_NETWORK_TYPE_CHANGED', networkType: 'wifi' });
    // } else if (type === 'cellular') {
    //   dispatch({ type: 'ON_NETWORK_TYPE_CHANGED', networkType: effectiveType });
    // }
  }

  componentWillUnmount() {
    // NetInfo.removeEventListener('connectionChange', this.connectionListener);
  }

  connectionListener = ({ type, effectiveType }) => {
    const { dispatch } = this.props;
    if (type === 'wifi') {
      return dispatch({ type: 'ON_NETWORK_TYPE_CHANGED', networkType: 'wifi' });
    } else if (type === 'cellular') {
      return dispatch({ type: 'ON_NETWORK_TYPE_CHANGED', networkType: effectiveType });
    }
    return false;
  }

  renderRoot() {
    const { userData } = this.props.auth;
    if (isProfileCompleted(userData)) {
      return (<Main />);
    } else if (userData) {
      return (<AskProfile />);
    }
    return (<Auth />);
    // return (<Main />);
  }

  render() {
    const { isProgressing } = this.props.state;
    return (
      <Root>
        {this.renderRoot()}
        {isProgressing ? <LoadingScreen /> : null}
      </Root>
    );
  }
}

function mapStateToProps({ auth, state }) {
  return {
    auth,
    state
  };
}
function bindActions(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, bindActions)(AppContainer);
