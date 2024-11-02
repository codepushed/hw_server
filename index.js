const app = require('./src/app');
const connectWithDb = require("./src/config/db")
require('dotenv').config();

connectWithDb();


app.listen(process.env.SERVER_PORT || 3002, () => {
    console.log(`Server is running at port: ${process.env.SERVER_PORT}`)
});