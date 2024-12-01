const mysql = require('mysql2');
//const connection = mysql.createConnection({ host: 'localhost', user: 'root', database: 'your_db' });
// Usar `.promise()` para retornar uma Promise
/*connection.promise().query('SELECT * FROM vehicle_inventory')
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(err => {
    console.error('Erro ao executar a consulta', err);
  })
  .finally(() => {
    connection.end();
  });
*/
// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wayne_security'
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

// Exportando a conexão para ser usada em outros arquivos
module.exports = db;