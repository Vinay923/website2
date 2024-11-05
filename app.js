const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blog')




const PORT = process.env.PORT || 3000; 
const dbURI = 'mongodb+srv://vinay:vinay@website1.q6bbi.mongodb.net/website1?retryWrites=true&w=majority&appName=website1';
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect(dbURI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));







app.get('/randomAPI/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result =>res.json(result))
        .catch(() => res.status(500).json({ error: 'An error occurred while saving the blog.' }))
});




app.get('/randomAPI/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => res.json(result))
        .catch(() => res.status(500).json({ error: 'An error occurred while saving the blog.' }))
})




app.post('/randomAPI/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.json(result))
        .catch(() => res.status(500).json({ error: 'An error occurred while saving the blog.' }))
});




app.delete('/randomAPI/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => res.json(result))
        .catch(() => res.status(500).json({ error: 'An error occurred while deleting the blog.' }))
})




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

