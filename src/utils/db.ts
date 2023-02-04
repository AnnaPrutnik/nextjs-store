import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface IConnection {
  isConnected: number;
}

const connection: IConnection = {} as IConnection;

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

  const db = await mongoose.connect(MONGODB_URI);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;
