let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let database = "blogginDB";
const DB_STORE_NAME = 'users';
const DB_STORE_LOGIN = 'login';
const DB_VERSION = 1;
let db;
let opened = false;
let backup;

// DB MANAGEMENT
// -------------------------------------------

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

    req.onupgradeneeded = function () {

        db = req.result;

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


        //   ADD temp user on start
        var obj = {
            user: "a@a.com",
            password: {
                ciphertext: "U2FsdGVkX1+4/35NcId09d1F+br5rs/PCQOp8UHK9Do=",
                key: "0ebddfocyq"
            },
            admin: true
        };

        try {
            req = store.add(obj);
        } catch (e) {
            console.log("Catch");
        }

    };

}

// ACCES MANAGEMENT FOR LOGGED-IN USERS

// Checks if the user is logged in
// -- Not logged in: Redirects to the homepage
// -- Yes it is: Checks if it is an admin
//     -- Not admin: redirects to home page
//     -- Is admin: Reads data and displays users
// -------------------------------------------

function verifyUser(userRol) {
    openCreateDb(function (db) {


        if (userRol == 'admin') {
            setUserAdmin(db);
        } else if (userRol == 'user') {
            setUser(db);
        } else if (userRol == 'profile') {
            setProfile(db);
        }

    });
}

// checks the role user and acts accordingly
function setUserAdmin(db) {

    var tx = db.transaction(DB_STORE_LOGIN, "readonly");
    var store = tx.objectStore(DB_STORE_LOGIN);
    var req = store.openCursor();

    req.onsuccess = function (e) {

        var cursor = this.result;


        if (!cursor) { // No data --> No login. Redirect to homepage

            window.location.href = "index.html";

        } else { // Get login data. 

            // If it is admin, set avatar and show users data. 
            if (cursor.value.admin == true) {

                document.getElementById("img-profile").src = cursor.value.avatar;
                readData();

                // If it is not admin, redirect to homepage. 
            } else {

                window.location.href = "index.html";
            }
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
function setUser(db) {
    
    var tx = db.transaction(DB_STORE_LOGIN, "readonly");
    var store = tx.objectStore(DB_STORE_LOGIN);
    var req = store.openCursor();

    req.onsuccess = function (e) {

        var cursor = this.result;

        if (!cursor) { // If there is not login data, return (we are in home page)

            console.log("Acces login: unauthorised access");
       

        } else { // Get data

            // If it is admin, go to admin page
            if (cursor.value.admin == true) {

                window.location.href = "index_admin.html";
       

                // If it is user (not admin), setup the avatar and logout button.
            } else {

                document.getElementById("img-profile").src = cursor.value.avatar;
                document.getElementById("img-profile").hidden = false;
                document.getElementById("link_profile").setAttribute("href", "index_profile.html");
                document.getElementById("btn_login").removeAttribute("data-bs-toggle");
                document.getElementById("btn_login").removeAttribute("data-bs-target");
                document.getElementById("btn_login").setAttribute("onclick", "setLogout()");
                document.getElementById("btn_login").textContent = "Logout";
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
function setProfile(db) {

    var tx = db.transaction(DB_STORE_LOGIN, "readonly");
    var store = tx.objectStore(DB_STORE_LOGIN);
    var req = store.openCursor();

    req.onsuccess = function (e) {

        var cursor = this.result;


        if (!cursor) { // No data --> No login. Redirect to homepage

            window.location.href = "index.html";
            
        } else { // Get login data. 
            
            // If it is admin, set avatar and show users data. 
            if (cursor.value.admin == true) {
                
                window.location.href = "index_admin.html";

                // If it is not admin, redirect to homepage. 
            } else {

                selectProfileToEdit(cursor.value.user_id);

            }
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

// LOGOUT
// -------------------------------------------

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


// PASSWORD ENCRYPT

// Encrypt password
function encryptPassword(password) {

    // 10-digit random secret key
    const key = Math.random().toString(36).substring(2, 12);


    // Encrypt the password with the secret key
    const ciphertext = CryptoJS.AES.encrypt(password, key);

    // We return the secret key and the cipher
    return {
        key: key.toString(),
        ciphertext: ciphertext.toString()
    };
}

// Decrypt password
function decryptPassword(encryptedPassword, key) {

    // Decrypt the password with the secret key
    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key);

    // return the decrypted password how string
    return decrypted.toString(CryptoJS.enc.Utf8);
}
