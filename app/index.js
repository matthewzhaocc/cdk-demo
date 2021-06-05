const express = require("express");
const morgan = require("morgan");
// http router
const app = express();

// express json parser
app.use(express.json());

// logger
app.use(morgan("common"));

// in memory database to use
let memoryDb = new Map();

// add new shortened URL
app.post("/new", async (req, res) => {
  const token = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 7);
  memoryDb.set(token, req.body.url);
  await res.json({ token: token });
});

// index route
app.get('/', async (req, res) => {
    res.send('Healthy!')
})

// redirect route
app.get("/:url", async (req, res) => {
  await res.redirect(memoryDb.get(req.params.url));
});

// start application
app.listen(process.env.PORT || 3000, () => {
  console.log(`application listening on port ${process.env.PORT || 3000}`);
});
