import {createStackNavigator} from 'react-navigation-stack';
import Settings from './Settings';
import AccountSettings from './AccountSettings';

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerShown: false,
      },
    },
    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: {
        headerTitle: 'Account',
      },
    },
  },
  {
    initialRouteName: 'Settings',
  },
);

export default SettingsStack;
