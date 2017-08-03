const { Client }=require('pg');
const client=new Client('postgres://localhost/twitterdb');


client.connect();
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   err ? next(err) : res.rows[0].message) // Hello World!
//   client.end()
// })


module.exports=client;