import { StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center',
    borderBottomWidth: 2, borderBottomColor: GlobalStyles.colors.primary200, paddingBottom: 8,
  },
});
