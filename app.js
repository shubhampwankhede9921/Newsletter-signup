const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function (req, res) {

    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.mail;
    

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }

            }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/14d84494b7";
    const option={
         method:"POST",
         auth:"shubham:58c75034b3d7afe328d6ac64596647cf-us14"
     }

    const requests=https.request(url,option,function(responce){
        if(responce.statusCode===200){
            res.sendFile(__dirname+"/succes.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
 
    });
    requests.write(jsonData);
    requests.end();



});

app.post("/failure.html",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function () {
    console.log("server is started on 3000...");
});

// api id
// 58c75034b3d7afe328d6ac64596647cf-us14
// list Id
// 14d84494b7

