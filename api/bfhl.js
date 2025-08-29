export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      message: "GET /bfhl working!",
    });
  } 
  else if (req.method === "POST") {
    const data = req.body?.data || [];

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

    res.status(200).json({
      is_success: true,
      user_id: "Aryan_Laxaman_24062004",
      email: "aryan24laxaman@gmail.co",
      roll_number: "22BAI1402",
      even_numbers,
      odd_numbers,
      alphabets,
      special_chars,
      sum
    });
  } 
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
