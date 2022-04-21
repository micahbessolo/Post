import Express from "express";
import path from 'path';
import { URL } from "url";

const __dirname = new URL('.', import.meta.url).pathname


const app = Express();
const port = 3000;
app.use(Express.static('public'))

//hello world
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/form.html'));
})

// api post
app.post('/api', (req, res) => {
    console.log("hello there")
    console.log(req.body)
});


app.listen(port, () => console.log("listening on port" + port))