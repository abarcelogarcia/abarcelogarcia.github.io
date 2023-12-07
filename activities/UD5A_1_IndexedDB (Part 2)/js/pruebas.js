let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let database = "blogginDB";
const DB_STORE_NAME = 'users';
const DB_STORE_LOGIN = 'login';
const DB_VERSION = 1;
let db;
let opened = false;
let stockData;
let jsondata;

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
    };

    req.onerror = function (e) {
        console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
    };
}


function readData() {
    openCreateDb(function (db) {
        readUsers(db);
    });
}

function readUsers(db) {

    var registered = document.getElementById('registered_user_table');

    registered.innerHTML = "";

    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);
    var req = store.getAll();

    req.onsuccess = function (e) {
        stockData = this.result;

        downloadCSV({ filename: "backup-users.json" });

        if (stockData) {
            jsondata = JSON.stringify(stockData);
            console.log(jsondata);
        }
    }
}

function downloadCSV(args) {

    var data, filename, link;

    var csv = 'data:text/json;charset=utf-8,' + JSON.stringify(stockData);

    filename = args.filename || 'export.csv';

    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

function importJson() {



    fetch('http://127.0.0.1:5501/activities/UD5A_1_IndexedDB%20(Part%202)/backups/stock-data.json')
        .then((response) => response.json())
        .then((json) => {

            var tx = db.transaction(DB_STORE_NAME, "readwrite");
            var store = tx.objectStore(DB_STORE_NAME);

            try {

                for (i = 0; i < json.length; i++) {
                    req = store.put(json[i]);
                    console.log("ImportUser: User data insertion successfully done. Name: " + json[i].name);
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

            };
        });
}

function sendData() {

    openCreateDb(function (db) {
        importJson()
    });
}

