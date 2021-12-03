const mysql = require("mysql");

module.exports = mysql.createPool({
    host:"localhost",
    user:"invitadob",
    password:"fernando120800",
    database:"proyectofinalappweb",
})