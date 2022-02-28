const app = require('./app');
const PORT = 3003;
const express = require('express');
const router = express.Router();
app.use(router);
app.listen(PORT, function () {
    console.info('Express server listening on port ' + PORT);
});