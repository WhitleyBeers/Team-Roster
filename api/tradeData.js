import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createTrade = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trades.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTrade = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trades/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllTrades = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trades.json?orderBy="uid_request"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const openTrades = Object.values(data).filter((item) => item.statusOpen);
      resolve(openTrades);
    })
    .catch(reject);
});

const tradeResponse = (firebaseKey, payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/trades/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  createTrade, updateTrade, getAllTrades, tradeResponse,
};
