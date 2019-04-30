const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path       = require('path');

const app = express();
// set static method

app.use(express.static(path.join(__dirname,"client")));
app.use(bodyParser.json());
const publicVapidKey = 'BB9ISCKuGYRHa1-_OxiAXhrLmemrCGkieysFVh7U8cOgMJ_3dzBwogq9k7uXZTJt9vUTZ3LSy1e1lTHHxW0mjhs';
const privateVapidKey = 'mWLTQFFAAh9VMzxCOz8tsQKyRAkmA2vbXrh-AqDIt_8';

webpush.setVapidDetails('mailto:aamodkumar.tiwari90@gmail.com',publicVapidKey,privateVapidKey);

// subscribe Root
app.post('/subscribe',(req,res)=>{
    // Get pushSubscription object
    const subscription = req.body;

    // send 201 -resource created
    res.status(201).json({});

    // created payload
    const payload = JSON.stringify({title:'Push Text'});

    // Pass object into sendNotification function
    webpush.sendNotification(subscription,payload).catch(err => console.error(err));
});
const port = 5000;
app.listen(port,()=>console.log(`setver started on port ${port}`));


