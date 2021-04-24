const express = require('express');
const app = express();
app.use(express.json());

const dobs = [{"id":1,"first_name":"Etan","last_name":"Kilby","birthday":"3/5/2020","gender":"Genderqueer"},
{"id":2,"first_name":"Dynah","last_name":"Tylor","birthday":"5/8/2020","gender":"Bigender"},
{"id":3,"first_name":"Bird","last_name":"Londesborough","birthday":"1/11/2020","gender":"Male"},
{"id":4,"first_name":"Cher","last_name":"Ramplee","birthday":"8/24/2020","gender":"Male"},
{"id":5,"first_name":"Marena","last_name":"Kingzet","birthday":"8/16/2020","gender":"Agender"},
{"id":6,"first_name":"Swen","last_name":"Guynemer","birthday":"2/20/2020","gender":"Male"},
{"id":7,"first_name":"Phaidra","last_name":"Ifill","birthday":"6/27/2019","gender":"Bigender"},
{"id":8,"first_name":"Hyacinthe","last_name":"Lampet","birthday":"2/29/2020","gender":"Polygender"},
{"id":9,"first_name":"Willy","last_name":"Colwill","birthday":"8/15/2020","gender":"Polygender"},
{"id":10,"first_name":"Omar","last_name":"Clarridge","birthday":"11/26/2020","gender":"Genderqueer"}]

// READ Request 
app.get('/', (req,res)=>{
    res.send('REST API Example');
});

app.get('/api/dobs', (req,res)=>{
    res.send(dobs);
});

app.get('/api/dobs/:id', (req,res) => {
    const dob = dobs.find(c=> c.id === parseInt(req.params.id));
    if (!dob) res.status(404).send("<h2>Can't find the dob in question!</h2>");
    res.send(dob);
});

// CREATE Request
app.post('/api/dobs', (req,res)=>{
    const {error} = validateDob(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const dob = {
        id: dobs.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        gender: req.body.gender
    };
    dobs.push(dob);
    res.send(dob);
});

// UPDATE Request 
app.put('/api/dobs/:id', (req,res) => {
    const dob = dobs.find(c=> c.id === parseInt(req.params.id));
    if (!dob) res.status(404).send("<h2>Can't update the dob!</h2>");

    const {error} = validateDob(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    dob.first_name = req.body.first_name,
    dob.last_name = req.body.last_name,
    dob.birthday = req.body.birthday,
    dob.gender = req.body.gender;
    res.send(dob);
})

// DELETE Request
app.delete('api/dobs/:id', (req,res) => {
    const dob = dobs.find(c=> c.id === parseInt(req.params.id));
    if (!dob) res.status(404).send("<h2>Not Found!</h2>");

    const index = dobs.indexOf(dob);
    dobs.splice(index,1);

    res.send(dob);
})

function validateDob(dob) {

    return true;
}

const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on port ${port}`));