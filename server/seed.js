const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Award = require('./models/Award');
const Client = require('./models/Client');

dotenv.config();

const awards = [
    {
        awardId: "AWD001",
        awardCategory: "innovative-tech-startup",
        eventName: "Global Achievers Council Awards",
        eventDate: "2025-02-21",
        images: ["https://res.cloudinary.com/demo/image/upload/v1652343521/sample.jpg"]
    },
    {
        awardId: "AWD002",
        awardCategory: "employee-of-the-year",
        eventName: "Annual Excellence Gala",
        eventDate: "2024-12-15",
        images: ["https://res.cloudinary.com/demo/image/upload/v1652343521/sample.jpg"]
    }
];

const clients = [
    {
        clientId: "CL001",
        clientName: "John Doe",
        email: "john@technosprint.net",
        password: "password123",
        companyName: "Technosprint Info Solutions",
        allowedAwardCategories: ["innovative-tech-startup", "employee-of-the-year"]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Award.deleteMany({});
        await Client.deleteMany({});
        await Award.insertMany(awards);

        for (const client of clients) {
            await Client.create(client);
        }

        console.log("Database Seeded!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
