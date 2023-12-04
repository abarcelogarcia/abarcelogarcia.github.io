// Importamos Crypto.js
import CryptoJS from 'crypto-js';

// Función para cifrar la contraseña
function encryptPassword(password) {
    // Generamos una clave secreta aleatoria
    const key = CryptoJS.lib.WordArray.random(16);

    // Ciframos la contraseña con la clave secreta
    const ciphertext = CryptoJS.AES.encrypt(password, key);

    // Devolvemos la clave secreta y el cifrado en formato string
    return {
        key: key.toString(),
        ciphertext: ciphertext.toString()
    };
}

// Función para descifrar la contraseña
function decryptPassword(encryptedPassword, key) {
    // Convertimos la clave secreta a formato WordArray
    const keyWordArray = CryptoJS.enc.Utf8.parse(key);

    // Desciframos la contraseña con la clave secreta
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, keyWordArray);

    // Devolvemos la contraseña descifrada en formato string
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Ejemplo de uso
const password = 'contraseña123';
const encryptedPassword = encryptPassword(password);

console.log('Contraseña cifrada:', encryptedPassword.ciphertext);
console.log('Clave secreta:', encryptedPassword.key);

const decryptedPassword = decryptPassword(encryptedPassword.ciphertext, encryptedPassword.key);

console.log('Contraseña descifrada:', decryptedPassword);