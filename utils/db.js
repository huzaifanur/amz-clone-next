import mongoose from "mongoose";

async function connect() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}

async function disconnect() {
  try {
    //mongoose.disconnect();
    console.log("Disconnected");
  } catch (error) {
    console.log(error);
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
