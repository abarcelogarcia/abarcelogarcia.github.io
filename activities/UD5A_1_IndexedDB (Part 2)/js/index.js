let nameFigcaption = document.getElementById("user_name_figcaption");


// checks the login in the db and acts accordingly
function setUser(db) {

  var tx = db.transaction(DB_STORE_LOGIN, "readonly");
  var store = tx.objectStore(DB_STORE_LOGIN);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;

    if (cursor) { // If there is not login data, return (we are in home page)

      if (cursor.value.theme == 1) {
        document.getElementById("theme").href = "css/bootstrap_custom_dark.css";
      }

      // If it is admin, go to admin page
      if (cursor.value.admin == true) {

        window.location.href = "index_admin.html";


        // If it is user (not admin), setup the avatar and logout button.
      } else {

        document.getElementById("img-profile").src = cursor.value.avatar;
        document.getElementById("img-profile").hidden = false;
        // document.getElementById("link_profile").setAttribute("href", "index_profile.html");
        document.getElementById("btn_login").removeAttribute("data-bs-toggle");
        document.getElementById("btn_login").removeAttribute("data-bs-target");
        document.getElementById("btn_login").setAttribute("onclick", "setLogout()");
        document.getElementById("btn_login").textContent = "Logout";
        nameFigcaption.innerText = cursor.value.name;

      }

    }


  }
  req.onerror = function (e) {
    console.error("Set User error: can not verify the user", this.error);
  };

  tx.oncomplete = function () {
    console.log("Set User: transaction completed");
    db.close();
    opened = false;
  };

}

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
  var password = encryptPassword(document.getElementById("password").value);


  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var address = document.getElementById("address");
  var age = document.getElementById("age");
  var avatar = getAvatarPath();
  var admin = document.getElementById("admin_check");
  var obj = { user: user.value, password: password, name: name.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar, admin: admin.checked, theme: 0 };


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

  let user = document.getElementById("user");
  let password = document.getElementById("password");

  var tx = db.transaction(DB_STORE_NAME, "readonly");
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;

    if (cursor) {

      const storedPassword = decryptPassword(cursor.value.password.ciphertext, cursor.value.password.key);

      if ((user.value == cursor.value.user) && (password.value == storedPassword)) {


        // Store the login into db in login storage
        setLogin(cursor.value.id, cursor.value.user, cursor.value.name, cursor.value.admin, cursor.value.avatar, cursor.value.theme);

        // redirects depending on role
        if (cursor.value.admin == true) {

          console.log("Admin logged in");
          window.location.href = "index_admin.html";


        } else {

          console.log("User logged in");
          window.location.href = "index.html";

        }


      } else if ((user.value == cursor.value.user) && (password.value != storedPassword)) {

        errorMessage(document.getElementById('password'), 'incorrect password. Caps lock active?')
        tx.oncomplete = function () {
          db.close();
          opened = false;

        }

      }
      cursor.continue();

    }
  }



}

function setLogin(user_id, user, name, admin, avatar, theme) {

  var obj = { id: user_id, user: user, name: name, admin: admin, avatar: avatar, theme: theme };

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

// LISTENNERS
window.addEventListener('load', () => {
  verifyUser('user');
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







