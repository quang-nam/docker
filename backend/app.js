import express from 'express';
import mysql from 'mysql2'
import cors from 'cors';
import dotenv from 'dotenv';
// const app = express();
 const app = express();
 // // enable content json sent from other
 app.use(cors())
app.use(express.json());
dotenv.config()
 const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE_NAME,
  port:process.env.DB_PORT,
 })

 app.get('/init', (req, res) => {
  const sqlQuery =  'CREATE TABLE IF NOT EXISTS books(id int AUTO_INCREMENT, title VARCHAR(50), desc VARCHAR(255), cover VARCHAR(255), PRIMARY KEY(id),price NUMBER())';

  database.query(sqlQuery, (err) => {
      if (err) throw err;

      res.send('Table created!')
  });
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello from inside the very basic Node app!</h1>
  `);
})
app.post("/books",(req,res)=>{
  const queryPost= "INSERT INTO books(`title`,`desc`,`cover`,`price`) VALUES (?)";
  const values=[
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price
  ]
  db.query(queryPost,[values],(err, data)=>{
    if(err) return res.send(err)
    return res.json("Book had been created")
  })
})
app.get('/books',(req,res)=>{
  const querySelect= "SELECT * FROM books";
  db.query(querySelect,(err,result)=>{
    if(err) return res.send(err)
    return res.json(result)
})
})

// // put content
app.put("/books/:id",(req,res)=>{
    const bookId= req.params.id;
    const queryUpdate= "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=?"
    const values=[
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover
    ]
    db.query(queryUpdate,[...values,bookId],(err, result)=>{
      if(err) return res.send(err);
      return res.json(result)
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId= req.params.id;
    const queryDelete= "DELETE FROM books WHERE id=?"
    db.query(queryDelete,[bookId],(err, result)=>{
      if(err) return res.send(err)
      return res.json(result)
    })
})
app.listen(8080,()=>{
  console.log("server is running")
});