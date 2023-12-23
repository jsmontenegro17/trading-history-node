import express from 'express';
import morgan from 'morgan';
import mainRoutes from './routes/main.routes.js'
import indexRoute from './routes/index.routes.js'
import authRoute from './routes/auth.routes.js'
import userRoute from './routes/user.routes.js'

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/',indexRoute);
app.use('/api/main',mainRoutes);
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

app.use((req, res, next)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
});

export default app;