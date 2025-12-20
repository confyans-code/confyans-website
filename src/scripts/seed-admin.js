const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/confyans';

const AdminUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@confyans.com';
        const password = 'password123'; // Change this!

        const exists = await AdminUser.findOne({ email });
        if (exists) {
            if (!exists.name) {
                exists.name = "Admin User";
                await exists.save();
                console.log('Updated existing admin user with Default Name');
            } else {
                console.log('Admin user already exists and valid');
            }
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await AdminUser.create({
            name: 'Admin User',
            email,
            password: hashedPassword,
        });

        console.log(`Admin user created: ${email} / ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
