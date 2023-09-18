import express from "express";

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  return res.send("Hello, Express!");
});

app.get("/my-page", (req, res) => {
  return res.json({
    ok: true,
    message: "This is my page.",
  });
});

app.post("/", (req, res) => {
  console.log(req.body);

  return res.json({
    ok: true,
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port: ${port}`);
});
