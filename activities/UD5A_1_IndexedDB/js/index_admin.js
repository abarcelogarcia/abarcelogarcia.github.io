// USERS DATA MANAGEMENT
// -------------------------------------------

// Display users data

function readData() {
  openCreateDb(function (db) {
    readUsers(db);
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
  '<div class="col-1 text-end">' +
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
      '<div class="col-1 ">' +
      '<input class="input_reg text-center" type="text" id="age-' + cursor.value.id + '"  name="age" aria-describedby="age" value="' + cursor.value.age + '" disabled/>' +
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
      '<input  class="input_reg" type="password" id="password-' + cursor.value.id + '" value="' + cursor.value.password + '" hidden>' +
      '</div>';

    //  Check if is an admin 
    if (cursor.value.admin == true) {
      document.getElementById("admin_check-" + cursor.value.id).checked = true;
    }

    cursor.continue();


  }


}


}

// Grid Update users data

function selectUserToEdit(user_id) {
     
  openCreateDb(function (db) {
    console.log(db);
    console.log("Id user: " + user_id);

    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);

    var req = store.get(parseInt(user_id));

    req.onsuccess = function (e) {
      var record = e.target.result;

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
  document.getElementById("edit-reg-" + record.id).setAttribute("onclick", "sendData("+ record.id + ")");
  
  document.getElementById("save_avatar").setAttribute("onclick", "sendData("+ record.id + ")");

}

function sendData(user_id) {

     openCreateDb(function (db) {
       
         console.log("update user values");
         updateUser(db, user_id);

     });
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

    //Reads data and displays users
    readData();
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

function uncheckAvatar() {
  var avatar = document.getElementsByName("avatar");
  for (var i = 0; i < avatar.length; i++) { avatar[i].checked = false; }
}

// Delete user

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
  

function getAvatarPath() {

    var avatar = document.getElementsByName('avatar');
  
    console.log();
  
    for (i = 0; i < avatar.length; i++) {
  
      if (avatar[i].checked) {
  
        return "img/avatar" + (i + 1) + ".png";
  
      } 
  
    }
  
  
}

  // verify the user's identity when loading the page
  window.addEventListener('load', () => {
    verify_user();
  
  
  });
  
