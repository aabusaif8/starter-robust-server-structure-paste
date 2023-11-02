const express = require("express");
const app = express();
const pastesRouter = require("./pastes/pastes.router")

app.use(express.json())

// app.use("/pastes/:pasteId", (req,res,next) =>{
//   const { pasteId } = req.params
//   const foundPaste = pastes.find((paste) =>paste.id === Number(pasteId))

//   if(foundPaste) {
//     res.json({data:foundPaste})
//   }else {
//     next({
//       status: 404,
//       message: `Paste id not found: ${pasteId}`
//     })
//   }
// })

const pastes = require("./data/pastes-data")

app.use("/pastes", pastesRouter)

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "something went wrong"} = error
  res.status(status).json({ error: message })
});

module.exports = app;
