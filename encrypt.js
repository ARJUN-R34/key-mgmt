const cryptojs = require('crypto-js')

async function encrypt() {
    const hashedPassword = 'This is the hashed password';
    const privateKey = 'This is the private key'

    var encrypt = cryptojs.AES.encrypt(privateKey, hashedPassword)
    console.log("Encrypted Private Key", encrypt.toString())
    
    var bytes = cryptojs.AES.decrypt(encrypt, hashedPassword);
    var originalText = bytes.toString(cryptojs.enc.Utf8);
    console.log("Decrypted Private Key", originalText); 
}

encrypt()