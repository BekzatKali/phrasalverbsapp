import mongoose from "mongoose"

interface DBConnection {
    isConnected: boolean;
}
  
let connection: DBConnection = { isConnected: false };
  
const connectToDB = async () => {
    try {
      if (connection.isConnected) return;
      const db = await mongoose.connect(process.env.MONGODB_URL as string);
      connection.isConnected = db.connections[0].readyState === mongoose.ConnectionStates.connected;
    } catch (error) {
      console.log(error);
    }
}
  
export default connectToDB;