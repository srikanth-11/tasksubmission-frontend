let token = localStorage.getItem('token')
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

if (token) {
  var useremail = parseJwt(token).email
  var username = parseJwt(token).username
}

const apiUrl = 'https://sri-tasksubmission.herokuapp.com';

export { apiUrl, useremail, username, token };