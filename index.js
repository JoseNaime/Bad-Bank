const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');

app.use(express.static('client/build'));
app.use(cors());

// create user account
app.post('/account/create/:name/:email/:password', (req, res) => {
    dal.create(req.params.name, req.params.email, req.params.password)
        .then(user => {
            console.log(user);
            res.send(user);
        })
        .catch(err => {
            res.send(err);
        });
});

// get all accounts
app.get('/account/all', (req, res) => {
    dal.getAll()
        .then(doc => {
            console.log(doc);
            res.send(doc);
        })
        .catch(err => {
            res.send(err);
        });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
