function sendData(action) {

  openCreateDb(function (db) {

    if (action == 'add_user') {

      addUser(db);

    } else if (action == 'login') {

      login(db);

    }

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

      if ((user.value == cursor.value.user) && (password.value == cursor.value.password)) {

    
        setLogin(cursor.value.user, cursor.value.admin, cursor.value.avatar);

        if(cursor.value.admin==true){

          alert('Welcome admin ' + user.value);
          window.location.href = "index_admin.html";
          
          
        }else{
          
          alert('Welcome user ' + user.value);
          window.location.href = "index.html";

        }

        return;

      } else if ((user.value == cursor.value.user) && (password.value != cursor.value.password)) {

        alert('Incorrect password!');
        // window.location.href = "index.html";
        return;
        
      } 

      cursor.continue();
    }

    
  }

}

function setLogin(user, admin, avatar) {

  var obj = { logged: 1, user: user, admin: admin, avatar: avatar };

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
    console.log("Insert Login: Data insertion successfully done. Session_Id: " + e.target.result);

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


function getAvatarPath() {

  const avatar = document.getElementsByName('avatar');
  let avatarPath = "img/logo_headings.png";

  for (i = 0; i < avatar.length; i++) {

    
    if (avatar[i].checked) {

      avatarPath = "img/avatar" + (i + 1) + ".png";

    } 

  }

  return avatarPath;

}

function uncheckAvatar() {
  var avatar = document.getElementsByName("avatar");
  for (var i = 0; i < avatar.length; i++) { avatar[i].checked = false; }
}


window.addEventListener('load', () => {
  verify_user('');
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