

function updateFormInputsToEditProfile(record) {

 
    document.getElementById("user-" + record.id).disabled = false;
    document.getElementById("user-" + record.id).value = record.user;
    document.getElementById("password-" + record.id).value = decryptPassword(record.password.ciphertext, record.password.key);
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
    document.getElementById("edit-reg-" + record.id).textContent = "Save";
    document.getElementById("edit-reg-" + record.id).setAttribute("onclick", "sendData(" + record.id + ")");
    
    // Modal select button to save avatar
    document.getElementById("save_avatar").addEventListener('click', function(){
      
      
      document.getElementById("avatar-" + record.id).src = getAvatarPath();
  
  
  
    });
  
  }


  function selectProfileToEdit(user_id, password) {

    openCreateDb(function (db) {
      console.log(db);
      console.log("Id user: " + user_id);
  
      var tx = db.transaction(DB_STORE_NAME, "readonly");
      var store = tx.objectStore(DB_STORE_NAME);
  
      var req = store.get(parseInt(user_id));
  
      req.onsuccess = function (e) {
        var record = e.target.result;
  
        //Operations to do after reading a user
        if(password){
  
          resetPassword(user_id, password, record);
  
        }else{
  
          updateFormInputsToEditProfile(record);
  
  
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

  function updateFormInputsToEditProfile(record){

    document.getElementById("name").value = record.name;
    document.getElementById("surname").value = record.surname;
    document.getElementById("address").value = record.address;
    document.getElementById("age").value = record.age;

    let paths = document.querySelectorAll('input[path]');

    for (let i = 0; i < paths.length; i++) {
      
      if(paths[i].getAttribute("path")==record.avatar){

        paths[i].checked = true;

      }
    }

    paths[1].disabled = true;

    console.log(paths[0].getAttribute("path"));

  }
// LISTENNERS
window.addEventListener('load', () => {
    verifyUser('profile');
  });