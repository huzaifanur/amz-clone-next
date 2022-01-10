import mongoose from "mongoose";

const connection = {};

async function connect() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("new connection");
  } catch (error) {
    console.log(error);
  }
}

async function disconnect() {}

const db = { connect, disconnect };

export default db;
