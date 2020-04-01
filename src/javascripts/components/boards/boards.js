import firebase from 'firebase/app';
import 'firebase/auth';

// import boardData from '../../helpers/data/boardData';

// import utils from '../../helpers/utils';

const getMyUid = () => {
  const myUid = firebase.auth().currentUser.uid;
  console.error(myUid);
};

export default { getMyUid };
