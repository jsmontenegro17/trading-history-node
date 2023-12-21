import express from 'express';
import mainRoutes from './routes/main.routes.js'
import indexRoute from './routes/index.routes.js'

const app = express();

app.use(express.json());

app.use('/api',indexRoute);
app.use('/api',mainRoutes);

app.use((req, res, next)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
});

export default app;