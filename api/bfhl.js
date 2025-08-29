// /api/bfhl.js
const FULL_NAME = "aryan_laxaman";     // lowercase per spec
const DOB = "24062004";                // ddmmyyyy
const EMAIL = "aryan24laxaman@gmail.co";
const ROLL  = "22BAI1402";

export default function handler(req, res) {
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
        error: 'Invalid input: body must be { "data": [ ... ] }'
      });
    }

    const isNum      = (s) => typeof s === "string" && /^[0-9]+$/.test(s);
    const isAlpha    = (s) => typeof s === "string" && /^[a-zA-Z]+$/.test(s);
    const isAlphaNum = (s) => typeof s === "string" && /^[a-zA-Z0-9]+$/.test(s);

    const numberTokens = data.filter(isNum);                       // keep as strings
    const even_numbers = numberTokens.filter(n => parseInt(n,10) % 2 === 0);
    const odd_numbers  = numberTokens.filter(n => parseInt(n,10) % 2 !== 0);

    const alphaTokens  = data.filter(isAlpha);                      // may be multi-letter
    const alphabets    = alphaTokens.map(s => s.toUpperCase());

    const special_characters = data.filter(x => !isAlphaNum(x));

    const sum = numberTokens.reduce((acc, n) => acc + parseInt(n,10), 0).toString();

    // concatenate ALL alphabetical characters, reverse, alternating caps (Upper starts at index 0)
    const concatChars   = alphaTokens.join("").split("").reverse();
    const concat_string = concatChars
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum,
      concat_string
    });
  } catch {
    return res.status(500).json({ is_success: false, error: "Server error" });
  }
}
