const pool = require("../db/pool");

module.exports.getAllCards = async (req, res) => {
  let sql = `SELECT * FROM public.cards`;
  let respond = await pool.query(sql);
  if (respond.rowCount > 0) {
    return res.status(200).json({ status: "success!", data: respond.rows });
  } else {
    return res
      .status(400)
      .json({ status: "failed!", data: "get data failed!" });
  }
};
