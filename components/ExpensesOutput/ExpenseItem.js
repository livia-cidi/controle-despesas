import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function ExpenseItem({ id, description, amount, date }) {
  // Este componente NÃO é uma tela, então não recebe a prop "navigation".
  // O hook useNavigation resolve isso.
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isLandscape = height < 400;
  const horizontalPadding = width > 600 ? 24 : 12;
  const descriptionFontSize = width > 600 ? 18 : 16;

  function expensePressHandler() {
    navigation.navigate('ManageExpense', { expenseId: id });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.expenseItem, { paddingHorizontal: horizontalPadding, marginVertical: isLandscape ? 4 : 8 }]}>
        <View>
          <Text style={[styles.textBase, styles.description, { fontSize: descriptionFontSize }]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>R$ {amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3, // sombra no Android
    shadowColor: GlobalStyles.colors.gray500, // sombra no iOS
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 100,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
