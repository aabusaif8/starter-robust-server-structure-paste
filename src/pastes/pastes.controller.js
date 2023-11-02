const pastes = require("../data/pastes-data")

function list(req,res){
    res.json({ data: pastes})
}

let lastPasteId = pastes.reduce((maxId,paste) => Math.max(maxId, paste.id),0)

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
        return next();
    } else {
        return next({ status: 400, message: `Must include a ${propertyName}` });
    }
  };
}
function create(req,res){
    const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;
    const newPaste = {
      id: ++lastPasteId,
      name,
      syntax,
      exposure,
      expiration,
      text,
      user_id,
    }
    pastes.push(newPaste)
    // res.status(201).json({ data: newPaste })
    res.json("create works")
}
function exposurePropertyIsValid(req, res, next) {
    const { data: { exposure } = {} } = req.body;
    const validExposure = ["private", "public"];
    if (validExposure.includes(exposure)) {
      return next();
    }
    next({
      status: 400,
      message: `Value of the 'exposure' property must be one of ${validExposure}. Received: ${exposure}`,
    });
  }
  
  function syntaxPropertyIsValid(req, res, next) {
    const { data: { syntax } = {} } = req.body;
    const validSyntax = ["None", "Javascript", "Python", "Ruby", "Perl", "C", "Scheme"];
    if (validSyntax.includes(syntax)) {
      return next();
    }
    next({
      status: 400,
      message: `Value of the 'syntax' property must be one of ${validSyntax}. Received: ${syntax}`,
    });
  }
  
  function expirationIsValidNumber(req, res, next){
    const { data: { expiration }  = {} } = req.body;
    if (expiration <= 0 || !Number.isInteger(expiration)){
        return next({
            status: 400,
            message: `Expiration requires a valid number`
        });
    }
    next();
  }

module.exports = {
    create: [
        // bodyDataHas("name"),
        // bodyDataHas("syntax"),
        // bodyDataHas("expiration"),
        // bodyDataHas("exposure"),
        // bodyDataHas("text"),
        // bodyDataHas("user_id"),
        // exposurePropertyIsValid,
        // syntaxPropertyIsValid,
        // expirationIsValidNumber,
        create
    ],
    list,
}