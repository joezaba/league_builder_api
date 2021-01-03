require('dotenv').config();
process.env.NODE_ENV='test';
process.env.DB_NAME='test'
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import { migrateDown, migrateUp } from '../../core/Migration';

test('Test migrate tables Up', async () => {
    let up = await migrateUp()
    expect(up).toBeTruthy();
} )

test('Test migrate tables Down', async () => {
    let down = await migrateDown()
    expect(down).toBeTruthy();
} )
