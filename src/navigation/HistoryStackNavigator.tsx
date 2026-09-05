import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryListScreen } from '../screens/HistoryListScreen';
import { RoundDetailScreen } from '../screens/RoundDetailScreen';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import { useTheme } from '../theme';
import type { HistoryStackParamList } from './types';

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export function HistoryStackNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: '#ffffff',
        headerTitleStyle: { color: '#ffffff' },
        contentStyle: { backgroundColor: colors.bg },
        headerRight: () => <ThemeToggleButton />,
      }}
    >
      <Stack.Screen name="HistoryList" component={HistoryListScreen} options={{ title: 'History' }} />
      <Stack.Screen name="RoundDetail" component={RoundDetailScreen} options={{ title: 'Round' }} />
    </Stack.Navigator>
  );
}
