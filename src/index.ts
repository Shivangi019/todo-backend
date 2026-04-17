import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todos';


const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins: (string | RegExp)[] = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
  /\.netlify\.app$/, 
].filter(Boolean) as (string | RegExp)[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = allowedOrigins.some(o =>
        typeof o === 'string' ? o === origin : o.test(origin)
      );
      if (allowed) return callback(null, true);
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: ' Todo API is running!', status: 'OK' });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Todos API: http://localhost:${PORT}/api/todos`);
});

export default app;


