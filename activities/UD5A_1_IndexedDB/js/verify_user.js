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