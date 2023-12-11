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