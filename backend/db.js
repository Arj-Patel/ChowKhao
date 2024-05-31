const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://arjpatel:ilbbaicnl@merncluster.rjtkjzh.mongodb.net/chowKhao?retryWrites=true&w=majority&appName=MernCluster';
const foodItemSchema = new mongoose.Schema({}, { collection: 'food_items', strict: false });
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connection Successful');
        
        const foodItems = await FoodItem.find({});
        // console.log(foodItems);
    } catch (err) {
        console.log('MongoDB Connection Failed');
    }
}

module.exports = mongoDB;