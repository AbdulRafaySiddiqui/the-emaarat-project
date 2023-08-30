const express = require("express");
const path = require("path");
const sassMiddleware = require("node-sass-middleware"); // Import the SCSS middleware

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "pug");

// Set up SCSS middleware for compiling SCSS to CSS
app.use(
  sassMiddleware({
    src: path.join(__dirname, "styles"), // Location of your SCSS files
    dest: path.join(__dirname, "public"), // Compiled CSS will be placed here
    debug: true, // Set to true for debugging
    outputStyle: "compressed", // Set the desired output style (nested, expanded, compact, compressed)
  })
);

console.log(path.join(__dirname, "styles"));
console.log(path.join(__dirname, "public/css"));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Rest of your code...
app.get("/", (req, res) => {
  res.render("index", {
    title: "The Emaarat Project",
  });
});

// Reload endpoint for browser-sync
app.get("/reload", (req, res) => {
  res.send("Reloading...");
  process.emit("SIGUSR2", "SIGUSR2");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
