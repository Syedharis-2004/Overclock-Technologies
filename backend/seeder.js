const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/business_web');
    console.log('MongoDB Connected for Seeder...');
  } catch (err) {
    console.error('Error connecting to DB:', err.message);
    process.exit(1);
  }
};

const createAdminUser = async () => {
  await connectDB();
  try {
    const adminEmail = 'admin@overclock.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`Admin user already exists: ${adminEmail}`);
    } else {
      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: 'password123',
        role: 'admin'
      });
      console.log(`Admin user created successfully!`);
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: password123`);
    }
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
