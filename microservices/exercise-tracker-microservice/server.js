const express = require('express')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
const apiUsers = require("./routes/apiUsers");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  })
mongoose.set('returnOriginal', false);

app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    errCode = 400
    const keys = Object.keys(err.errors)
    errMessage = err.errors[keys[0]].message
  } else {
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

app.use('/api/users', apiUsers);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.get('*', (req, res) => res.send(`<pre>not found</pre>`))




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
