const express = require('express');
const router = express.Router();
const Lectures = require('./../models/LectureLinks');

router.post("/create-live-course", async (req, res) => {
    try {
        const createCourse = {
            link: req.body.link,
            classname: req.body.classname,
            subjectname: req.body.subjectname,
            author : req.body.author ,
        }
        await Lectures.create(createCourse);
        return res.json({ message: "Course updated successfully", reward : "good job raju " });
    } catch (error) {
        console.error(req.path, error);
        return res
            .status(500)
            .json({ message: "Course update error" });
    }
});

router.get("/get-live-courses", async (req, res) => {
    try {
        const courses = await Lectures.find({ live: true });
        return res
            .json({ courses: courses });
    } catch (fetchError) {
        console.error(req.path, fetchError);
        return res
            .status(500)
            .json({ message: "Error in fetching course." });
    }
});

module.exports = router;