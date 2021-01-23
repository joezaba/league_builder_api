require('dotenv').config();
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'test'
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

import AccountLevel from '../../models/AccountLevel';
import AccountLevelRepository from '../../repositories/AccountLevelRepository';

beforeAll(async () => {
    //await migrateUp();
})

test('Test findAll()', async () => {
    let all = await AccountLevelRepository.findAll();
    expect(all.length).toBeGreaterThanOrEqual(0);
})

test('Test create AccountLevel', async () => {
    let al = new AccountLevel;
    al.accountLevel = 'ACTIVE';
    await AccountLevelRepository.create(al);
    let newAl = await AccountLevelRepository.findByAccountLevel('ACTIVE');
    expect(newAl?.accountLevel).toBe('ACTIVE')
})

test('test findByAccoutLevel', async () => {
    let al = await AccountLevelRepository.findByAccountLevel('DEFAULT');
    if (al) {
        expect(al.accountLevel).toBe('DEFAULT');
    }
})


afterAll(async () => {
    //await migrateDown();
})