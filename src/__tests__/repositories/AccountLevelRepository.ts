require('dotenv').config();
process.env.NODE_ENV='test';
process.env.DB_NAME='test'
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import { migrateDown, migrateUp } from '../../core/Migration';
import AccountLevelRepository from '../../repositories/AccountLevelRepository';

beforeAll(async () => {
    await migrateUp();
})

test('Test findAll()', async () => {
    let all = await AccountLevelRepository.findAll();
    expect(all.length).toBeGreaterThanOrEqual(0);
})


afterAll(async () => {
    await migrateDown();
})