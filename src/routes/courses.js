const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add',isLoggedIn, (req, res) => {
 res.render('courses/add')
});

router.post('/add', isLoggedIn,async (req, res) => {
 const { title, description } = req.body;
 const newCourse = {
  title,
  description,
  user_id: req.user.id
 }
 await pool.query('INSERT INTO courses set ?', [newCourse]);
 req.flash('success', 'Course Saved Successfully');
 res.redirect('/courses');
})

router.get('/',isLoggedIn, async (req, res) => {
  const courses = await pool.query('SELECT * FROM courses WHERE user_id = ?', [req.user.id]);
  console.log(courses)
  res.render('courses/list', {courses})
  
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM courses WHERE ID = ?', [id]);
    req.flash('success', 'Course Removed Successfully');
    res.redirect('/courses');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const courses = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    res.render('courses/edit', {course: courses[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description} = req.body; 
    const newCourse = {
        title,
        description,
    };
    await pool.query('UPDATE courses set ? WHERE id = ?', [newCourse, id]);
    req.flash('success', 'Course Updated Successfully');
    res.redirect('/courses');
});
module.exports = router;