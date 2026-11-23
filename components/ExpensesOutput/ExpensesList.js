import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

// renderItem recebe um objeto "itemData"; o item em si está em itemData.item.
function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
