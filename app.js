const express = require("express");
const path = require("path");
const request = require("request");
const chalk = require("chalk");
const app = express();
const PORT = process.env.PORT || 3000;

//Getting data from index.html
app.use(express.urlencoded({ extended: true }));
//Setting static folder
app.use(express.static(path.join(__dirname, "public")));

// Sign up form
app.post("/signup", (req, res) => {
  const { firstName, lastName, email } = req.body;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const postData = JSON.stringify(data);

  const options = {
    url: "/",
    method: "POST",
    headers: {
      Authorization: "auth /",
    },
    body: postData,
  };

  request(options, (err, response) => {
    if (err) {
      res.redirect("fail.html");
    } else {
      if (response.statusCode === 200) {
        res.redirect("success.html");
      } else {
        res.redirect("fail.html");
      }
    }
  });
});

app.listen(PORT, console.log(chalk`App is runing on: {magenta ${PORT}}`));
