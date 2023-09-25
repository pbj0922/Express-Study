import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const app = express();
const port = 3010;

const client = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json("Hello, Express!");
});

app.post("/user", async (req, res) => {
  try {
    const { account, password } = req.body;

    // 유저가 존재하는지 확인
    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });

    // 있으면 리턴(종료)
    if (existUser) {
      return res
        .status(400)
        .json({ ok: false, message: "Already exist user." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // console.log(password);
    // console.log(hashedPassword);
    // console.log(bcrypt.compareSync(password + "1", hashedPassword));

    // 없으면 생성
    const newUser = await client.user.create({
      data: {
        account,
        password: hashedPassword,
      },
    });

    // 생성후 종료
    console.log(newUser);

    return res.json({
      ok: true,
      user: {
        id: newUser.id,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        account: newUser.account,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port: ${port}`);
});
