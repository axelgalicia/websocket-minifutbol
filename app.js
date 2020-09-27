const express = require('express');
const port = 4000;


// App Setup
const app = express();
const server = app.listen(port, () => {
    console.log(`Listening to request on port ${port}`);
})

// Static files

app.use(express.static('public'));