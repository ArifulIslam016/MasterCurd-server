require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URL_uri;
const client = new MongoClient(uri || "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbInstance = null;

async function getDB() {
  if (dbInstance) return dbInstance;
  await client.connect();
  dbInstance = client.db(process.env.DB_NAME);
  return dbInstance;
}

app.use(async (req, res, next) => {
  try {
    req.dbclient = await getDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

const addStudents = require("./addStudents");
const getStudent = require("./getStudent");
const deleteStudent = require("./deleteStudent");
const updateStudent = require("./updateStudent");

app.use("/getStudents", getStudent);
app.use("/deleteStudent", deleteStudent);
app.use("/updateStudent", updateStudent);
app.use("/addStudents", addStudents);

app.get("/", (req, res) => {
  res.send("Master Curd Operation");
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;