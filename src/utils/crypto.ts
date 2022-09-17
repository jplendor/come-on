import CryptoJS from "crypto-js"

// createAt: 2022-08-26
// author: jeongbaebang

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

type Crypto = (arg0: string, arg1: string) => string
type CryptoValue = (arg0: string) => string

export const encrypt: Crypto = (value, key) =>
  CryptoJS.AES.encrypt(value, key).toString()

export const decrypt: Crypto = (ciphertext, key) =>
  CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8)

export const encryptValue: CryptoValue = (target) => encrypt(target, SECRET_KEY)

export const decryptValue: CryptoValue = (target) => decrypt(target, SECRET_KEY)
