const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
require('dotenv').config
const { readdirSync } = require('fs');
const { sequelize } = require('./configs/database');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors("*"));
app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(morgan('dev'))

readdirSync("./router").map(route => {
    const router = require("./router/" + route)
    app.use("/api", router)
});

app.listen(port, async () => {
    await sequelize.sync()
        .then(() => console.log('Sync database successfully'))
        .catch((error) => console.error('Unable to sync : ', error))
    console.log(`Example app listening on port ${port}`)
})