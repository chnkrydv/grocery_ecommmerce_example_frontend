function getToken() {
  var nameEQ = "token=";
  var ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setToken(value) {
  const date = new Date();
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

  const expires = "; expires=" + date.toUTCString();
  document.cookie = "token=" + (value || "") + expires + "; path=/";
}

function eraseToken() {
  document.cookie = 'token=; Max-Age=-99999999;';
}

export {
  getToken,
  setToken,
  eraseToken,
};