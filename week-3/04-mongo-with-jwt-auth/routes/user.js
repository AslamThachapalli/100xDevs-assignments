const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken")
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index")
const jwtPassword = require("../utils/jwtPassword")
const { hashPassword, comparePassword } = require("../utils/hashing")

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPass = await hashPassword(password);

    const user = new User({
        username,
        password: hashedPass,
    })

    user.save().then(() => res.status(201).json({
        message: 'User created successfully',
    }))
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username }).exec();

    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    const hashPass = user.password;
    const result = comparePassword(password, hashPass);

    if (!result) {
        res.status(401).send("Wrong Credentials");
        return;
    }

    const token = jwt.sign({ username }, jwtPassword);
    res.status(200).json({ token });
});

router.get('/courses', userMiddleware, async (req, res) => {
    const courses = await Course.find({}, { _id: 0, __v: 0 });

    res.status(200).json({ courses })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const id = req.params.courseId;

    const authHeader = req.headers.authorization;
    const tokenArray = authHeader.split(" ");
    const token = tokenArray[1];

    const course = await Course.findOne({ id }).exec();

    if (!course) {
        res.status(404).json({
            message: "The requested course doesn't exists",
        })
        return;
    }

    const decoded = jwt.decode(token);
    const username = decoded.username;

    const user = await User.findOne({ username });

    if (user.purchasedCourses.includes(course.id)) {
        res.status(409).json({
            message: 'Course already purchased',
        });
        return;
    }
    user.purchasedCourses.push(course.id);

    await user.save();
    res.status(201).json({
        message: 'Course purchased successfully',
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const authHeader = req.headers.authorization;
    const tokenArray = authHeader.split(" ");
    const token = tokenArray[1];

    const decoded = jwt.decode(token);
    const username = decoded.username;

    const user = await User.findOne({ username });
    const purchasedCoursesIds = user.purchasedCourses;

    const purchasedCourses = await Course.find({}, { _id: 0, __v: 0 }).where('id').in(purchasedCoursesIds).exec();
    res.status(200).json({
        purchasedCourses: purchasedCourses,
    })
});

module.exports = router