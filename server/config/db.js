const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Successfully connected to database');
  } catch (error) {
    console.error('❌ Error connecting to database');
    console.error(error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
