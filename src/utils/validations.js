const alphaRegex = /^[a-z ,.'-]+$/i;
const alphaNumericRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

function validName(name) {
  return name.trim() !== '' && alphaRegex.test(name);
}

function validUsername(username){
  return username.trim() !== '' && alphaNumericRegex.test(username);
}

export {
  validName,
  validUsername,
};