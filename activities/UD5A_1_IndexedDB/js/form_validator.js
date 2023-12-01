//Variables
const user = document.getElementById('user');
const password = document.getElementById('password');
const age = document.getElementById('age');

//Functions
function errorMessage(input, message) {
    const assessed = input.parentElement;
    assessed.className = 'mb-3 assessed error';
    const small = assessed.querySelector('small');
    small.innerText = 'Error: ' + message;
}

function correctMessage(input) {
    const assessed = input.parentElement;
    assessed.className = 'mb-3 assessed correct';
}

function isValidEmail(email) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(String(email).toLowerCase());
}

function isValidPassword(password) {

    // (?=.* [0 - 9]) --> Contains a number
    // (?=.*[!@#$%^&*]) --> Contains a simbol
    // (?=.*[a-z]) --> Contains a lowercase
    // (?=.*[A-Z]) --> Contains a uppercase

    const passPattern = /^(?=.*\d)(?=.*[!@#$%^&*.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passPattern.test(password);
}

function validateForm() {

    let isUserOK = false;
    let isPasswordOK = false;
    // let isAgeOk = false;

    // Validate email
    if (user.value === '') {
        errorMessage(user, 'field requiered');
    } else if (!isValidEmail(user.value)) {
        errorMessage(user, 'invalid email address. Please, use a valid format for exemple "name@domain.com"');
    } else {
        correctMessage(user);
        isUserOK = true
    }


    // Validate Passowrd
    if (password.value === '') {
        errorMessage(password, 'field requiered');
    } else if (!isValidPassword(password.value)) {
        errorMessage(password, 'Invalid password. It must be at least 8 digits long and must include at least one uppercase letter, one lowercase letter and one symbol.');
    } else {
        correctMessage(password);
        isPasswordOK = true;
    }

    // Valide age
    // if (age.value < 18) {
    //     errorMessage(age, 'the minimum age for registration is 18 years old');
    //     console.log(age.value);
    // } else {
    //     correctMessage(password);
    //     isAgeOk = true;
    // }

    if (isUserOK && isPasswordOK) {

        console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

        sendData();
    }


}

//Event Listeners
// form.addEventListener('submit', function (e) {
//     e.preventDefault();//evita que realice el evento que tenga por defecto

//     if (user.value === '') {
//         errorMessage(user, 'is requiered');
//     } else {
//         correctMessage(user);
//     }

//     if (email.value === '') {
//         errorMessage(email, 'is requiered');
//     } else if (!isValidEmail(email.value)) {
//         errorMessage(email, 'not valid');
//     } else {
//         correctMessage(email);
//     }

//     if (password.value === '') {
//         errorMessage(password, 'is requiered');
//     } else {
//         correctMessage(password);
//     }

//     if (password.value === '') {
//         errorMessage(password, 'is requiered');
//     } else {
//         correctMessage(password);
//     }

//     if (password.value === '') {
//         errorMessage(password, 'is requiered');
//     } else if (!isValidPassword(email.value)) {
//         errorMessage(password, 'Invalid password. It must be at least 8 digits long and must include at least one uppercase letter, one lowercase letter and one symbol.');
//     } else {
//         correctMessage(password);
//     }

// });