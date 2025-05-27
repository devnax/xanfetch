const uxp = (app) => {
   app.get('/api/*', (req, res) => {
      res.send("This is some binary data");
   });
   app.post('/api/*', (req, res) => {
      res.send("This is some binary data");
   });
}

export default uxp