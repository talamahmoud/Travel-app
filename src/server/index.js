const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('dist'));

app.get('/', (req, res)=> {
    res.sendFile('index.html',{root: 'dist'});
})

const server = app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})