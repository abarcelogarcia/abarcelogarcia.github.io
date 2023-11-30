var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "bloggin";
const DB_STORE_NAME = 'users';
const DB_STORE_LOGIN = 'login';
const DB_VERSION = 1;
var db;
var opened = false;



/**
 * openCreateDb
 * opens and/or creates an IndexedDB database
 */
function openCreateDb(onDbCompleted) {

  if (opened) {
    db.close();
    opened = false;
  }
  //We could open changing version ..open(database, 3)
  var req = indexedDB.open(database, DB_VERSION);

  //This is how we pass the DB instance to our var
  req.onsuccess = function (e) {
    db = this.result; // Or event.target.result
    console.log("openCreateDb: Databased opened " + db);
    opened = true;



    //The function passed by parameter is called after creating/opening database
    onDbCompleted(db);

  };

  // Very important event fired when
  // 1. ObjectStore first time creation
  // 2. Version change
  req.onupgradeneeded = function () {

    //Value of previous db instance is lost. We get it back using the event
    db = req.result; //Or this.result

    console.log("openCreateDb: upgrade needed " + db);
    var store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true });
    db.createObjectStore(DB_STORE_LOGIN, { keyPath: "session_id", autoIncrement: true });
    console.log("openCreateDb: Object store created");

    store.createIndex('user', 'user', { unique: true });
    console.log("openCreateDb: Index created on user");
    store.createIndex('password', 'password', { unique: false });
    console.log("openCreateDb: Index created on password");
    store.createIndex('name', 'name', { unique: false });
    console.log("openCreateDb: Index created on name");
    store.createIndex('surname', 'surname', { unique: false });
    console.log("openCreateDb: Index created on surname");
    store.createIndex('address', 'address', { unique: false });
    console.log("openCreateDb: Index created on address");
    store.createIndex('age', 'age', { unique: false });
    console.log("openCreateDb: Index created on age");
    store.createIndex('avatar', 'avatar', { unique: false });
    console.log("openCreateDb: Index created on avatar");
  };

  req.onerror = function (e) {
    console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
  };
}


function sendData(action, user_id) {


  openCreateDb(function (db) {

    if (action == 'add_user') {

      addUser(db, user_id);

    } else if (action == 'login') {

      login(db);

    } else {

      console.log("change user values");
      updateUser(db, user_id);

    }

  });
}

function readData() {
  openCreateDb(function (db) {
    readUsers(db);
  });
}

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


  // Start a new transaction in readwrite mode. We can use readonly also
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
    // readData();
    // clearFormInputs();

    login(db);


  };
  req.onerror = function (e) {
    console.error("addUser: error creating data", this.error);
  };

  //After transaction is completed we close de database
  tx.oncomplete = function () {
    console.log("addUser: transaction completed");
    db.close();
    opened = false;
  };
}

function login(db) {

  var user = document.getElementById("user");
  var password = document.getElementById("password");

  var tx = db.transaction(DB_STORE_NAME, "readonly");
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;

    if (cursor) {

      if ((user.value == cursor.value.user) && (password.value == cursor.value.password) && (cursor.value.admin == true)) {

        openCreateDb(function (db) {
          setLogin(cursor.value.user, true);
        });

        alert('Welcome ' + user.value);
        window.location.href = "index_admin.html";
        return;

      } else if ((user.value == cursor.value.user) && (password.value != cursor.value.password)) {

        alert('Incorrect password!');
        window.location.href = "index.html";
        return;

      } else if ((user.value == cursor.value.user) && (password.value == cursor.value.password) && (cursor.value.admin != true)) {

        openCreateDb(function (db) {
          setLogin(cursor.value.user, false);
        });
        alert('Welcome ' + user.value);
        window.location.href = "index.html";
        return;

      }
      cursor.continue();
    }
  }
}

function setLogin(user, admin) {

  var obj = { logged: 1, user: user, admin: admin };

  console.log(obj);

  var tx = db.transaction(DB_STORE_LOGIN, "readwrite");
  var store = tx.objectStore(DB_STORE_LOGIN);

  try {
    // Inserts data in our ObjectStore
    req = store.add(obj);
  } catch (e) {
    console.log("Catch");
  }

  req.onsuccess = function (e) {
    console.log("InsertLogin: Data insertion successfully done. Session_Id: " + e.target.result);




  };
  req.onerror = function (e) {
    console.error("addUser: error creating data", this.error);
  };

  //After transaction is completed we close de database
  tx.oncomplete = function () {
    console.log("addUser: transaction completed");
    db.close();
    opened = false;
  };



}

function setLogout() {

  openCreateDb(function (db) {
    var tx = db.transaction(DB_STORE_LOGIN, "readwrite");
    var store = tx.objectStore(DB_STORE_LOGIN);

    //Delete data in our ObjectStore
    var req = store.clear();

    req.onsuccess = function (e) {

      console.log("Delete Login: Session_id successfully removed");
      window.location.href = "index.html";

    };

    req.onerror = function (e) {
      console.error("Delete Login: error deleting Session_id");
    };

    tx.oncomplete = function () {
      console.log("Delete Login: tx complete");
      db.close();
      opened = false;
    };
  });



}

function readUsers(db) {

  var registered = document.getElementById('registered_user_table');

  registered.innerHTML = '<div class="container registered-users-cab m-auto mt-4">' +
    '<div class="row align-items-center">' +
    '<div class="col">' +
    'ID' +
    '</div>' +
    '<div class="col">' +
    'AD' +
    '</div>' +
    '<div class="col-2">' +
    'User' +
    '</div>' +
    '<div class="col-1">' +
    'Name' +
    '</div>' +
    '<div class="col-2">' +
    'Surname' +
    '</div>' +
    '<div class="col-2">' +
    'Address' +
    '</div>' +
    '<div class="col-1 text-center">' +
    'Age' +
    '</div>' +
    '<div class="col-1 text-center">' +
    '' +
    '</div>' +
    '<div class="col-1 text-center">' +
    '' +
    '</div>' +
    '<div class="col-1 text-center">' +
    '' +
    '</div>' +
    '</div>' +
    '</div>';

  var tx = db.transaction(DB_STORE_NAME, "readonly");
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;

    if (cursor) {


      registered.innerHTML += '<div class="container registered-users m-auto my-4">' +
        '<div class="row align-items-center">' +
        '<div class="col" id="' + cursor.value.id + '">' +
        cursor.value.id +
        '</div>' +
        '<div class="col">' +
        '<input  type="checkbox" id="admin_check-' + cursor.value.id + '" disabled>' +
        '</div>' +
        '<div class="col-2">' +
        '<input class="input_reg" type="text" id="user-' + cursor.value.id + '"  name="user" aria-describedby="user" value="' + cursor.value.user + '" disabled/>' +
        '</div>' +
        '<div class="col-1">' +
        '<input class="input_reg" type="text" id="name-' + cursor.value.id + '"  name="name" aria-describedby="name" value="' + cursor.value.name + '" disabled/>' +
        '</div>' +
        '<div class="col-2">' +
        '<input class="input_reg" type="text" id="surname-' + cursor.value.id + '"  name="surname" aria-describedby="surname" value="' + cursor.value.surname + '" disabled/>' +
        '</div>' +
        '<div class="col-2">' +
        '<input class="input_reg " type="text" id="address-' + cursor.value.id + '"  name="address" aria-describedby="address" value="' + cursor.value.address + '" disabled/>' +
        '</div>' +
        '<div class="col-1 text-center">' +
        '<input class="input_reg" type="text" id="age-' + cursor.value.id + '"  name="age" aria-describedby="age" value="' + cursor.value.age + '" disabled/>' +
        '</div>' +
        '<div class="col-1 text-center">' +
        '<img src=' + cursor.value.avatar + ' alt="avatar" style="width: 40px;" id="avatar-' + cursor.value.id + '" disabled />' +
        '</div>' +
        '<div class="col-1 text-center">' +
        '<input type="button" class="btn btn-warning" value="Edit"  id="edit-reg-' + cursor.value.id + '" action="edit-user" onclick="selectUserToEdit(' + cursor.value.id + ')">' +
        '</div>' +
        '<div class="col-1 text-center">' +
        '<input type="button" class="btn btn-danger" id="del-reg-' + cursor.value.id + '" value="Delete" onclick="deleteUser(' + cursor.value.id + ')" >' +
        '</div>' +
        '</div>' +
        '<input  type="checkbox" id="password-' + cursor.value.password + '" hidden>' +
        '</div>';

      //  Check if is an admin 
      if (cursor.value.admin == true) {
        document.getElementById("admin_check-" + cursor.value.id).checked = true;
      }

      cursor.continue();


    }


  }


}

function deleteUser(user_id) {

  if (confirm("Are you sure you want to delete the user?") == true) {



    openCreateDb(function (db) {
      console.log(user_id);
      var tx = db.transaction(DB_STORE_NAME, "readwrite");
      var store = tx.objectStore(DB_STORE_NAME);

      //Delete data in our ObjectStore
      var req = store.delete(parseInt(user_id));

      req.onsuccess = function (e) {

        console.log("deleteUser: Data successfully removed: " + user_id);

        //Operation to do after deleting a record
        readData();
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


}

function selectUserToEdit(user_id) {
  console.log("readUser");

  //Both options work
  //var button_id = e.target.id;
  //var user_id = document.getElementById(button_id).getAttribute("user_id");
  // var user_id = e.target.getAttribute("user_id");

  openCreateDb(function (db) {
    console.log(db);
    console.log("Id user: " + user_id);

    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);

    // Reads one record from our ObjectStore
    var req = store.get(parseInt(user_id));

    req.onsuccess = function (e) {
      var record = e.target.result;
      console.log(record);

      //Operations to do after reading a user
      updateFormInputsToEdit(record);
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

function updateFormInputsToEdit(record) {

  document.getElementById("user-" + record.id).disabled = false;
  document.getElementById("user-" + record.id).value = record.user;
  document.getElementById("password-" + record.id).value = record.password;
  document.getElementById("name-" + record.id).disabled = false;
  document.getElementById("name-" + record.id).value = record.name;
  document.getElementById("surname-" + record.id).disabled = false;
  document.getElementById("surname-" + record.id).value = record.surname;
  document.getElementById("address-" + record.id).disabled = false;
  document.getElementById("address-" + record.id).value = record.address;
  document.getElementById("age-" + record.id).disabled = false;
  document.getElementById("age-" + record.id).value = record.age;
  document.getElementById("admin_check-" + record.id).disabled = false;
  document.getElementById("avatar-" + record.id).setAttribute("data-bs-toggle", "modal");
  document.getElementById("avatar-" + record.id).setAttribute("data-bs-target", "#avatar_modal");
  document.getElementById("del-reg-" + record.id).value = "Cancel";
  document.getElementById("del-reg-" + record.id).setAttribute("onclick", "cancelar(" + record.id + ")");
  document.getElementById("edit-reg-" + record.id).value = "Save";
  document.getElementById("edit-reg-" + record.id).setAttribute("onclick", "sendData( '', " + record.id + ")");


}

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

  readData(db);

}

function updateUser(db, user_id) {
  var user = document.getElementById("user-" + user_id);
  var password = document.getElementById("password-" + user_id);
  var name = document.getElementById("name-" + user_id);
  var surname = document.getElementById("surname-" + user_id);
  var address = document.getElementById("address-" + user_id);
  var age = document.getElementById("age-" + user_id);
  var admin = document.getElementById("admin_check-" + user_id).checked;
  var avatar = getAvatarPath();
  var obj = { id: parseInt(user_id), user: user.value, password: password.value, name: name.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar, admin: admin };

  var tx = db.transaction(DB_STORE_NAME, "readwrite");
  var store = tx.objectStore(DB_STORE_NAME);

  //Updates data in our ObjectStore
  req = store.put(obj);

  req.onsuccess = function (e) {
    console.log("Data successfully updated");

    //Operations to do after updating data
    readData();
    // clearFormInputs();
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

function clearFormInputs() {

  document.getElementById("user").value = "";
  document.getElementById("password").value = "";
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("address").value = "";
  document.getElementById("age").value = "";
  document.getElementById("user").disabled = false;
  document.getElementById("password").disabled = false;
  uncheckAvatar();

}

function getAvatarPath() {

  var avatar = document.getElementsByName('avatar');
  console.log(avatar[1]);

  for (i = 0; i < avatar.length; i++) {

    if (avatar[i].checked) {

      return "img/avatar" + (i + 1) + ".png";

    } else {

      return "img/avatar1.png";
    }

  }


}

function setAvatarPath(path) {

  // document.getElementById("avatar-" + user_id).setAttribute("src", path);

  console.log(path);
}

function uncheckAvatar() {
  var avatar = document.getElementsByName("avatar");
  for (var i = 0; i < avatar.length; i++) { avatar[i].checked = false; }
}

window.addEventListener('load', () => {
  readData();


});

document.getElementById("user_collapse_data").addEventListener("click", function () {

  const saveButton = document.getElementById("add_user");
  if (saveButton.textContent == 'Submit') {

    saveButton.textContent = 'Save & submit';
    saveButton.setAttribute('action', 'add_user');
  } else {

    saveButton.textContent = 'Submit';
    saveButton.setAttribute('action', 'login');



  }



})