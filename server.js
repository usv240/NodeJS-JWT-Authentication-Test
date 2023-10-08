const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const secretKey = 'My super secret key';
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Fix typo in headers
    next();
});

let users = [
    {
        id: 1,
        username: 'Ujwal',
        password: '240'
    },
    {
        id: 2,
        username: 'Vanjare',
        password: '469'
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/dashboard', (req, res) => {
    res.json({
        success: true,
        myContent: 'Secret content that only logged-in people can see'
    });
});

app.get('/api/settings', (req, res) => {
    res.json({
        success: true,
        sContent: 'Secret settings page by Ujwal Suresh Vanjare'
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    for (let user of users) {
        if (username == user.username && password == user.password) {
            let token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '3m' });
            res.json({
                success: true,
                err: null,
                token
            });
            return; 
        }
    }

    
    res.status(401).json({
        success: false,
        token: null,
        err: 'Username or password is incorrect'
    });
});

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});
