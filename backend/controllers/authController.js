const pool = require("../db/pool");
const encrypt = require("../utils/encrypt");

module.exports.loginUser = async (req, res) => {
  try {
    const body = req.body;
    const sql = `SELECT * FROM public.users where email = $1;`;
    const response = await pool.query(sql, [body.email]);
    if (response.rowCount > 0) {
      const isPwdValid = await encrypt.comparePwd(
        body.password,
        response.rows[0].password
      );
      if (isPwdValid) {
        const token = encrypt.generateJwt({
          email: body.email,
          id: response.rows[0].id,
        });
        return res.status(200).json({
          status: "success",
          message: "Login Success!",
          token: token,
        });
      } else {
        res.status(401).json({ status: "failed", message: "Wrong Password!" });
      }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "No User In Database!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};

module.exports.registerUser = async (req, res) => {
  try {
    const body = req.body;
    const sqlCheckDuplicate = `SELECT * from public.users where username = $1 OR email = $2`;
    const responseCheckedDup = await pool.query(sqlCheckDuplicate, [
      body.username,
      body.email,
    ]);
    if (responseCheckedDup.rowCount > 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Duplicate Username or Email!" });
    }
    let sql = `INSERT INTO public.users
(username, email, password)
VALUES($1,$2,$3);`;
    const pwd = await encrypt.hashPwd(body.password);
    const response = await pool.query(sql, [body.username, body.email, pwd]);
    if (response.rowCount > 0) {
      return res
        .status(200)
        .json({ status: "Success!", message: "Register Successed!" });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Insert Data failed!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};
