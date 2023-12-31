//VARIABLES
const user = document.getElementById('user');
const password = document.getElementById('password');

//FUNCTIONS

// Messages
function errorMessage(input, message) {
    const assessed = input.parentElement;
    assessed.className = 'assessed error';
    const small = assessed.querySelector('small');
    small.innerText = 'Error: ' + message;
}

function correctMessage(input) {
    const assessed = input.parentElement;
    assessed.className = 'assessed correct';
    const small = assessed.querySelector('small');
    small.innerText = 'Valid';
}

// Validators
function isValidEmail(email) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(String(email).toLowerCase());
}

function isValidPassword(password) {

    // (?=.* [0 - 9]) --> Contains a number
    // (?=.*[!@#$%^&*.,]) --> Contains a simbol
    // (?=.*[a-z]) --> Contains a lowercase
    // (?=.*[A-Z]) --> Contains a uppercase

    const passPattern = /^(?=.*\d)(?=.*[!@#$%^&*.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passPattern.test(password);
}




// Form Validatior
function validateForm(action) {

    // checks if the user exists and acts depending the action
    readDataIfExist(user.value, action);

    let isUserOK = false;
    let isPasswordOK = false;

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

    // Two fields are ok. Continue to send data to add new user
    if (isUserOK && isPasswordOK) {
        sendData(action);
    }


}


// Read data to search if user exists
function readDataIfExist(userName, action) {

    openCreateDb(function (db) {

        console.log("Verify if user exists");

        var tx = db.transaction(DB_STORE_NAME, "readonly");
        var store = tx.objectStore(DB_STORE_NAME);

        var myIndex = store.index("user");
        var req = myIndex.get(userName);

        req.onsuccess = function (e) {

            var cursor = this.result;

            if (action == 'add_user') {
                // If cursor exists, there is a registered user account.
                if (cursor) {
                    errorMessage(user, 'the user ' + user.value + ' already exists');
                }

            } else {
                if (!cursor) {
                    errorMessage(user, 'the user ' + user.value + ' not exists');
                }
            }
        };
        req.onerror = function (e) {
            console.error("Read Users: error reading data:", e.target.errorCode);
        };

        tx.oncomplete = function () {
            console.log("Read Users: tx completed");
            db.close();
            opened = false;
        };
    });
};



