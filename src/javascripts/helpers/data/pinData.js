import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const allPins = response.data;
      const pins = [];
      if (allPins) {
        Object.keys(allPins).forEach((pinId) => {
          allPins[pinId].id = pinId;
          pins.push(allPins[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const removePinsWithBoard = (boardId) => {
  getPins()
    .then((pins) => {
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          deletePin(pin.id);
        }
      });
    })
    .catch((err) => console.error('remove pins with boards failed', err));
};

export default {
  getPins,
  deletePin,
  removePinsWithBoard,
  addPin,
};
