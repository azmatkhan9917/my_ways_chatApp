const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

// Secret key for JWT
const secretKey = 'your-secret-key'; // Replace with a strong and secure key

const users = {};
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// User registration route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Perform user registration logic (e.g., store user data in a database)
  // You should hash and salt passwords before storing them
  // For simplicity, we're not doing that here
  users[username] = password;
  res.json({ message: 'User registered successfully' });
});

// User login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Validate the user's credentials (e.g., check against a database)
  if (users[username] === password) {
    // If credentials are valid, create a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

io.on('connection', (socket) => {
  socket.on('login', (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      socket.emit('login-success', decoded.username);
    } catch (error) {
      socket.emit('login-fail', 'Invalid token or token expired.');
    }
  });

  // Other chat-related code remains the same as in the previous example
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
