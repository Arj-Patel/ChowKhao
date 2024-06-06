const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://arjpatel:ilbbaicnl@merncluster.rjtkjzh.mongodb.net/chowKhao?retryWrites=true&w=majority&appName=MernCluster';
const foodItemSchema = new mongoose.Schema({}, { collection: 'food_items', strict: false });
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to the database');
        const fetched_data = await FoodItem.find({}).exec();
        const foodCategory =  await mongoose.connection.db.collection("food_category");
        const catData = await foodCategory.find({}).toArray();
        if(catData){
            global.food_items = fetched_data;
            global.food_category = catData;
            console.log('Food items:', global.food_items);
        }
    } catch (err) {
        console.log('Error connecting to database:', err);
    }
}

module.exports = mongoDB;