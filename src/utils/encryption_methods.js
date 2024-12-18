const crypto = require("crypto");

const encryptString = (text, secretKey) => {
  var mykey = crypto.createCipheriv("aes-128-cbc", secretKey);
  var mystr = mykey.update(text, "utf8", "hex");
  mystr += mykey.final("hex");
  return encrypted;
};

const decryptString = (encryptedText, secretKey) => {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = {
  encryptString,
  decryptString,
};
