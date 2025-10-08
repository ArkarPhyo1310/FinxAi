import "dotenv/config";
import { connectToDatabase } from "../database/mongoose.ts";

async function main() {
  try {
    await connectToDatabase();
    console.log("OK: Database connection succeeded");
  } catch (err) {
    console.error("ERROR: Database connection failed");
    console.error(err);
  }
}

main();
