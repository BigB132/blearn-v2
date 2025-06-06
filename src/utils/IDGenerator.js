const Data = require('../models/data')

// Function to generate unique ID with collision checking
async function generateUniqueId(maxRetries = 100) {
    let attempts = 0;
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    while (attempts < maxRetries) {
        let newId = "";

        for (let i = 0; i < 16; i++) {
            newId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        try {
        // Check if ID already exists
        const existing = await Data.findOne({ id: newId });
        
        if (!existing) {
            return newId; // ID is unique, return it
        }
        
        attempts++;
        console.log(`ID collision detected: ${newId}. Attempt ${attempts}/${maxRetries}`);
        
        } catch (error) {
        console.error('Error checking ID uniqueness:', error);
        throw error;
        }
    }

    throw new Error(`Failed to generate unique ID after ${maxRetries} attempts`);
}

module.exports = { generateUniqueId }
