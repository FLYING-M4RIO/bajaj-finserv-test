const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Per spec: full name MUST be lowercase
const FULL_NAME = "aryan_laxaman";
const DOB = "24062004"; // ddmmyyyy
const EMAIL = "aryan24laxaman@gmail.co";
const ROLL_NUMBER = "22BAI1402";

app.get("/bfhl", (req, res) => {
  // Simple health endpoint (also helps verifiers)
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body?.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input. Expected: { "data": [ ... ] }',
      });
    }

    // Helpers
    const isNum = (s) => typeof s === "string" && /^[0-9]+$/.test(s);
    const isAlpha = (s) => typeof s === "string" && /^[a-zA-Z]+$/.test(s);
    const isAlphaNum = (s) => typeof s === "string" && /^[a-zA-Z0-9]+$/.test(s);

    // Keep numeric tokens as STRINGS (per spec)
    const numberTokens = data.filter(isNum); // strings like "1","334"
    const even_numbers = numberTokens.filter((n) => parseInt(n, 10) % 2 === 0); // strings
    const odd_numbers = numberTokens.filter((n) => parseInt(n, 10) % 2 !== 0);  // strings

    // Alphabet tokens may be multi-letter, return token-level UPPERCASE
    const alphaTokens = data.filter(isAlpha);           // e.g., ["a","ABcD","R"]
    const alphabets = alphaTokens.map((s) => s.toUpperCase()); // ["A","ABCD","R"]

    // Special characters → anything non-alphanumeric
    const special_characters = data.filter((x) => !isAlphaNum(x));

    // Sum of numbers → must be returned as STRING
    const sum = numberTokens
      .reduce((acc, n) => acc + parseInt(n, 10), 0)
      .toString();

    // Concatenate ALL alphabetical characters (character-level),
    // reverse, alternating caps starting UPPER at index 0.
    const concatChars = alphaTokens.join("").split("").reverse();
    const concat_string = concatChars
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`, // e.g. "john_doe_17091999"
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,                    // arrays of STRINGS
      even_numbers,                   // arrays of STRINGS
      alphabets,                      // tokens uppercased
      special_characters,
      sum,                            // STRING
      concat_string,                  // reverse alternating caps over all alpha chars
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ is_success: false, error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
