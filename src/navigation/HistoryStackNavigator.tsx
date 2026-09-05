import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryListScreen } from '../screens/HistoryListScreen';
import { RoundDetailScreen } from '../screens/RoundDetailScreen';
import { colors } from '../theme';
import type { HistoryStackParamList } from './types';

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export function HistoryStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: '#ffffff',
        headerTitleStyle: { color: '#ffffff' },
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="HistoryList" component={HistoryListScreen} options={{ title: 'History' }} />
      <Stack.Screen name="RoundDetail" component={RoundDetailScreen} options={{ title: 'Round' }} />
    </Stack.Navigator>
  );
}
