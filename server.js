import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

console.log("API KEY:", process.env.MST_API_KEY);
const app = express();

app.get("/ship", async (req, res) => {
  try {
    const name = req.query.name;

    const response = await fetch(
      `https://api.myshiptracking.com/api/v2/vessel/search?name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MST_API_KEY}`,
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => console.log("Proxy running"));
