import nc from "next-connect";
import db from "../../utils/db";
import Product from "../../models/Products";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();
    res.send({ message: "seeded successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default handler;
