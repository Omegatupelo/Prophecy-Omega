const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Prophecy: The Omega War Chronicles"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About the Author"
  });
});

app.get("/characters/:name", (req, res) => {
  const name = req.params.name.toLowerCase();

  res.render(name, {
    pageTitle: name.charAt(0).toUpperCase() + name.slice(1),
  }, (err, html) => {
    if (err) {
      return res.status(404).send("Character not found");
    }
    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});