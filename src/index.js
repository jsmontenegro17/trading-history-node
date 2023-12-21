import express from 'express';
import mainRoutes from './routes/main.routes.js'
import indexRoute from './routes/index.routes.js'

const app = express();

app.use(express.json());

app.use('/api',indexRoute);
app.use('/api',mainRoutes);

app.listen(3000);
console.log('Server running on port 3000');