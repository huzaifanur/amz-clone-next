import nc from "next-connect";
import db from "../../utils/db";
import Product from "../../models/Products";
import data from "../../utils/data";
import User from "../../models/User";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({ message: "seeded successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default handler;
