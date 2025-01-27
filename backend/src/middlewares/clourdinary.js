// src/config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dmwp8u6ap",
    api_key: "238722723988965",
    api_secret: "BnQcNhCJhBEUr8CKmOpeyoHmjuY"
});

module.exports = cloudinary;