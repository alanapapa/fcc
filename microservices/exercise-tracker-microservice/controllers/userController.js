const moment = require("moment")
const Users = require('../model/Users')

const postDate = (date) => {
  if (date) return new Date(date).toDateString()
  return new Date().toDateString()
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select('_id username __v');
    res.json(users)
  } catch(err) {
    if (err) return console.log(err)
  }
};

exports.getUserLogs = async (req, res) => {
  try {
    let fromDate = new Date(req.query.from);
    let toDate = new Date(req.query.to);
    let limit = Number(req.query.limit);

    await Users.findById({_id: req.params._id}, (err, user) => {
      if(!user) res.type('txt').send(`<pre>Cast to ObjectId failed for value "${req.params._id}" at path "_id" for model "Users"</pre>`)

      let logs = user.log;
      
      if (isValidDate(toDate)){
        logs = logs.filter((item) => (item.date >= fromDate && item.date <= toDate));
      } else if(isValidDate(fromDate)){
        logs = logs.filter((item)=>(item.date >= fromDate))
      }
      if (!isNaN(limit) && logs.length > limit){
        logs = logs.slice(0,limit);
      }

      if (logs.length > limit) {
        logs = logs.slice(0, limit)
      }
      
      res.json({
          _id: user._id,
          username: user.username,
          count: user.log.length,
          log: logs.map(log => ({description:log.description,duration:parseInt(log.duration),date: postDate(log.date)}))
        })
      });
  } catch(err) {
    if (err) return console.log(err)
  }
}

exports.createUser = async (req, res) => {
  try {
    let user = await Users.findOne({ username: req.body.username });
    const errorr = `Username already taken`;
    if (user) res.type('txt').send(errorr);
    user = new Users(req.body)
    user.save(err => {
      return console.log(err)
    })
    res.json({
      username: user.username,
      _id: user._id
    })
  } catch(err) {
    console.log(err)
  }
}

exports.addExercises = async (req, res) => {
  try {    
    const {_id, description, duration, date} = req.body;

    dur = parseInt(duration) || "text";
    if (dur === "text") {
      return res.type('txt').send(`Cast to Number failed for value "${duration}" at path "duration"`)
    }
    const exercise = {
      description,
      duration: parseInt(duration),
      date: postDate(date)
    }

    await Users.findOneAndUpdate({_id: req.params.userId}, { $addToSet: {log: exercise}}, (err, user) => {
      if(!user) return res.type("txt").send("not found")
      return res.json({
        _id: user._id,
        username: user.username,
        date: exercise.date,
        duration: exercise.duration,
        description: exercise.description
      })
      });
  } catch(err) {
    return console.log(err)
  }
}

exports.getExercises = async (req, res) => {
  await Users.findOne({_id: req.params.userId}, (err, user) => {
    if(!user) return res.type('txt').send('not found')
    return res.json(user.log)
  })
}