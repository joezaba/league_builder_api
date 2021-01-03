
require('dotenv').config();
process.env.DB_NAME='test';
process.env.NODE_ENV='test';


test('Jest Working', () => {
    expect(true).toBeTruthy();
})