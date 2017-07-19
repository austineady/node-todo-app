const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo, User } = require('./../models');

const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', done => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create todo with invalid data', done => {
    request(app).post('/todos').send({}).expect(400).end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find()
        .then(todos => {
          expect(todos.length).toBe(2);
          done();
        })
        .catch(e => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo by id', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', done => {
    // make sure you get a 404 back
    const id = new ObjectID();
    request(app).get(`/todos/${id.toHexString()}`).expect(404).end(done);
  });

  it('should return a 404 for non-object ids', done => {
    request(app).get('/todos/000000').expect(404).end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo by id', done => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(todos).toExclude(res.body.todo);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', done => {
    // make sure you get a 404 back
    const id = new ObjectID();
    request(app).delete(`/todos/${id.toHexString()}`).expect(404).end(done);
  });

  it('should return a 404 for non-object ids', done => {
    request(app).delete('/todos/000000').expect(404).end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo by id', done => {
    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(todos).toInclude({
          _id: new ObjectID(res.body.todo._id),
          text: res.body.todo.text
        });
      })
      .end(done);
  });

  it('should return a 404 if todo not found', done => {
    // make sure you get a 404 back
    const id = new ObjectID();
    request(app).patch(`/todos/${id.toHexString()}`).expect(404).end(done);
  });

  it('should return a 404 for non-object ids', done => {
    request(app).patch('/todos/000000').expect(404).end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return a 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', done => {
    const email = 'example@example.com';
    const password = '123mnb!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) return done(err);

        User.findOne({ email }).then(user => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        });
      });
  });

  it('should return invalidation errors if invalid', done => {
    const invalidEmail = 'example.example.com';
    const invalidPassword = '123';

    request(app).post('/users').send({ invalidEmail, invalidPassword }).expect(400).end(err => {
      if (err) return done(err);

      User.findOne({ invalidEmail }).then(user => {
        expect(user).toNotExist();
        done();
      });
    });
  });

  it('should not create user if email in use', done => {
    request(app).post('/users').send({ email: users[0].email, password: '123mnb!' }).expect(400).end(err => {
      if (err) return done(err);

      User.find()
        .then(users => {
          expect(users.length).toBe(2);
          done();
        })
        .catch(e => done(e));
    });
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', done => {
    request(app)
      .post('/users/login')
      .send({ email: users[1].email, password: users[1].password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens[0]).toInclude({
              access: 'auth',
              token: res.headers['x-auth']
            });
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should reject invalid login', done => {
    const invalidEmail = 'example.example.com';
    const invalidPassword = '123';

    request(app)
      .post('/users/login')
      .send({ invalidEmail, invalidPassword })
      .expect(400)
      .expect(res => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, result) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      })
  });
});
