const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));
