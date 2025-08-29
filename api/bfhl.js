// /api/bfhl.js  — Vercel serverless function

const FULL_NAME = "aryan_laxaman";     // must be lowercase per spec
const DOB = "24062004";                 // ddmmyyyy
const EMAIL = "aryan24laxaman@gmail.co";
const ROLL = "22BAI1402";

export default function handler(req, res) {
  // Health/visibility endpoint for quick checks in the browser
  if (req.method === "GET") {
    return res.status(200).json({ operation_code: 1 });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, error: "Method not allowed" });
  }

  try {
    const data = req.body?.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: body must be { \"data\": [ ... ] }"
      });
    }

    // Helpers
    const isNum = (s) => typeof s === "string" && /^[0-9]+$/.test(s);
    const isAlpha = (s) => typeof s === "string" && /^[a-zA-Z]+$/.test(s);
    const isAlphaNum = (s) => typeof s === "string" && /^[a-zA-Z0-9]+$/.test(s);

    // Partition input
    const numberTokens = data.filter(isNum);                 // strings
    const even_numbers = numberTokens.filter(n => parseInt(n, 10) % 2 === 0); // keep as strings
    const odd_numbers  = numberTokens.filter(n => parseInt(n, 10) % 2 !== 0); // keep as strings

    const alphaTokens = data.filter(isAlpha);                // strings
    const alphabets   = alphaTokens.map(s => s.toUpperCase());

    const special_characters = data.filter(x => !isAlphaNum(x));

    // Sum of numeric tokens, returned as a string
    const sum = numberTokens.reduce((acc, n) => acc + parseInt(n, 10), 0).toString();

    // Concatenate ALL alphabetical characters (character-level), reverse, alternating caps
    const concatChars = alphaTokens.join("").split("").reverse();
    const concat_string = concatChars
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,   // e.g., "john_doe_17091999"
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,                      // arrays of strings
      even_numbers,                     // arrays of strings
      alphabets,                        // tokens uppercased
      special_characters,
      sum,                              // string
      concat_string                     // reverse alternating caps over all alpha chars
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, error: "Server error" });
  }
}
