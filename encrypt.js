const cryptojs = require('crypto-js')

async function encrypt() {
    const hashedPassword = '7EISLKt77qbP7AFBGwD2WGTjngnXn73r61SbzSTvAoARbrlfSec0bn6ileP0khHsO+GxxbU4j9z2aNK+Ayxj38NYdP0bOD1Ee20NpiaoLPLeLN35GmOly78hljT9fwZla+jBIih2c+VE8owsfrCUGv/ZLWDXXHsMtU5N8Ton6v0=';
    const privateKey = '0x8CE0966AB535210F2E64C7CD9E5272756A6E0E73CB811E7FB6476AAB55B9ED5A'

    var encrypt = cryptojs.AES.encrypt(privateKey, hashedPassword)
    console.log("Encrypted String", encrypt.toString())
    
    var bytes = cryptojs.AES.decrypt(encrypt, hashedPassword);
    var originalText = bytes.toString(cryptojs.enc.Utf8);
    console.log("Decrypted Message", originalText); 
}

encrypt()