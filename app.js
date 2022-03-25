//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        'members': [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }],
    }

    var jsonData = JSON.stringify(data)

    console.log(firstName, lastName, email);
    var options = {
        url: 'https://usX.api.mailchimp.com/3.0/lists/Listid', // IN X you have to write your id that mailchimp provides like us10,us4 etc.which will be in your api key & in list id you have to write your unique/list id that mail chimp provides
        method: 'POST',
        headers: {
            'Authorization': "brijesh8128 api-key"
        },
        body: jsonData
    }

    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode == 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

app.post("/failure.html", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running");
});