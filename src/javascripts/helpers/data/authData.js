import firebase from 'firebase/app';
import 'firebase/auth';

import boards from '../../components/boards/boards';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-btn');
const homeDiv = $('#home');
const singleViewDiv = $('#single-view');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      singleViewDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boards.buildBoards();
      boards.boardEvents();
    } else {
      // person is not logged in
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      singleViewDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
