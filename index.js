const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

let hashedPass = '';
app.set('view engine', 'ejs');
app.use(express.urlencoded({extented:false}))

app.get('/',(req, res)=>{
    res.render('index.ejs');
})
// app.get('/compare', (req, res)=>{
//     res.render('compare.ejs')
// })
app.post('/hasPass', async (req, res)=>{
    hashedPass = await bcrypt.hash(req.body.pass, 10);
    // console.log(req.body.pass);
    // console.log(hashedPass);
    res.render('compare.ejs');
    //res.render('compare.ejs');
})
app.post('/comparePass', async (req, res)=>{
    console.log(req.body.pass);
    console.log(hashedPass);
    let isequal = await bcrypt.compare(req.body.pass, hashedPass);
    console.log(isequal);
    if(isequal){
        res.send('Equal')
    }
    else{
        res.send("Not Equal");
    }
})
app.listen(3001, (err)=>{
    if(err){
        console.log("Error in listening", err);
    }
    console.log("server is listening on port", 3001);
})