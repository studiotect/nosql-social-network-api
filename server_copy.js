const express = require('express');
const db = require('./config/connection');



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.post('/new-department/:department', async (req, res) => {
//   try {
//     const data = await Department.create({ name: req.params.department })
//     res.json({data})
//   } catch(err){
//     res.status(400).json({err} )
//   }
// });


app.get('/user', async (req, res) => {
  try {
    const result = await User.find({})
    res.status(200).json({result})
  } catch(err){
    res.status(400).json({err} )
  }
});

// app.get('/departments/:id', async (req, res) => {
//   try {
//     const result = await Department.findById(req.params.id)
//     res.status(200).json({result})
//   } catch(err){
//     res.status(400).json({err} )
//   }
// });

// app.put('/departments/:id', async (req, res) => {
//   try {
//     const updated = await Department.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     )
//     res.status(200).json(updated)
//       console.log(req.params)
//       console.log(req.body)
//   } catch {
//     res.status(400).json({err})
//   }
// })

// app.delete('/departments/:id', async (req, res) => {
//   try {
//     const deleted = await Department.findByIdAndDelete(
//       req.params.id,
//     )
//     res.status(200).json(deleted)
//       console.log(req.params)
//       console.log(req.body)
//   } catch {
//     res.status(400).json({err})
//   }
// })

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
