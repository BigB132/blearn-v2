require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserData = require('./src/models/userData');

const hashExistingPasswords = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.uri);
    console.log('Connected to MongoDB for password migration.');

    // Find users with plain text passwords.
    // This query finds users whose password does NOT start with the bcrypt hash prefix '$2b$'.
    // This is a simple way to identify passwords that have not been hashed yet.
    const users = await UserData.find({ password: { $not: /^\$2b\$.*/ } });

    if (users.length === 0) {
      console.log('No plain text passwords found to migrate.');
      return;
    }

    console.log(`Found ${users.length} user(s) with plain text passwords. Starting migration...`);

    // Loop through each user and update their password
    for (const user of users) {
      const plainPassword = user.password;

      // It's possible a password could be an empty string or null, so we should handle that.
      if (!plainPassword) {
        console.warn(`User ${user.userName} has an empty password. Skipping.`);
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      user.password = hashedPassword;
      await user.save();
      console.log(`Successfully migrated password for user: ${user.userName}`);
    }

    console.log('Password migration completed successfully.');

  } catch (error) {
    console.error('An error occurred during password migration:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

// Run the migration script
hashExistingPasswords();
