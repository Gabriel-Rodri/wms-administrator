const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/comercio-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verificar conexión
mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Importar rutas
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const accountRoutes = require('./routes/accountRoutes');
const saleRoutes = require('./routes/saleRoutes');

// Usar rutas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/sales', saleRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de administración de comercio');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
