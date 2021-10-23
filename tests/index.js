const express = require("express");
const cors = require("cors");
const subpress = require("../index");

const hello = require("./hello"), dynamic = require("./dynamic"); // Some express routers

const app = express();
app.use(cors());
app.use(subpress("hello", hello)); // Use subpress as a middleware; this is the hello subdomain, e.g. http://hello.example.com
app.use(subpress("*", dynamic)); // Wildcard subdomain

app.get("/", (req, res) => res.send("Hello world!"));
app.listen(3000, function() {
	console.log("Running Express with Subpress on port 3000!");
});