export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "GET /bfhl working!" });
  } else if (req.method === "POST") {
    res.status(200).json({ message: "POST /bfhl working!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
