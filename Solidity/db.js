const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // database: "dvs",
  });


const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS dvs";
const useDatabaseQuery = "USE dvs";
const createTableUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

const insertDummyDataQuery = `
  INSERT INTO users (username, email, password) VALUES
  ('Hisham', 'hisham@gmail.com', '123123'),
  ('sabaoon', 'sabaoon@gmail.com', 'khan123'),
  ('haroon', 'haroon@gmail.com', 'khan222'),
  ('khang', 'khang@gmail.com', 'KHAN222')


`;




const createDatabase = (db) => {
    db.query(createDatabaseQuery, (err) => {
      if (err) {
        console.error("Error creating database: " + err.message);
        return;
      }
      console.log("Database 'dvs' created or already exists");
    });
  };


  const createTableUsersFunction = (db) => {
    db.query(useDatabaseQuery,(err)=>{
    db.query(createTableUsers, (err) => {
      if (err) {
        console.error("Error creating table users: " + err.message);
        return;
      }
      console.log("Database 'dvs' created or already exists");
    });
    console.log("Database 'dvs' selected");

});
  };



module.exports = {
    createDatabaseQuery,
    useDatabaseQuery,
    createTableUsers,
    insertDummyDataQuery,
    createTableUsersFunction,
    createDatabase, 
    db,
  };