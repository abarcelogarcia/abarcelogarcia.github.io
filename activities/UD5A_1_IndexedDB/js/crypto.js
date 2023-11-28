const crypto = require('crypto');

const algoritmo = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// const password = 'iajbcoiwqn';

function encriptar(password) {

    const cipher = crypto.createCipheriv(algoritmo, key, iv);

    const passwordEncrypted = Buffer.concat([cipher.update(password), cipher.final()]);

    return {

        iv: iv.toString("hex"),
        encripted: passwordEncrypted.toString('hex')
    }



}

console.log(encriptar(password));

