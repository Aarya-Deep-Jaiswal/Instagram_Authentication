const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));


let users = [
    {
        username: "Om Singh",
        password: "13gv@8193",
        dob: '1999-09-13',
    },
    {
        username: 'Raj Prakash',
        password: 'njcbu&^kn',
        dob: '1987-09-30',
    },
    {
        username: 'Prash',
        password: 'nj&12',
        dob: '2002-04-21',
    }
];


app.listen(port, (req, res) => {
    console.log("Listening on port 8080");
});

app.get("/",(req,res)=>{
    res.redirect("/home")
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.get("/SignUp", (req, res) => {
    res.render("SignUp.ejs");
});

app.post("/SignUp", (req, res) => {
    let { username, password, dob } = req.body;
    let user = users.push({ username, password, dob });
    console.log(user);
    res.redirect("/home");
});

app.get("/user/details", (req, res) => {
    res.render("details.ejs", { users });
});

app.get("/SignIn", (req, res) => {
    res.render("SignIn.ejs");
});

app.post("/SignIn", (req, res) => {
    let { username, password } = req.body;
    let user = users.find((p) => username === p.username);
    if (!user) {
        res.render("invalid.ejs");
    }
    else {
        if (user.username == username && user.password == password) {
            res.render("access.ejs");
        }
        else {
            res.render("wrong.ejs");
        }
    }
})
