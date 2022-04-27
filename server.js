// require npm express library 
const express = require('express');
// require method override library
const methodOverride = require('method-override');
// set up instance of express
const app = express();
// set up port variable
PORT = 4000;

//models//
// test Meme model to get initial routes working
const memes = require('./models/Meme');

//middleware//
//express static to find public folder/static css
app.use(express.static('public'));
// DELETE/UPDATE middle ware
app.use(methodOverride('_method'));
// body parser middleware
app.use(express.urlencoded({extended:false}));
//application view engine to render ejs
app.set('view engine', 'ejs');

//routes//
// new get route
app.get('/meme/new', (req, res) => {
    res.render('new.ejs');
});

// show get route
app.get('/meme/:id', (req, res) =>{
    const memeId = req.params.id;
    const context = {oneMeme: memes[memeId]}
    res.render('show.ejs', context);
});

// home index route redirects to home route
app.get('/meme/', (req, res) => {
    res.redirect('/');
});

// home get route
app.get('/', (req, res) => {
    const context = {memes:memes};
    res.render('index.ejs', context);
});

// "create" post route
app.post('/', (req,res) => {
    memes.push (req.body);
    res.redirect('/');
});

// delete/destroy route
app.delete('/meme/:id', (req,res) => {
    //need to change for backend
    memes.splice(req.params.id, 1)
    res.redirect('/');
})


// app.listen to server at given port
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});