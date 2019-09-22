var paymentModule = require('iota-payment')
var express = require('express')
var app = express()
var bodyParser = require("body-parser");
var cors = require('cors');

var pass = require("pass");
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log("__dirname", __dirname)

app.use('/secret', express.static('secret'));


app.post("/register", function (req, res) {

    var name = req.body.name;

    if (name.length >= 4) {
        console.log("ame", name)
        // create stuff

        let password = generatePassword();
        
        // Store hash in your password DB.
        let message = 'Payment created.'
        console.log("message: ", message)
        console.log("name", name)
        console.log("password", password)

        let data = {
            name,
            password
        }

        paymentModule.payments.createPayment(0, data).then(payment => {
            console.log(payment)
            let response = {
                status: 'OK',
                payment,
                message
            }
            res.send(response);
        })
      

    } else {
        console.log("Please provide an name wich has more then 4 characters.")
        let message = 'Please provide an name wich has more then 4 characters.'

        let response = {
            status: 'Error',
            name,
            password,
            message
        }
        res.send(response);
    }

});

var options = {
    mount: '/payments',
    value: 1,
    websockets: true
    // ...
}

let server = paymentModule.createServer(app, options)

// Start server with iota-payment module on '/custom'
server.listen(3000, function () {
    console.log(`Server started on http://localhost:3000 `)
})

//Create an event handler which is called, when a payment was successfull
var onPaymentSuccess = function (payment) {
    let data = JSON.parse(payment.data)

    pass.generate(data.password, function (error, hash) {
        if (error) {
            console.log("Error occured: " + error.message);
            return;
        }


        console.log('payment success!', payment);
        let append_string = data.name + ":" + hash + "\n"
        fs.appendFile('secret/htpasswd.txt', append_string, function (err) {
            if (err) throw err;
            console.log('Saved: ', append_string);
        });


    });
  

}

paymentModule.on('paymentSuccess', onPaymentSuccess);

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}