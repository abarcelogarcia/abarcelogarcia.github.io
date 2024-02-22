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
        store.createIndex('theme', 'theme', { unique: false });
        console.log("openCreateDb: Index created on theme");

        addTempsUsers(store);


        

    };

}

// ACCES MANAGEMENT FOR LOGGED-IN USERS

// Checks if the user is logged in
// -- Not logged in: Redirects to the homepage
// -- Yes it is: Checks if it is an admin
//     -- Not admin: redirects to home page
//     -- Is admin: Reads data and displays users
// -------------------------------------------

// checks the role user and acts accordingly
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

function setDarkTheme() {


    document.body.setAttribute("data-bs-theme", "dark");
    const styleSheet = document.getElementById("theme");
    const logoM = document.getElementById("logo_mobile");
    const logo = document.getElementById("logo");
    const logoSearch = document.getElementById("logo_search");
    const socialBtn = document.getElementsByName("social_btn");

    styleSheet.href = "css/bootstrap_custom_dark.css";
    logoM.src = "img/LogoBloggIn_m_dark.png";
    logo.src = "img/LogoBloggIn_dark.png";
    logoSearch.src = "img/button_search_dark.png";

    for (let i = 0; i < socialBtn.length; i++) {

        socialBtn[i].src = "img/socialbutton_dark.png";

    }







};


function addTempsUsers(store){


    //   ADD temp user on start
    var obj = {
        user: "toni@toni.com",
        password: "CIwFTeZMcKcphP3ApQzGAQ==",
        name:"Toni",
        surname: 'Pons',
        address: 'Joan pons 25',
        age: 30,
        avatar: "img/avatar2.png",
        theme: 0,
        admin: true
    };

    req = store.add(obj);

    obj = {
        user: "irene@iesjoanramis.com",
        password: "CIwFTeZMcKcphP3ApQzGAQ==",
        name:"Irene",
        surname: 'Pons',
        address: 'Joan pons 25',
        age: 30,
        avatar: "img/avatar1.png",
        theme: 0,
        admin: true
    };

    req = store.add(obj);

    obj = {
        user: "alex@alex.com",
        password: "CIwFTeZMcKcphP3ApQzGAQ==",
        name:"Alex",
        surname: 'Pons',
        address: 'Joan pons 25',
        age: 30,
        avatar: "img/avatar3.png",
        theme: 0,
        admin: false
    };

    req = store.add(obj);

    obj = {
        user: "pedro@pedro.com",
        password: "CIwFTeZMcKcphP3ApQzGAQ==",
        name:"Pedro",
        surname: 'Pons',
        address: 'Joan pons 25',
        age: 30,
        avatar: "img/avatar2.png",
        theme: 0,
        admin: false
    };

    req = store.add(obj);



}



