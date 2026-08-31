import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { NewRoundScreen } from '../screens/NewRoundScreen';
import { HistoryStackNavigator } from './HistoryStackNavigator';
import { colors, typography } from '../theme';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.amberText,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen name="NewRound" component={NewRoundScreen} options={{ title: 'New Round' }} />
      <Tab.Screen name="History" component={HistoryStackNavigator} options={{ title: 'History' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.panel,
    borderTopColor: colors.border,
  },
  tabBarLabel: {
    fontSize: typography.tiny.fontSize,
  },
});
