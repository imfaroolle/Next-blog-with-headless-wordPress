export default function formHandler(req, res) {
  const body = req.body;
  if (!body.firstName || !body.email || !body.message) {
    res
      .status(400)
      .json({ message: "First Name, Email and Message are required" });
  }
  res.status(200).json({ message: "Form Submitted Successfully" });
}
