const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

const FULL_NAME = "Aryan_Laxaman"; 
const DOB = "24062004"; 
const EMAIL = "aryan24laxaman@gmail.co";
const ROLL_NUMBER = "22BAI1402";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data; 

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_chars = [];
    let sum = 0;

    data.forEach(item => {
      if (/^[0-9]+$/.test(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(num);
        } else {
          odd_numbers.push(num);
        }
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_chars.push(item);
      }
    });

    let concat = alphabets.join("").split("").reverse();
    let alternatingCaps = concat.map((ch, i) => 
      i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join("");

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      even_numbers,
      odd_numbers,
      alphabets,
      special_chars,
      sum,
      reverse_alternating_caps: alternatingCaps
    };

    res.status(200).json(response);

  } catch (err) {
    console.error(err);
    res.status(500).json({ is_success: false, error: "Server error" });
  }
});
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
