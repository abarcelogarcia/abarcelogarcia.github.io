// ELEMENTS
// const imgProfile = document.getElementById("img-profile");
const regUsersTable = document.getElementById("registered_user_table");
let liveAlertDelete = document.getElementById("liveAlertDelete");
let liveAlertEdit = document.getElementById("liveAlertEdit");
let confirmDelBtn = document.getElementById("confirmDel");
let cancelDelBtn = document.getElementById("cancelDel");
let confirmEditBtn = document.getElementById("confirmEdit");
let cancelEditBtn = document.getElementById("cancelEdit");
let nameFigcaption = document.getElementById("user_name_figcaption");
let logedUserId;

// checks the login in the db and acts accordingly
function setUserAdmin(db) {

  var tx = db.transaction(DB_STORE_LOGIN, "readonly");
  var store = tx.objectStore(DB_STORE_LOGIN);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;

    if (!cursor || !cursor.value.admin) { // No data --> No login or Not admin --> Redirect to homepage

      window.location.href = "index.html";

    } else {

      // Is admin. Set avatar & theme and show users data. 

      if (cursor.value.theme == 1) {
        setDarkTheme();
      }

      document.getElementById("img-profile").src = cursor.value.avatar;
      nameFigcaption.innerText = cursor.value.name;
      logedUserId = cursor.value.id;
      readData();


    }
  }

  req.onerror = function (e) {
    console.error("Set User: error can not verify the user", this.error);
  };

  tx.oncomplete = function () {
    console.log("Set User: transaction completed");
    db.close();
    opened = false;
  };
}


// USERS DATA MANAGEMENT
// -------------------------------------------

// Display users data

function readData() {
  openCreateDb(function (db) {
    readUsers(db);
  });
}
// Read and build the table with the users
function readUsers(db) {

  var registered = document.getElementById('registered_user_table');

  registered.innerHTML = "";

  var tx = db.transaction(DB_STORE_NAME, "readonly");
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;


    // Table body
    if (cursor) {

      registered.innerHTML += '<div class="container registered-users m-auto my-4">' +
        '<div class="row align-items-center">' +
        '<div class="col" id="' + cursor.value.id + '">' +
        cursor.value.id +
        '</div>' +
        '<div class="col">' +
        '<input  type="checkbox" id="admin_check-' + cursor.value.id + '" ' + isChecked(cursor.value.admin) + ' disabled />' +
        '</div>' +
        '<div class="col-2">' +
        '<input class="input_reg" type="text" id="user-' + cursor.value.id + '"  name="user" aria-describedby="user" value="' + cursor.value.user + '" disabled/>' +
        '</div>' +
        '<div class="col-1">' +
        '<input class="input_reg" type="text" id="name-' + cursor.value.id + '"  name="name" aria-describedby="name" value="' + cursor.value.name + '" disabled/>' +
        '</div>' +
        '<div class="col-1">' +
        '<input class="input_reg" type="text" id="surname-' + cursor.value.id + '"  name="surname" aria-describedby="surname" value="' + cursor.value.surname + '" disabled/>' +
        '</div>' +
        '<div class="col-1">' +
        '<input class="input_reg " type="text" id="address-' + cursor.value.id + '"  name="address" aria-describedby="address" value="' + cursor.value.address + '" disabled/>' +
        '</div>' +
        '<div class="col-1 ">' +
        '<input class="input_reg text-center" type="text" id="age-' + cursor.value.id + '"  name="age" aria-describedby="age" value="' + cursor.value.age + '" disabled/>' +
        '</div>' +
        '<div class="col-1 text-center">' +
        '<img src=' + cursor.value.avatar + ' alt="avatar" style="width: 40px;" id="avatar-' + cursor.value.id + '" disabled />' +
        '</div>' +
        '<div class="col-1 text-center" id="edit-' + cursor.value.id + '">' +
        '<button class="btn btn-warning" id="edit-reg-' + cursor.value.id + '" action="edit-user" name="grid-btn" onclick="editFields(' + cursor.value.id + ')" ><i class="bi bi-pencil-square"></i> Edit</button>' +
        '</div>' +
        '<div class="col-1 text-center" id="del-' + cursor.value.id + '">' +
        '<button class="btn btn-danger" id="del-reg-' + cursor.value.id + '" name="grid-btn" onclick="confirmDel(' + cursor.value.id + ')" ><i class="bi bi-trash3"></i> Del</button>' +
        '</div>' +
        '<div class="col-1 text-center">' +
        '<button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#resetPass_modal" id="reset-pass-' + cursor.value.id + '" name="grid-btn" onclick="setUser_id(' + cursor.value.id + ')" ><i class="bi bi-recycle"></i> Pass</button>' +
        '</div>' +
        '</div>' +
        '<input  class="input_reg" type="password" id="password-' + cursor.value.id + '" value="' + cursor.value.password + '" hidden>' +
        '</div>';

      cursor.continue();
    }


  }

  req.onerror = function (e) {
    console.error("Read Users: error reading data:", e.target.errorCode);
  };

  tx.oncomplete = function () {
    console.log("Read Users: tx completed");
    db.close();
    opened = false;
  };


}

//  Check if is an admin and return checked if it is.
function isChecked(isAdmin) { if (isAdmin) { return "checked" } }

// Sends the user data to update the database.
function sendData(user_id) {

  openCreateDb(function (db) {

    console.log("update user values");
    updateUser(db, user_id);

  });
}

// Select the user from the database and if there is a password parameter, 
// execute the method to change it and if there is not, fill in the user fields.
function selectUserToEdit(user_id, password) {

  openCreateDb(function (db) {
    console.log(db);
    console.log("Id user: " + user_id);

    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);

    var req = store.get(parseInt(user_id));

    req.onsuccess = function (e) {
    
    var record = e.target.result;
      
    resetPassword(user_id, password, record);

      
    };

    req.onerror = function (e) {
      console.error("readUser: error reading data:", e.target.errorCode);
    };

    tx.oncomplete = function () {
      console.log("readUser: tx completed");
      db.close();
      opened = false;
    };

  });
}

// Enable user fields and another tasks
function editFields(user_id) {

  document.getElementById("user-" + user_id).disabled = false;
  document.getElementById("name-" + user_id).disabled = false;
  document.getElementById("surname-" + user_id).disabled = false;
  document.getElementById("address-" + user_id).disabled = false;
  document.getElementById("age-" + user_id).disabled = false;
  document.getElementById("admin_check-" + user_id).disabled = false;
  document.getElementById("avatar-" + user_id).setAttribute("data-bs-toggle", "modal");
  document.getElementById("avatar-" + user_id).setAttribute("data-bs-target", "#avatar_modal");
  document.getElementById("del-reg-" + user_id).textContent = "Cancel";
  document.getElementById("del-reg-" + user_id).setAttribute("onclick", "cancelar(" + user_id + ")");
  document.getElementById("edit-reg-" + user_id).textContent = "Save";
  document.getElementById("edit-reg-" + user_id).setAttribute("onclick", "confirmEdit(" + user_id + ")");

  // Disable all other buttons 
  let buttonsAll = document.getElementsByName("grid-btn");
  for (let i = 0; i < buttonsAll.length; i++) {
    if ((buttonsAll[i].textContent != 'Save') && (buttonsAll[i].textContent != 'Cancel')) {
      buttonsAll[i].disabled = true;
    }
  }


  // Modal select button to save avatar
  document.getElementById("save_avatar").addEventListener('click', function () {
    document.getElementById("avatar-" + user_id).src = getAvatarPath();

  });

}

// Update a user's data in the database.
function updateUser(db, user_id) {
  var user = document.getElementById("user-" + user_id);
  var password = document.getElementById("password-" + user_id).value;
  var name = document.getElementById("name-" + user_id);
  var surname = document.getElementById("surname-" + user_id);
  var address = document.getElementById("address-" + user_id);
  var age = document.getElementById("age-" + user_id);
  var admin = document.getElementById("admin_check-" + user_id).checked;
  var avatar = document.getElementById("avatar-" + user_id).src;
  var obj = { id: parseInt(user_id), user: user.value, password: password, name: name.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar, admin: admin };

  var tx = db.transaction(DB_STORE_NAME, "readwrite");
  var store = tx.objectStore(DB_STORE_NAME);

  //Updates data in our ObjectStore
  req = store.put(obj);

  req.onsuccess = function (e) {
    console.log("Data successfully updated");

    //Reads data and displays users
    readData();
    uncheckAvatar();
  };

  req.onerror = function (e) {
    console.error("editUser: Error updating data", this.error);
  };

  tx.oncomplete = function () {
    console.log("editUser: tx completed");
    db.close();
    opened = false;
  };
}

// Reverses the editing of user data
function cancelar(user_id) {


  document.getElementById("user-" + user_id).disabled = true;
  document.getElementById("name-" + user_id).disabled = true;
  document.getElementById("surname-" + user_id).disabled = true;
  document.getElementById("address-" + user_id).disabled = true;
  document.getElementById("age-" + user_id).disabled = true;
  document.getElementById("del-reg-" + user_id).value = "Delete";
  document.getElementById("del-reg-" + user_id).setAttribute("onclick", "deleteUser(' + cursor.value.id + ')");
  document.getElementById("avatar-" + user_id).removeAttribute("data-bs-toggle");
  document.getElementById("avatar-" + user_id).removeAttribute("data-bs-target");

  readData();

}

// Confirmation user delete
function confirmDel(user_id) {

  // Show alert
  liveAlertDelete.hidden = false;

  confirmDelBtn.setAttribute("onclick", "deleteUser(" + user_id + ")");

  let alertBox = document.createElement("div");
  alertBox.id = "alertBox";
  document.getElementById("del-" + user_id + "").parentElement.appendChild(alertBox);
  document.getElementById("alertBox").appendChild(liveAlertDelete);

  // Disable all buttons 
  let buttonsAll = document.getElementsByName("grid-btn");
  for (let i = 0; i < buttonsAll.length; i++) {
    buttonsAll[i].disabled = true;
  }


  // Cancel button -> Delete Alert
  cancelDelBtn.addEventListener("click", function () {

    alertBox.remove();

    // Enable all buttons 
    let buttonsAll = document.getElementsByName("grid-btn");
    for (let i = 0; i < buttonsAll.length; i++) {
      buttonsAll[i].disabled = false;
    }


  })
}

// Confirmation user save editing
function confirmEdit(user_id) {

  // Show alert
  liveAlertEdit.hidden = false;

  confirmEditBtn.setAttribute("onclick", "sendData(" + user_id + ")");

  let alertBox = document.createElement("div");
  alertBox.id = "alertBox";
  document.getElementById("edit-" + user_id + "").parentElement.appendChild(alertBox);
  document.getElementById("alertBox").appendChild(liveAlertEdit);

  // Disable all buttons 
  let buttonsAll = document.getElementsByName("grid-btn");
  for (let i = 0; i < buttonsAll.length; i++) {
    buttonsAll[i].disabled = true;
  }


  // Cancel button -> Delete Alert
  cancelEditBtn.addEventListener("click", function () {

    alertBox.remove();

    // Enable all buttons 
    let buttonsAll = document.getElementsByName("grid-btn");
    for (let i = 0; i < buttonsAll.length; i++) {
      buttonsAll[i].disabled = false;
    }

    // Cancel user edition row
    cancelar(user_id);


  })
}

// Delete user
function deleteUser(user_id) {

  openCreateDb(function (db) {
    console.log(user_id);
    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);

    //Delete data in our ObjectStore
    var req = store.delete(parseInt(user_id));

    req.onsuccess = function (e) {

      console.log("deleteUser: Data successfully removed: " + user_id);

      //Operation to do after deleting a record
      if (user_id != logedUserId) {


        readData();

      } else {

        setLogout();

      }

      document.getElementById("liveAlertDelete").hidden = true;
    };

    req.onerror = function (e) {
      console.error("deleteUser: error removing data:", e.target.errorCode);
    };

    tx.oncomplete = function () {
      console.log("deleteUser: tx completed");
      db.close();
      opened = false;
    };
  });


}



// RESET PASSWORD
// -------------------------------------------

// Encrypt and save the new password in the database.
function resetPassword(user_id, password, record) {

  openCreateDb(function (db) {

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);
    var newPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);

    var obj = { id: parseInt(user_id), user: record.user, password: newPassword, name: record.name, surname: record.surname, address: record.address, avatar: record.avatar, age: record.age, admin: record.admin };

    var req = store.put(obj);

    req.onsuccess = function (e) {

      console.log("Reset Password: Password successfully reseted: ");

      //Operation to do after deleting a record
      readData();
    };

    req.onerror = function (e) {
      console.error("Reset Password: error reseting password:", e.target.errorCode);
    };

    tx.oncomplete = function () {
      console.log("Reset Password: tx completed");
      db.close();
      opened = false;
    };


  });
}

// set user_id on reset password form button
function setUser_id(user_id) {

  document.getElementById("savePass-btn").setAttribute("user_id", user_id);
  document.getElementById("generatePass-btn").setAttribute("onclick", "generatePassword(8, " + user_id + ")");

}



// BACKUPS MANAGEMENT
// -------------------------------------------

// BACKUP

function readBK() {
  openCreateDb(function (db) {
    UsersBK(db);
  });
}

function UsersBK(db) {


  var tx = db.transaction(DB_STORE_NAME, "readonly");
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.getAll();

  req.onsuccess = function (e) {
    backup = this.result;

    saveBackup({ filename: "UsersBK.json" });

    if (backup) {
      usersBackup = JSON.stringify(backup);
      console.log(usersBackup);
    }
  }

  req.onerror = function (e) {
    console.error("BACKUPS: error reading data:", e.target.errorCode);
  };

  tx.oncomplete = function () {
    console.log("BACKUPS: tx completed");
    db.close();
    opened = false;
  };
}

function saveBackup(args) {

  var data, filename, link;

  var csv = 'data:text/json;charset=utf-8,' + JSON.stringify(backup);

  filename = args.filename || 'export.csv';

  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}


// RESTORE
function sendBK() {

  openCreateDb(function (db) {
    usersRestore()
  });
}

function usersRestore() {

  fetch('backups/UsersBK.json')
    .then((response) => response.json())
    .then((usersBK) => {

      var tx = db.transaction(DB_STORE_NAME, "readwrite");
      var store = tx.objectStore(DB_STORE_NAME);

      store.clear();

      try {

        for (i = 0; i < usersBK.length; i++) {
          req = store.put(usersBK[i]);
          console.log("ImportUser: User data insertion successfully done. Name: " + usersBK[i].name);
        }

      } catch (e) {
        console.log("Catch");
      }


      req.onsuccess = function (e) {
        console.log("imported all data successfully");
      };

      req.onerror = function (e) {
        console.error("Import users: error creating data", this.error);
      };

      tx.oncomplete = function () {
        console.log("Import users: transaction completed");
        db.close();
        opened = false;
        setLogout();

      };
    });
}


// verify the user's identity when loading the page
window.addEventListener('load', () => {
  verifyUser('admin');


});


