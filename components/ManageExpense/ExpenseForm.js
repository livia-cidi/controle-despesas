import { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import Input from './Input';
import Title from '../UI/Title';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  // UM único estado para o formulário inteiro.
  // Cada campo guarda { value, isValid } -> o valor digitado e se ele passou na validação.
  const { width, height } = useWindowDimensions();
  const isLandscape = height < 400;

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  // Uma única função para TODOS os campos.
  // O inputIdentifier chega via bind(); o enteredValue chega do React Native.
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const [year, month, day] = inputs.date.value.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day, 12);
    const dateFormatIsValid = /^\d{4}-\d{2}-\d{2}$/.test(inputs.date.value);

    const expenseData = {
      amount: +inputs.amount.value.replace(',', '.'),
      date: parsedDate,
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = dateFormatIsValid && !isNaN(parsedDate.getTime()) &&
      parsedDate.getFullYear() === year && parsedDate.getMonth() === month - 1 &&
      parsedDate.getDate() === day;
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Em vez de um Alert, marcamos no próprio formulário o que está errado.
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return; // interrompe o envio
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={[styles.form, { marginTop: isLandscape ? 8 : 24, maxWidth: 700, width: '100%', alignSelf: 'center' }]}> 
      <Title style={styles.title}>Sua despesa</Title>

      <View style={[styles.inputsRow, width < 380 && { flexDirection: 'column' }]}> 
        <Input
          label="Valor (R$)"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Data"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'AAAA-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Descrição"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: 'sentences',
          autoCorrect: false,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Dados inválidos — confira os campos destacados.
        </Text>
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancelar
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 16,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1, // os dois campos da linha dividem o espaço igualmente
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
