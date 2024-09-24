import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Text, View } from 'native-base';

import styles, { Material } from '../../styles';

class TabBar extends Component {
  tabs = [
    { title: 'Track', icon: 'book-outline' },
    { title: 'Emergency', icon: 'add-circle-outline' },
    { title: 'CheckIn', icon: 'home-outline' },
    { title: 'Notification', icon: 'notifications' },
    { title: 'Profile', icon: 'person' }
  ];

  onNavigate = (title, index) => {
    const { navigation } = this.props;
    navigation.navigate(title);
  }

  render() {
    const { navigation } = this.props;
    let { state: { index: curIndex } } = navigation;

    return (
      <View style={styles.tabContainer}>
        {
          this.tabs.map(({ title, icon }, index) => {
            const isSelected = curIndex === index;
            let activeBtn = {}, activeIcon = {};
            if (isSelected) {
              activeBtn = { backgroundColor: Material.brandPrimary };
              activeIcon = { color: Material.whiteColor }
            }

            return (
              <Button
                title={title}
                vertical
                full
                disabled={isSelected}
                style={[styles.tabButton, activeBtn]}
                active={isSelected}
                onPress={() => this.onNavigate(title, index)}
                key={title}
              >
                <Icon name={icon} style={[styles.tabIcon, activeIcon]} />
              </Button>
            );
          })
        }
      </View>
    );
  }
}

export default TabBar;