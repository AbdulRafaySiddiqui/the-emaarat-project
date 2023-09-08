import express from "express";
import sassMiddleware from "node-sass-middleware";

const app = express();
const port = process.env.PORT || 3000;

app.set("views", "src/views");
app.set("view engine", "pug");

// Set up SCSS middleware for compiling SCSS to CSS
app.use(
  sassMiddleware({
    src: "styles", // Location of your SCSS files
    dest: "public", // Compiled CSS will be placed here
    debug: true, // Set to true for debugging
    outputStyle: "compressed", // Set the desired output style (nested, expanded, compact, compressed)
  })
);

// Serve static files from the 'public' directory
app.use(express.static("public"));

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
