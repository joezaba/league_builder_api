require('dotenv').config();
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'test'
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import { Account } from '../../models/Account';
import AccountLevel from '../../models/AccountLevel';
import AccountLevelRepository from '../../repositories/AccountLevelRepository';

import AccountRepository from "../../repositories/AccountRepository";

beforeAll(async () => {
    //await migrateUp();
})

test('test Account findAll()', async () => {
    let all = await AccountRepository.findAll();
    expect(all.length).toBeGreaterThanOrEqual(0);
})

test('Account repostitory create() not to throw', async () => {
    let acc = new Account;
    acc.accountName = 'TestAccount';
    expect(async () => {await AccountRepository.create(acc)}).not.toThrow();
})

afterAll(async () => {
    //await migrateDown();
})
