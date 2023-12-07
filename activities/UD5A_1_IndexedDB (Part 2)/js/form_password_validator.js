//VARIABLES
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');



//FUNCTIONS

// Messages
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


function isValidPassword(password) {

    // (?=.* [0 - 9]) --> Contains a number
    // (?=.*[!@#$%^&*]) --> Contains a simbol
    // (?=.*[a-z]) --> Contains a lowercase
    // (?=.*[A-Z]) --> Contains a uppercase

    const passPattern = /^(?=.*\d)(?=.*[!@#$%^&*.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passPattern.test(password);
}



// Form Validatior
function validateFormPass() {

    let isPassOK = false;
    // let isPass2OK = false;
    let areEquals = false;

    
    // Validate Passowrd1
    if (pass1.value === '') {

        errorMessage(pass1, 'field requiered');

    } else if (!isValidPassword(pass1.value)) {

        errorMessage(pass1, 'Invalid password. It must be at least 8 digits long and must include at least one uppercase letter, one lowercase letter and one symbol.');
    
    } else {
        correctMessage(pass1);
        isPassOK = true;
    }

    // // Validate Passowrd2
    // if (pass2.value === '') {
    //     errorMessage(pass2, 'field requiered');
    // } else if (!isValidPassword(pass2.value)) {
    //     errorMessage(pass2, 'Invalid password. It must be at least 8 digits long and must include at least one uppercase letter, one lowercase letter and one symbol.');
    // } else {
    //     correctMessage(pass2);
    //     isPass2OK = true;
    // }

    // Validate are equals
    if (pass1.value != pass2.value ) {
        errorMessage(pass1, 'passwords must be identical');
        errorMessage(pass2, 'passwords must be identical');
    } else {
        correctMessage(pass1);
        correctMessage(pass2);
        areEquals = true;
    }

    // Two fields are ok. Continue to send data to add new user
    if (isPassOK &&  areEquals) {
        sendData(action);
    }


}


