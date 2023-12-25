const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://aslamdevelop:Ass5Mongo@cluster0.vryu7ml.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [String],
});

const CourseSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}