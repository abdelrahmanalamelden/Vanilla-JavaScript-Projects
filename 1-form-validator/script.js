// Initialize Classes
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//FUNCTIONS
//1-Show Error Message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//2-Show Success outLine
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// 3- Validation For Email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

//4-Check Required
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is Required`);
    } else if (input.id === 'email' && !isValidEmail(input.value)) {
      showError(input, `${getFieldName(input)} is not Valid`);
    } else {
      showSuccess(input);
    }
  });
}

//5-Get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//6- Check Length
function checkLength(input, min, max) {
  if (input.value.length < min && input.value !== '') {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characteres`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characteres`
    );
  } else if (input.value !== '') {
    showSuccess(input);
  }
}

//7-Check Passwords Match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value && input2.value !== '') {
    showError(input2, `Passwords dosn't match`);
  }
}
//Event Listner
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkPasswordsMatch(password, password2);
});
