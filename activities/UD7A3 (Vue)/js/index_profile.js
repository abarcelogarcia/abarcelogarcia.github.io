// ELEMENTS

let user, password, user_id;
const userName = document.getElementById("name");
const surname = document.getElementById("surname");
const address = document.getElementById("address");
const age = document.getElementById("age");
const avatarContainer = document.getElementById("avatar_continer");
const editProfileBtn = document.getElementById("edit-profile-btn");
const delProfileBtn = document.getElementById("del-profile-btn");
const validatePassBtn = document.getElementById("validatePass_profile");
const imgProfile = document.getElementById("img-profile");
const themeSelector = document.getElementById("theme_selector");
const adminCheck = document.getElementById("admin_check");
let nameFigcaption = document.getElementById("user_name_figcaption");


function setProfile(db) {

  var tx = db.transaction(DB_STORE_LOGIN, "readonly");
  var store = tx.objectStore(DB_STORE_LOGIN);
  var req = store.openCursor();

  req.onsuccess = function (e) {

    var cursor = this.result;

    if (!cursor) { // No data --> No login. Redirect to homepage

      window.location.href = "index.html";

    } else { // Get login data. 

      if (cursor.value.theme == 1) {
        setDarkTheme();
      }

      // If it is admin, set the avatar that directs registered users
      if (cursor.value.admin == true) {

        document.getElementById("img-profile").src = "img/avatars.png";
        document.getElementById("img-profile").parentElement.href = "index_admin.html";
        nameFigcaption.innerText = 'Users';

      } else {

        nameFigcaption.innerText = cursor.value.name;

      }

      selectProfileData(cursor.value.id);
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

function selectProfileData(user_id, password) {

  openCreateDb(function (db) {

    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);

    var req = store.get(user_id);

    req.onsuccess = function (e) {
      var record = e.target.result;

      //Operations to do after reading a user
      if (password) {

        resetPassword(user_id, password, record);

      } else {

        fillInputsProfile(record);


      }
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

function fillInputsProfile(record) {

  user_id = record.id;
  user = record.user;
  password = record.password;
  userName.value = record.name;
  surname.value = record.surname;
  address.value = record.address;
  age.value = record.age;
  validatePassBtn.setAttribute("onclick", "validateFormPass(" + record.id + ")");
  editProfileBtn.setAttribute("onclick", "editProfile(" + record.id + ")");
  adminCheck.checked = record.admin;

  if (!record.admin) {
    imgProfile.src = record.avatar;
  }


  let imgPaths = document.querySelectorAll('input[path]');

  for (let i = 0; i < imgPaths.length; i++) {

    if (imgPaths[i].getAttribute("path") == record.avatar) {

      imgPaths[i].checked = true;

    }
  }

  if (record.theme == 1) {

    themeSelector.value = 1;


  } else {

    themeSelector.value = 0;
  }

}

function editProfile(user_id) {

  userName.disabled = false;
  surname.disabled = false;
  address.disabled = false;
  age.disabled = false;
  themeSelector.disabled = false;
  avatarContainer.classList.remove("disabled");
  editProfileBtn.textContent = "Save";
  editProfileBtn.setAttribute("onclick", "sendData(" + user_id + ", 'update')");
}

function sendData(user_id, action) {

  openCreateDb(function (db) {

    if (action == 'update') {

      updateUser(db, user_id);

    } else if (action == 'delete') {


      deleteProfile(db, user_id)

    }

  });
}

function updateUser(db, user_id) {


  const avatar = getAvatarPath();

  var tx = db.transaction(DB_STORE_NAME, "readwrite");
  var store = tx.objectStore(DB_STORE_NAME);

  var obj = { id: parseInt(user_id), user: user, password: password, name: userName.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar, admin: adminCheck.checked, theme: themeSelector.value };


  //Updates data in our ObjectStore
  req = store.put(obj);

  req.onsuccess = function (e) {
    console.log("Data successfully updated");

    // Reload page for set default elements values
    updateUserLogin(user_id);


    // location.reload();

  };

  req.onerror = function (e) {
    console.error("Edit Profile: Error updating data", this.error);
  };

  tx.oncomplete = function () {
    console.log("Edit Profile: tx completed");



  };

}

function updateUserLogin() {

  const avatar = getAvatarPath();



  var tx = db.transaction(DB_STORE_LOGIN, "readwrite");
  var store = tx.objectStore(DB_STORE_LOGIN);

  store.clear();

  var obj = { id: parseInt(user_id), user: user, name: userName.value, avatar: avatar, admin: adminCheck.checked, theme: themeSelector.value };
  //Updates data in our ObjectStore
  req = store.add(obj);

  req.onsuccess = function (e) {
    console.log("User Login: successfully updated");

    location.reload();

  };

  req.onerror = function (e) {
    console.error("User Login:: Error updating data", this.error);
  };

  tx.oncomplete = function () {
    console.log("User Login:: tx completed");
    db.close();
    opened = false;
  };







}


function resetPassword(user_id, password, record) {

  openCreateDb(function (db) {

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);
    var newPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);

    var obj = { id: parseInt(user_id), user: record.user, password: newPassword, name: record.name, surname: record.surname, address: record.address, avatar: record.avatar, age: record.age, admin: record.admin };


    //Delete data in our ObjectStore
    var req = store.put(obj);

    req.onsuccess = function (e) {

      console.log("Reset Password: Password correctly reset");

      //Operation to do after deleting a record
      location.reload();
    };

    req.onerror = function (e) {
      console.error("Reset Password: error resetting password", e.target.errorCode);
    };

    tx.oncomplete = function () {
      console.log("Reset Password: tx completed");
      db.close();
      opened = false;
    };


  });
}

function deleteProfile(db, user_id) {

  var tx = db.transaction(DB_STORE_NAME, "readwrite");
  var store = tx.objectStore(DB_STORE_NAME);




  //Updates data in our ObjectStore
  req = store.delete(user_id);


  req.onsuccess = function (e) {
    console.log("Delete Profile: profile successfully deleted");

    setLogout();

    // Reload page for set default elements values
    window.location.href = "index.html";

  };

  req.onerror = function (e) {
    console.error("Delete Profile: Error updating data", this.error);
  };

  tx.oncomplete = function () {
    console.log("Delete Profile: tx completed");
    db.close();
    opened = false;
  };





}



// LISTENNERS
window.addEventListener('load', () => {
  verifyUser('profile');
});

// Bootstrap Alert

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')


  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('You are going to <b>delete </b>your profile. ' +
      'Please note that this process is <b>IRREVERSIBLE</b>. Are you sure about it? ' +
      '<br><br> <button type="button" class="btn btn-danger" id="del-confrim-button"' +
      ' onclick="sendData(' + user_id + ', \'delete\')">Yes, I am sure.</button>', 'danger')
  })
}