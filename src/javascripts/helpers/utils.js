import firebase from 'firebase/app';
import 'firebase/auth';

const printToDom = (divId, textToPrint) => {
  $(`#${divId}`).html(textToPrint);
};

// Get UID function
const getMyUid = () => {
  const myUid = firebase.auth().currentUser.uid;
  return myUid;
};

export default { printToDom, getMyUid };
