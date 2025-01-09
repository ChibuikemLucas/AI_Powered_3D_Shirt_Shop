import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb" }))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" })
});

app.listen(5000, () => console.log('Server has started on port 5000'))