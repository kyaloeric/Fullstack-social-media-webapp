import * as nodemailer from "nodemailer";
import ejs from "ejs";
import mssql from "mssql";
import { sqlConfig } from "../config/sqlComfig";
import { sendMail } from "../helpers/emailhelper";

export const sendResetTokenByEmail = async () => {
  const pool = await mssql.connect(sqlConfig);

  const users = await (
    await pool
      .request()
      .query("SELECT * FROM Users WHERE resetToken is NOT NULL AND resetPassword = 0")
  ).recordset;

  for (let user of users) {
    ejs.renderFile(
      "templates/resetpassword.ejs",
      {
        Name: user.fullname,
        Password: user.resetToken,
        ExpiraryTime: user.expiryTime,
      },
      async (error, data) => {
        let mailOptions = {
          from: process.env.Email as string,
          to: user.email,
          subject: "Reset Password",
          html: data,
        };
        try {
          await sendMail(mailOptions);
          await pool
            .request()
            .query(`UPDATE Users SET resetPassword = 1 WHERE resetPassword = 0`);

          console.log("Emails send to new Users");
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
};