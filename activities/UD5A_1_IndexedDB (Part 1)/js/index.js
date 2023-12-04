function sendData(action) {

  openCreateDb(function (db) {

    if (action == 'add_user') {

      addUser(db);

    } else if (action == 'login') {

      login(db);

    }

  });
}

// Write the new user register into the db
function addUser(db) {
  var user = document.getElementById("user");
  var password = document.getElementById("password");
  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var address = document.getElementById("address");
  var age = document.getElementById("age");
  var avatar = getAvatarPath();
  var admin = document.getElementById("admin_check");
  var obj = { user: user.value, password: password.value, name: name.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar, admin: admin.checked };


  // Start a new transaction.
  var tx = db.transaction(DB_STORE_NAME, "readwrite");
  var store = tx.objectStore(DB_STORE_NAME);

  try {
    // Inserts data in our ObjectStore
    req = store.add(obj);
  } catch (e) {
    console.log("Catch");
  }


  req.onsuccess = function (e) {
    console.log("addUser: Data insertion successfully done. Id: " + e.target.result);

    // Operations we want to do after inserting data
    login(db);


  };
  req.onerror = function (e) {
    console.error("addUser: error creating data", this.error);
  };

  tx.oncomplete = function () {
    console.log("addUser: transaction completed");
  };
}

function login(db) {

  const user = document.getElementById("user");
  const password = document.getElementById("password");

  var tx = db.transaction(DB_STORE_NAME, "readonly");
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;

    if (cursor) {

      if ((user.value == cursor.value.user) && (password.value == cursor.value.password)) {


        // Store the login into db in login storage
        setLogin(cursor.value.user, cursor.value.admin, cursor.value.avatar);

        // redirects depending on role
        if (cursor.value.admin == true) {

          console.log("Admin logged in");
          window.location.href = "index_admin.html";


        } else {

          console.log("User logged in");
          window.location.href = "index.html";

        }

        return;

      } else if ((user.value == cursor.value.user) && (password.value != cursor.value.password)) {

        errorMessage(document.getElementById('password'), 'incorrect password. Caps lock active?')
        tx.oncomplete = function () {
          db.close();
          opened = false;
          return;

        }

      }
      cursor.continue();

    }
  }
  errorMessage(document.getElementById('user'), 'User not registered');
  tx.oncomplete = function () {
    db.close();
    opened = false;


  };


}

function setLogin(user, admin, avatar) {

  var obj = { logged: 1, user: user, admin: admin, avatar: avatar };

  console.log(obj);

  var tx = db.transaction(DB_STORE_LOGIN, "readwrite");
  var store = tx.objectStore(DB_STORE_LOGIN);

  try {
    // Inserts login in login ObjectStore
    req = store.add(obj);
  } catch (e) {
    console.log("Catch");
  }

  req.onsuccess = function (e) {
    console.log("Insert Login: Data insertion successfully done. Session_Id: " + e.target.result);

  };
  req.onerror = function (e) {
    console.error("Insert Login: error creating data", this.error);
  };

  //After transaction is completed we close de database
  tx.oncomplete = function () {
    console.log("Insert Login: transaction completed");
    db.close();
    opened = false;
  };



}





window.addEventListener('load', () => {
  verifyUser('');
});

// Set the ACTION attribute depending on whether to log in or register. Click on collapse button to swap.
document.getElementById("user_collapse_data").addEventListener("click", function () {

  const saveButton = document.getElementById("add_user");
  const loginTitle = document.getElementById("login_title");

  if (saveButton.textContent == 'Submit') {

    saveButton.textContent = 'Save & submit';
    saveButton.setAttribute('action', 'add_user');
    loginTitle.innerHTML = 'Register';
    
  } else {
    
    saveButton.textContent = 'Submit';
    saveButton.setAttribute('action', 'login');
    loginTitle.innerHTML = 'Login';
    


  }



});


