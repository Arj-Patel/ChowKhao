const express = require('express')
const app = express()
const port = 5000
const mongodDB = require('./db');
const cors = require('cors');
const createUserRouter = require('./Routes/createUser');
const displayDataRouter = require('./Routes/DisplayData');

// Connect to the database
mongodDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header(
    'Access-Control-Allow-Credentials',
    "Origin , X-Requested-With, Content-Type, Accept, Authorization"
  )
  next();
})

// app.use('/api', createUserRouter);
// app.use('/', createUserRouter);
// app.use('/login', createUserRouter);
app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})