const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});