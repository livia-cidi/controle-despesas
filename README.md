# Controle de Despesas

Aplicativo de controle de despesas feito com React Native e Expo. Permite cadastrar, consultar, editar e apagar despesas. Os dados são guardados no Firebase Realtime Database, então continuam disponíveis quando o aplicativo é fechado e aberto novamente.

## Telas

O aplicativo possui duas abas de consulta (Despesas recentes e Todas as despesas) e uma tela de cadastro/edição. Para adicionar uma despesa, toque no botão `+`. Para editar ou apagar, toque em uma despesa da lista.

> Prints: adicione aqui 2 ou 3 capturas do aplicativo rodando no Expo Go antes de entregar o repositório.

## Como configurar o Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um projeto.
2. No projeto, abra **Realtime Database** e crie um banco de dados.
3. Copie a URL exibida pelo Firebase. Ela será parecida com `https://nome-do-projeto-default-rtdb.firebaseio.com`.
4. Abra `util/http.js` e substitua `https://SEU-PROJETO-default-rtdb.firebaseio.com` pela URL do seu banco, sem barra no final.
5. Para a atividade, o professor permite usar as regras de teste. No Firebase, abra a aba **Regras**, habilite leitura e gravação para o teste e publique. O banco fica aberto: use somente dados inventados, nunca dados pessoais reais.

As regras de teste do Realtime Database podem vencer depois de aproximadamente 30 dias. Se o aplicativo deixar de gravar ou consultar, confira as regras no Console do Firebase.

## Como rodar

É necessário ter Node.js e o aplicativo Expo Go instalado no celular.

```bash
git clone URL_DO_SEU_REPOSITORIO
cd controle-despesas
npm install
npm start
```

Leia o QR code com o Expo Go. O celular e o computador devem estar na mesma rede Wi-Fi quando usar a conexão local do Expo.

Para abrir no navegador:

```bash
npm run web
```

Antes de iniciar, configure a URL do Firebase em `util/http.js`.

## O que dá para fazer no app

- Consultar todas as despesas cadastradas.
- Consultar somente as despesas dos últimos sete dias.
- Cadastrar uma despesa com descrição, valor e data.
- Validar os campos antes de salvar.
- Editar uma despesa existente.
- Apagar uma despesa.
- Visualizar a soma dos valores da lista.
- Atualizar a lista novamente quando ocorrer erro de conexão.

## Como os dados são guardados

O aplicativo usa o Firebase Realtime Database por HTTP (API REST):

- `GET /itens.json` — carrega as despesas quando o app é aberto.
- `POST /itens.json` — salva uma nova despesa.
- `PATCH /itens/ID.json` — atualiza uma despesa.
- `DELETE /itens/ID.json` — apaga uma despesa.

A tela apresenta um aviso enquanto os dados estão sendo carregados e uma mensagem de erro quando a comunicação com o Firebase falha.

## O que eu faria com mais tempo

- Adicionar filtros por mês e categoria.
- Criar gráficos com os gastos.
- Melhorar a segurança do banco com autenticação e regras por usuário.

## Autores

Livia Aparecida Ribeiro de Jesus — 4º ano, IFSP Campus Araraquara.
Cintia Carolina Gomes de Souza

Onde usei IA: apoio na adaptação do código, integração com Firebase e documentação do projeto.
