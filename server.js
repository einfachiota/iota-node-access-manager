var paymentModule = require('iota-payment')
var express = require('express')
var app = express()
var bodyParser = require("body-parser");
var cors = require('cors');
const readline = require('readline');
var CronJob = require('cron').CronJob;

var pass = require("pass");
const fs = require('fs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log("__dirname", __dirname)

app.use('/secret', express.static('secret'));
app.use('/', express.static('frontend/dist'));


app.post("/register", function (req, res) {

    var name = req.body.name;

    // check if name already exist
    checkIfNameExist(name).then(found => {
        if (found) {
            res.send({ status: "error", message: "Name already exists." });
        } else {
            if (name.length >= 4) {

                let password = generatePassword();

                // Store hash in your password DB.
                let message = 'Payment created.'

                var date = new Date();
                date.setDate(date.getDate() + 30);
                var timestamp = Math.round(date.getTime() / 1000)
;

                pass.generate(password, function (error, hash) {
                    if (error) {
                        console.log("Error occured: " + error.message);
                        return;
                    }

                    let data = {
                        name, 
                        password,
                        hash,
                        type: "registration",
                        expiration_on: timestamp
                    }

                    paymentModule.payments.createPayment(0, data).then(payment => {
                        console.log(payment)
                        let response = {
                            status: 'OK',
                            payment,
                            message
                        }
                        response.password = password;
                        res.send(response);
                    })

                });



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

        }
    })
});


app.post("/charge", function (req, res) {

    var name = req.body.name;

    // check if name exist
    checkIfNameExist(name).then(row => {


        if (!row) {
            console.log("Name not found.")
            res.send({ status: "error", message: "Name not found." });
        } else {
            console.log("Name found: ", row)

            // Store hash in your password DB.
            let message = 'Payment created.'
            var hash = row.split(':')[1]
            var timestamp = row.split(':')[2]
            let date = new Date(timestamp * 1000);
            console.log("date")
            console.log(date)
            date.setDate(date.getDate() + 30);
            var new_timestamp = Math.round(date.getTime() / 1000)

            let data = {
                name,
                hash,
                type: "charge",
                expiration_on: new_timestamp
            }

            // 
            paymentModule.payments.createPayment(0, data).then(payment => {
                console.log(payment)
                let response = {
                    status: 'OK',
                    payment,
                    message
                }
                res.send(response);
            })

        }
    })
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

    if (data.type == "registration") {
        console.log('payment success!', payment);
        let append_string = data.name + ":" + data.hash + ":" + data.expiration_on + "\n"
        fs.appendFile('secret/htpasswd.txt', append_string, function (err) {
            if (err) throw err;
            console.log('Saved: ', append_string);
        });
    } else if (data.type == "charge"){

        let string = data.name + ":" + data.hash + ":" + data.expiration_on
        replaceEntry(string)
    }


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

function checkIfNameExist(name) {

    return new Promise(function (resolve, reject) {

        let result = false
        let rl = readline.createInterface({
            input: fs.createReadStream('secret/htpasswd.txt')
        });

        // event is emitted after each line
        rl.on('line', function (line) {
            entry_name = line.split(':')[0]
            if (name == entry_name) {
                result = line
            }

        });
        rl.on('close', function (line) {
            resolve(result);
        });
    });

}

function replaceEntry(new_entry) {
    var text = fs.readFileSync('secret/htpasswd.txt', 'utf8')

    console.log("text", text)
    
    let lines = text.split('\n');
    
    console.log("lines", lines)
    let new_entry_name = new_entry.split(':')[0]
    let entry_name = ""
    let found_index = null
    lines.forEach(function(line, index) {
        entry_name = line.split(':')[0]
        if (entry_name == new_entry_name) {
            console.log("found on index: ", index)
            found_index = index
        }
    })
    // remove one line, starting at the first position
    lines.splice(found_index, 1);
    console.log("lines", lines)
    lines.push(new_entry)
    console.log("lines + new_entry:", lines)
    let new_file = ""
    lines.forEach(function (line) {
        if (line) {
            new_file += line + "\n"
        }
    })
    console.log("new_file", new_file)

    // Write data in 'Output.txt' . 
    fs.writeFile('secret/htpasswd.txt', new_file, (err) => {

        // In case of a error throw err. 
        if (err) throw err;

    }) 
}



const job = new CronJob('*/10 * * * * *', function () {
    const d = new Date();
    var timestamp_now = Date.parse(d);

    console.log('At 10 Seconds:', d);
    console.log('At 10 Seconds:', timestamp_now);
    // check 
    let rl = readline.createInterface({
        input: fs.createReadStream('secret/htpasswd.txt')
    });

    // event is emitted after each line

    let array = []

    rl.on('line', function (line) {
        entry_timestamp = line.split(':')[2]
        if (timestamp_now <= entry_timestamp) {
            array.push(line)
        }

    });
    rl.on('close', function () {
        fs.writeFile('secret/htpasswd.txt', '', function () { console.log('done') })
        array.forEach(line => {
            line = line + '\n'
            fs.appendFile('secret/htpasswd.txt', line, function (err) {
                if (err) throw err;
                console.log('Saved: ', line);
            });
        })
    });
});
console.log('Run background job instantiation.');
//job.start();