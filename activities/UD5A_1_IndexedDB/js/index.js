var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "blogginDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;
var opened = false;
// const EDIT_USER = "Edit user";
// const NEW_USER = "New user";
// const ADD_USER = "Add user";



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
  console.log(avatar);
  var obj = { user: user.value, password: password.value, name: name.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar };


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
    readData();
    // clearFormInputs();

    const regUsers = new bootstrap.Modal("#users");
    regUsers.show();

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

function readUsers(db) {

  var registered = document.getElementById('registered_user_table');

  registered.innerHTML = '<div class="container registered-users-cab m-auto">' +
    '<div class="row align-items-center">' +
    '<div class="col-1">' +
    'ID' +
    '</div>' +
    '<div class="col-5 col-sm-2">' +
    'User' +
    '</div>' +
    '<div class="col-3 d-none d-sm-block">' +
    'Name' +
    '</div>' +
    '<div class="col-3 d-none d-xl-block">' +
    'Surname' +
    '</div>' +
    '<div class="col-2 d-none d-xl-block">' +
    'Address' +
    '</div>' +
    '<div class="col-1 d-none d-xl-block text-center">' +
    'Age' +
    '</div>' +
    '<div class="col-1 d-none d-xl-block text-center">' +
    'Avatar' +
    '</div>' +
    '<div class="col-3 col-sm-1 text-center">' +
    '' +
    '</div>' +
    '<div class="col-3 col-sm-1 text-center">' +
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

      registered.innerHTML += '<div class="container registered-users m-auto ">' +
        '<div class="row align-items-center">' +
        '<div class="col-1" id="' + cursor.value.id + '">' +
        cursor.value.id +
        '</div>' +
        '<div class="col-7 col-sm-2" >' +
        cursor.value.user +
        '</div>' +
        '<div class="col-3 d-none d-sm-block">' +
        cursor.value.name +
        '</div>' +
        '<div class="col-1 d-none d-sm-block">' +
        cursor.value.surname +
        '</div>' +
        '<div class="col-2 d-none d-xl-block">' +
        cursor.value.address +
        '</div>' +
        '<div class="col-1 d-none d-xl-block text-center">' +
        cursor.value.age +
        '</div>' +
        '<div class="col-1 d-none d-xl-block text-center">' +
        '<img src=' + cursor.value.avatar + ' alt="avatar" style="width: 40px;" />' +
        '</div>' +
        '<div class="col-2 col-sm-1 text-center">' +
        '<input type="button" data-bs-toggle="modal" data-bs-target="#login" class="btn btn-warning" value="Edit" onclick="selectUserToEdit(' + cursor.value.id + ')">' +
        '</div>' +
        '<div class="col-2 col-sm-1 text-center">' +
        '<input type="button" class="btn btn-danger" value="Delete" onclick="deleteUser(' + cursor.value.id + ')" >' +
        '</div>' +
        '</div>' +
        '</div>';

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
  document.getElementById("user").value = record.user;
  document.getElementById("user").disabled = true;
  document.getElementById("password").value = record.password;
  document.getElementById("password").disabled = true;
  document.getElementById("name").value = record.name;
  document.getElementById("surname").value = record.surname;
  document.getElementById("address").value = record.address;
  document.getElementById("age").value = record.age;
  document.getElementById("add_user").setAttribute('action', 'edit_user');
  document.getElementById("add_user").setAttribute('user_id', record.id);
  document.getElementById("collapseRegister").classList.add('show');
}

function updateUser(db, user_id) {
  var user = document.getElementById("user");
  var password = document.getElementById("password");
  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var address = document.getElementById("address");
  var age = document.getElementById("age");
  var avatar = getAvatarPath();
  var obj = { id: parseInt(user_id), user: user.value, password: password.value, name: name.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar };

  var tx = db.transaction(DB_STORE_NAME, "readwrite");
  var store = tx.objectStore(DB_STORE_NAME);

  //Updates data in our ObjectStore
  req = store.put(obj);

  req.onsuccess = function (e) {
    console.log("Data successfully updated");

    //Operations to do after updating data
    readData();
    clearFormInputs();
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

  for (i = 0; i < avatar.length; i++) {

    if (avatar[i].checked) {

      return "img/avatar" + (i + 1) + ".png";

    }

  }


}

function uncheckAvatar() {
  var avatar = document.getElementsByName("avatar");
  for (var i = 0; i < avatar.length; i++) { avatar[i].checked = false; }
}

// window.addEventListener('load', () => {
//     openCreateDb();


//   });

document.getElementById("user_collapse_data").addEventListener("click", function () {

  const saveButton = document.getElementById("add_user");
  if (saveButton.textContent == 'Submit') {

    saveButton.textContent = 'Save & submit'
  } else {

    saveButton.textContent = 'Submit'

  }



})