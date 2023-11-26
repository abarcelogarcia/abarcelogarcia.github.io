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

  if(opened){
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
  req.onupgradeneeded = function() {
        
    //Value of previous db instance is lost. We get it back using the event
    db = req.result; //Or this.result

    console.log("openCreateDb: upgrade needed " + db);
    var store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true});
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


function sendData(action){

  openCreateDb(function(db){
    
    if (action == 'add_user'){
      addUser(db);
    } else {
      console.log("change user values");
      editUser(db);
    }    

  });
}

function addUser(db){
  var user = document.getElementById("user");
  var password = document.getElementById("password");
  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var address = document.getElementById("address");
  var age = document.getElementById("age");
  var avatar = getAvatarPath();
  console.log(avatar);
  var obj = { user: user.value, password: password.value, name: name.value, surname: surname.value, address: address.value, age: age.value, avatar: avatar};


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

    const regUsers = new bootstrap.Modal("#users");
    regUsers.show();
    
  };
  req.onerror = function(e) {
    console.error("addUser: error creating data", this.error);   
  };

  //After transaction is completed we close de database
  tx.oncomplete = function() {
    console.log("addUser: transaction completed");
    db.close();
    opened = false;
  };
}

function readUsers(){

  var registered = document.getElementById('registered_user_table');

  registered.innerHTML = '<div class="container registered-users-cab">'+
  '<div class="row align-items-center">'+
    '<div class="col-1">'+
      'ID'+
    '</div>'+
    '<div class="col">'+
      'User'+
    '</div>'+
    '<div class="col">'+
      'Name'+
    '</div>'+
    '<div class="col">'+
      'Surname'+
    '</div>'+
    '<div class="col">'+
      'Address'+
    '</div>'+
    '<div class="col text-center">'+
      'Age'+
    '</div>'+
    '<div class="col text-center">'+
      'Edit'+
    '</div>'+
    '<div class="col text-center">'+
      'Delete'+
    '</div>'+
  '</div>'+
'</div>';

  var tx = db.transaction(DB_STORE_NAME, "readonly"); 
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.openCursor();

  req.onsuccess = function (e){

    var cursor = this.result;

    if(cursor){

      registered.innerHTML += '<div class="container registered-users">'+
      '<div class="row align-items-center">'+
        '<div class="col-1">'+
        cursor.value.id +
        '</div>'+
        '<div class="col">'+
        cursor.value.user +
        '</div>'+
        '<div class="col">'+
        cursor.value.name+
        '</div>'+
        '<div class="col">'+
        cursor.value.surname +
        '</div>'+
        '<div class="col">'+
        cursor.value.address +
        '</div>'+
        '<div class="col text-center">'+
        cursor.value.age +
        '</div>'+
        '<div class="col text-center">'+
        '<input type="button" class="btn btn-warning" value="Edit" >'+
        '</div>'+
        '<div class="col text-center">'+
        '<input type="button" class="btn btn-danger" value="Delete" >'+
        '</div>'+
      '</div>'+
    '</div>';
    
  cursor.continue();


    }

    
  }
  

}


function getAvatarPath(){

  var ele = document.getElementsByName('avatar');
 
  for (i = 0; i < ele.length; i++) {
      
    if (ele[i].checked){

        return "img/avatar" + (i+1) + ".png";

      }
          
  }


}
window.addEventListener('load', () => {
    openCreateDb();

   
  });

