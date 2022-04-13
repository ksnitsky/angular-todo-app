const express = require('express');
const app = express();

app.use(express.static('./dist/frontend'));

app.get('/*', (req, res, next) => {
  res.sendFile('index.html', { root: 'dist/frontend/' })
  console.log('123')
});


app.listen(process.env.PORT || 8080);
