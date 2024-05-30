const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://arjpatel:ilbbaicnl@merncluster.rjtkjzh.mongodb.net/?retryWrites=true&w=majority&appName=MernCluster';

const mongoDB = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB', err));
}

module.exports = mongoDB;