const crypto = require("crypto");
require('dotenv').config();

const ALGORITHM = "aes-256-ctr";
const IV_LENGTH = 16;

// Generar clave de 32 bytes usando hash SHA-256
const SECRET_KEY = crypto.createHash('sha256')
  .update(process.env.ENCRYPTION_KEY || "default_secret")
  .digest();

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  if (!text.includes(':')) {
    throw new Error('Formato cifrado inválido');
  }
  const [ivHex, contentHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const content = Buffer.from(contentHex, 'hex');
  
  if (iv.length !== IV_LENGTH) {
    throw new Error('IV inválido');
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
  const decrypted = Buffer.concat([decipher.update(content), decipher.final()]);
  return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };