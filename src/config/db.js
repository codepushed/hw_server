const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/homework";

const conectWithDb = () => {
  
     mongoose.connect(mongoURI, {
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