import express from 'express';
import path from 'path';

const userexpress = (app) => {
   // set express static folder
   // app.use(express.static('public'));
   // add body parser
   // app.use(express.json());
   // app.use(express.urlencoded({ extended: true }));

   app.get('/api/*', (req, res) => {
      const blob = Buffer.from('This is some binary data', 'utf-8');
      // res.setHeader('Content-Type', 'application/octet-stream');
      // res.setHeader('Content-Disposition', 'attachment; filename="example.txt"');
      // res.setHeader('Content-Length', blob.length);
      res.send("This is some binary data");
   });
   app.post('/api/*', (req, res) => {
      console.log(req.body);

      res.send("This is some binary data");
   });
}

export default userexpress