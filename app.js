//------------------------ Import ------------------------
const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const cors = require('cors');

//------------------------ App ------------------------
//Init app
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

//To use yaml
app.use(
    OpenApiValidator.middleware({
        apiSpec: './open-api.yaml',
        validateRequests: true,
        ignoreUndocumented:true
    })
  )

//Init main routers
const loginRouter = require('./routers/loginRouter.js');
app.use('/login', loginRouter);

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(error.status || 500).json({success: false, message: "Une erreur est survenue"});
});

//Export
module.exports = app;