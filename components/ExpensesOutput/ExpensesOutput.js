import { StyleSheet, Text, View } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/Button';

// Componente compartilhado pelas duas abas: muda só o que vem por props.
function ExpensesOutput({ expenses, expensesPeriod, fallbackText, isLoading, error, onRetry }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (isLoading) {
    content = <Text style={styles.infoText}>Carregando despesas...</Text>;
  } else if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Button onPress={onRetry}>Tentar novamente</Button>
        </View>
      )}
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  errorBox: { backgroundColor: '#FCE4E4', padding: 12, borderRadius: 6, marginTop: 12, gap: 8 },
  errorText: { color: '#8B1E1E', textAlign: 'center' },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
