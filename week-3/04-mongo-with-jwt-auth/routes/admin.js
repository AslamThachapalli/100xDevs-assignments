const { Router } = require("express");
const jwt = require('jsonwebtoken')
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index")
const jwtPassword = require("../utils/jwtPassword")
const {hashPassword, comparePassword} = require("../utils/hashing")
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPass = await hashPassword(password);

    const admin = new Admin({
        username,
        password: hashedPass,
    })

    admin.save().then(() => res.status(201).json({
        message: "Admin created successfully"
    }));
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({ username }).exec();

    if (!user) {
        res.status(404).send("user not found")
        return;
    }

    const hashPass = user.password;
    const result = await comparePassword(password, hashPass);

    if (result) {
        const token = jwt.sign({ username }, jwtPassword);

        res.status(200).json({ token });
    } else {
        res.status(401).send("Wrong Credentials")
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const course = req.body;
    const id = Math.floor(Math.random() * 100000);

    course["id"] = id;

    try {
        const newCourse = new Course(course);

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', courseId: id })
    } catch (e) {
        if (e.name === "ValidationError") {
            let errors = {};

            Object.keys(e.errors).forEach((key) => {
                errors[key] = e.errors[key].message;
            });

            return res.status(400).send(errors);
        }
        res.status(500).send("Something went wrong");
    }


});

router.get('/courses', adminMiddleware, async (req, res) => {
    const allCourses = await Course.find({},{_id:0, __v:0});

    res.status(200).json({courses: allCourses});
});

module.exports = router;