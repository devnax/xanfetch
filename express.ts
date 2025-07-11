const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uxp = (app) => {
   app.get('/api/*', async (req, res) => {
      res.json({
         message: "Hello, this is a response from the server!",
      });
   });
   app.post('/api/*', (req, res) => {
      res.send("This is some binary data");
   });
}

export default uxp