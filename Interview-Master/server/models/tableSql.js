const { Pool } = require('pg');

const PG_URI = 'postgres://gzckorgd:IR5ZdWZpRCIuA5IdQ-6r3ocXNr1V4wI7@mahmud.db.elephantsql.com/gzckorgd';
const PSW = 'IR5ZdWZpRCIuA5IdQ-6r3ocXNr1V4wI7'

const  pool = new Pool({
  connectionString: PG_URI,
  password: PSW,
  PORT: 3333
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}