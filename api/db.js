import mysql from "mysql"

export const db = mysql.createConnection({
  host:"sql12.freesqldatabase.com",
  user:"sql12736900",
  password: "4zJgPbF6FN",
  database:"sql12736900"
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database", err);
    return;
  }
  console.log("Connected to database");
});