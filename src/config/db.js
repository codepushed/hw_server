const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const conectWithDb = () => {
  
     mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
     })
     .then(console.log(`DB GOT CONNECTED`))
     .catch(error => {
        console.log(`DB CONNECTION ISSUES`);
        console.log(error)
        process.exit(1)
     });
};

module.exports = conectWithDb;