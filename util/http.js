const FIREBASE_URL = 'https://controle-despesa-c5472-default-rtdb.firebaseio.com';
const BASE_URL = `${FIREBASE_URL}/itens`;

async function sendRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Não foi possível conectar ao Firebase. Confira a URL e as regras do banco.');
  }

  return response.json();
}

export async function fetchExpenses() {
  const data = await sendRequest(`${BASE_URL}.json`);

  if (!data) return [];

  return Object.entries(data).map(([id, item]) => ({
    id,
    description: item.description,
    amount: Number(item.amount),
    date: new Date(item.date),
  })).sort((a, b) => b.date - a.date);
}

export async function storeExpense(expense) {
  const response = await sendRequest(`${BASE_URL}.json`, {
    method: 'POST',
    body: JSON.stringify({
      description: expense.description,
      amount: expense.amount,
      date: expense.date.toISOString(),
    }),
  });

  return { ...expense, id: response.name };
}

export async function updateStoredExpense(id, expense) {
  await sendRequest(`${BASE_URL}/${id}.json`, {
    method: 'PATCH',
    body: JSON.stringify({
      description: expense.description,
      amount: expense.amount,
      date: expense.date.toISOString(),
    }),
  });
}

export async function deleteStoredExpense(id) {
  await sendRequest(`${BASE_URL}/${id}.json`, { method: 'DELETE' });
}
