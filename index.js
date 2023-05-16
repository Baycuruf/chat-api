const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
// Firebase Admin SDK yapılandırması
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());

// Kullanıcıları getirme endpoint'i
app.get('/api/users', async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();
    const userList = userRecords.users.map((user) => user.toJSON());
    res.json(userList);
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ error: 'Error listing users' });
  }
});

app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
