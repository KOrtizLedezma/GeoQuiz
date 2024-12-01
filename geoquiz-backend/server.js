const express = require('express');
const cors = require('cors');
require('./firebase');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.NEXT_PUBLIC_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
