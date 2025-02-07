const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPwd = async (plainTextPassword) => {
  if (plainTextPassword) {
    try {
      const hash = await bcrypt.hash(plainTextPassword, 10);
      return hash;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

exports.comparePwd = async (pwd, hash) => {
  const result = await bcrypt.compare(pwd, hash);
  return result;
};

exports.generateJwt = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};
