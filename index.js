require('dotenv').config()

const express = require('express');
const app = express();
const { response } = require('express');
const mongoose = require('mongoose');
app.use(express.static('interface'));
app.use(express.json({ limit: '1mb' }));

app.listen(3000, () => console.log('listening at http://localhost:3000/'));

// database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// router
const formRouter = require('./routes/form')
app.use('/form', formRouter)

// shows html
app.get('/', function(req,res) {
    res.sendFile('form.html', { root: __dirname })
});

// posts form
app.post('/api', (req, res) => {
    const info = req.body;
    console.log(info);
    res.json({
      status: 'success',
      name: info.name,
      email: info.email,
      message: info.message
    });
});

