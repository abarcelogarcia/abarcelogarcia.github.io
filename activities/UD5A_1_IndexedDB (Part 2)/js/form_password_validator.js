
//VARIABLES
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');

    


//FUNCTIONS

// Messages
function errorMessage(input, message) {
    const assessed = input.parentElement;
    console.log(assessed);

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



// Form Validator
function validateFormPass(user_id) {
   
    let isPassOK = false;
    let areEquals = false;

    console.log(pass1.value);
    console.log(pass2.value);
    console.log("user_id: "+user_id);


    document.getElementById("validatePass-btn").name="prueba";

    // Validate Passowrd1
    if (pass1.value === '') {

        errorMessage(pass1, 'field requiered');

    } else if (!isValidPassword(pass1.value)) {

        errorMessage(pass1, 'Invalid password. It must be at least 8 digits long and must include at least one uppercase letter, one lowercase letter and one symbol.');

    } else {
        correctMessage(pass1);
        isPassOK = true;
    }


    if (isPassOK) {
        // Validate are equals
        if (pass1.value != pass2.value) {
            errorMessage(pass1, 'passwords must be identical');
            errorMessage(pass2, 'passwords must be identical');
        } else {
            correctMessage(pass1);
            correctMessage(pass2);
            areEquals = true;
        }

        // Two fields are ok. Continue to send data to reset the password
        if (isPassOK && areEquals) {
            selectProfileToEdit(user_id, pass1.value);

        }
    }


}
let iterations = 0;

function generatePassword(length, user_id) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.,";
    const passPattern = /^(?=.*\d)(?=.*[!@#$%^&*.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let newPassword = "";
    
    while (!passPattern.test(newPassword)) {

        newPassword="";
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            newPassword += charset.charAt(randomIndex);
        }

        iterations++;
    }

    // prepare buttons to execute changing password


    document.getElementById("newPass").value = newPassword;
    document.getElementById("savePass-btn").disabled = false;
    document.getElementById("savePass-btn").setAttribute("onclick", "selectUserToEdit(" + user_id + ", '" + newPassword + "')");
    

  }


  function saveGeneredPass(params) {
    
  }

  
//   const GenPasswordCreated = generatePassword(8);
//   console.log(GenPasswordCreated);
//   console.log(iternaciones);


