import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const BASE_URL = "https://api.myshiptracking.com/api/v2";

// 🔍 Search ships
app.get("/search", async (req, res) => {
  try {
    const name = req.query.name;

    const response = await fetch(
      `${BASE_URL}/vessel/search?name=${name}`,
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

// 📍 Get ship location (IMO / MMSI)
app.get("/vessel", async (req, res) => {
  try {
    const { imo, mmsi } = req.query;

    let url = "";

    if (mmsi) {
      url = `${BASE_URL}/vessel?mmsi=${mmsi}`;
    } else if (imo) {
      url = `${BASE_URL}/vessel?imo=${imo}`;
    } else {
      return res.status(400).send("imo or mmsi required");
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.MST_API_KEY}`,
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Proxy running on port", PORT));