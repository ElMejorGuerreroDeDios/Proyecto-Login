const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'login',
  password: 'Ch3st3r0908',
  port: 5432,
});

// Registro SIN encriptar
app.post('/register', async (req, res) => {
  const { usuario, password } = req.body;
  try {
    await pool.query(
      'INSERT INTO "usuarios" (usuario, password) VALUES ($1, $2)',
      [usuario, password]   // <-- se guarda tal cual
    );

    res.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error al registrar:', err);
    res.status(500).json({ success: false, message: 'Error al registrar usuario' });
  }
});

// Login comparando directamente
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM "usuarios" WHERE usuario=$1',
      [usuario]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      if (password === user.password) {
        res.json({ success: true, message: 'Login correcto' });
      } else {
        res.json({ success: false, message: 'Credenciales inválidas' });
      }
    } else {
      res.json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});