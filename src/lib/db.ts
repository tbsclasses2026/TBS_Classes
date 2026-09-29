import mongoose from 'mongoose';
import dns from 'dns';

// Bypass ISP/Local DNS blocks (querySrv ECONNREFUSED) by forcing Google DNS
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (error) {
  console.warn('Failed to set custom DNS servers:', error);
}

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  // We don't throw during build time so Next.js doesn't crash if env is missing
  console.warn('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      family: 4, // Use IPv4, skip trying IPv6
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
