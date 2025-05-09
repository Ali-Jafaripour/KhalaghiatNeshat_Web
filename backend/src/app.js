const express = require("express")
const app = express()
const cors = require("cors")
const authRouter = require("./routes/auth")
const gameRouter = require("./routes/creativeDay")
const session = require('express-session');

console.log(`[app] Starting backend server...`);

app.use(express.json())
console.log(`[app] Middleware configured: express.json()`);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
console.log(`[app] CORS configured with origin: http://localhost:5173`);

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // در محیط لوکال HTTP باید false باشه
    httpOnly: true
  }
}));
console.log(`[app] Session middleware configured`);

app.use(require('cookie-parser')());
console.log(`[app] Cookie parser middleware configured`);

app.use("/auth", authRouter);
console.log(`[app] Auth routes mounted at /auth`);

app.use("/game", gameRouter);
console.log(`[app] Game routes mounted at /game`);

app.use('/creativeDay', require('./routes/creativeDay'));
console.log(`[app] Creative Day routes mounted at /creativeDay`);

console.log(`[app] Server configuration complete and ready`);

module.exports = app