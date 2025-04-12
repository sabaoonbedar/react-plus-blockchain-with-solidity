const ethers = require("ethers");
require("dotenv").config();
const cors = require('cors'); 

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.contractAddress;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {
  abi,
} = require("./artifacts/contracts/contractApi.sol/contractApi.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(cors());
app.use(express.json());
const {useDatabaseQuery, insertDummyDataQuery, createDatabase,createTableUsersFunction, db } = require("./db");




db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});


createDatabase(db);
createTableUsersFunction(db);

db.query(useDatabaseQuery, (err) => {
  if (err) {
    console.error("Error using database 'dvs': " + err.message);
    return;
  }
  console.log("Using database 'dvs'");

  db.query("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error checking for existing data: " + err.message);
      return;
    }

    if (rows.length === 0) {
        db.query(insertDummyDataQuery, (err) => {
          if (err) {
            console.error("Error inserting dummy data: " + err.message);
            return;
          }
          console.log("Dummy data inserted into 'users' table");
        });
    } else {
      console.log("Dummy data already exists, skipping insertion.");
    }
  });
});



app.get("/:reg_no/:dec_date", async (req, res) => {
  try {
    const regNo = req.params.reg_no;
    const decDate = req.params.dec_date;
    const degree = await contractInstance.getDegree(regNo, decDate);
    console.log(degree)

    if(degree[3]){
    res.json({
      name:degree[0],
      father_name:degree[1],
      reg_no:degree[2],
      serial_no:degree[3],
      dec_date:degree[4],
      session:degree[5]

    });}
    else{
res.json({error:'nothing'})
    }


  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, father_name, reg_no, serial_no, dec_date, session } =
      req.body;
    const tx = await contractInstance.addDegree(
      name,
      father_name,
      reg_no,
      serial_no,
      dec_date,
      session
    );
    await tx.wait();
    res.json({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});



app.use(cors());

app.post("/loginCheck", (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ? AND BINARY `password` = ?";
  const email = req.body.email;
  const password = req.body.password;

  db.query(sql, [email, password], (error, data) => {
    if (error) {
      return res.status(500).json({ message: "fail" });
    }

    if (data.length > 0) {
      return res.json({
        data: data,
        message: "success",
      });
    } else {
      return res.json({ message: "no_user_found" });
    }
  });
});



app.post("/registerUser", (req, res) => {
  const sql = "INSERT INTO users (username,email, password) VALUES (?,?,?)";
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query(sql, [username,email,password], (error, result) => {
    if (error) {
      return res.status(500).json({ message: error });
    }

    return res.json({ message: "success", insertedId: result.insertId });
  });
});





const port = 5500;
app.listen(port, () => {
  console.log("API server listening on port " + port);
});
