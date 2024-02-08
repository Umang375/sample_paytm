const express = require("express");
const cors = require('cors')
// const dotenv = require('dotenv');
const mainRouter = require("./routes/index");
const app = express();
const PORT = 5000;

require('dotenv').config({ path: '../.env' });
app.use(cors(
    // {
    //     origin : [`${process.env.FRONTEND_URL}`, `http://localhost:3000`], credentials: true
    // }
))
app.use(express.json());

app.use('/api/v1', mainRouter);

app.listen(PORT, function(err) {
    if (err) console.log(err);
    else console.log(`listening on port ${PORT}`);
});


