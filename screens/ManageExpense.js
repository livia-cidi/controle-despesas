import { useContext, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);


  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      await expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        await expensesCtx.updateExpense(editedExpenseId, expenseData);
      } else {
        await expensesCtx.addExpense(expenseData);
      }
      navigation.goBack();
    } catch (error) {
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {expensesCtx.error && <Text style={styles.errorText}>{expensesCtx.error}</Text>}

      <ExpenseForm
        submitButtonLabel={isEditing ? 'Atualizar' : 'Adicionar'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </ScrollView>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  content: {
    padding: 24,
  },
  errorText: { color: GlobalStyles.colors.error500, textAlign: 'center', marginBottom: 12 },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
