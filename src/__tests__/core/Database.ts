require('dotenv').config();
process.env.NODE_ENV='test';
process.env.DB_NAME='test'
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import Database from '../../core/Database';

test('Test is using test DB', async () => {    
    expect(Database.dbConfig()).toBe('test');
})

test('Test is able to connect to Test DB', async () => {
    let auth = await Database.authenticate();
    expect(auth).toBeTruthy();
})
