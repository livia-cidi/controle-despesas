import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({ expenses, periodName }) {
  // reduce: transforma a lista de despesas em um único número (a soma).
  const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const { width, height } = useWindowDimensions();
  const fontSize = height < 400 ? 14 : width > 600 ? 20 : 16;

  return (
    <View style={[styles.container, { width: '90%', maxWidth: 400, alignSelf: 'center' }]}> 
      <Text style={[styles.period, { fontSize: height < 400 ? 10 : 12 }]}>{periodName}</Text>
      <Text style={[styles.sum, { fontSize }]}>R$ {expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
