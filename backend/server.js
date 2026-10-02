const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const artistRoutes = require('./routes/artistRoute');
const albumRoutes = require('./routes/albumRoute');
const songRoutes = require('./routes/songRoute');

app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);



app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
