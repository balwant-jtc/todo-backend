// tslint:disable-next-line: no-var-requires
require('module-alias/register');

import chai from 'chai';
// tslint:disable-next-line: import-name
import spies from 'chai-spies';
chai.use(spies);
import chaiHttp from 'chai-http';
import { Application } from 'express';
import { respositoryContext, testAppContext } from '../../mocks/app-context';

import { App } from '@server';
import { Todo } from '@models';

chai.use(chaiHttp);
const expect = chai.expect;
let expressApp: Application;

before(async () => {
  await respositoryContext.store.connect();
  const app = new App(testAppContext);
  app.initializeMiddlewares();
  app.initializeControllers();
  app.initializeErrorHandling();
  expressApp = app.expressApp;
});

describe('POST /todos', () => {
  it('should create a new todo', async () => {
    const res = await chai
      .request(expressApp)
      .post('/todos')
      .send({
        title: 'New Todo'
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('title');
  });

  it('should return a validation error if empty title is specified', async () => {
    const res = await chai
      .request(expressApp)
      .post('/todos')
      .send({
        title: ''
      });

    expect(res).to.have.status(400);
  });

  it('should return a validation error if title is not a string', async () => {
    const res = await chai
      .request(expressApp)
      .post('/todos')
      .send({
        title: {"key":"value"}
      });

    expect(res).to.have.status(400);
  });

  /* it('should return an error for duplicate email', async () => {
    await testAppContext.accountRepository.save(new Account({
      email: 'Jack.Ryan.2@jalantechnologies.com',
      firstName: 'Jack',
      lastName: 'Ryan',
      password: await AuthHelper.encryptPassword('password'),
    }));

    const res = await chai
      .request(expressApp)
      .post('/account')
      .send({
        email: 'Jack.Ryan.2@jalantechnologies.com',
        firstName: 'Jack',
        lastName: 'Ryan',
        password: 'password',
      });
    expect(res).to.have.status(400);
  }); */
});


