const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const Todo = require('./../models/Todo');

const todos = [
  { _id: new ObjectID(), text: 'First test todo' },
  { _id: new ObjectID(), text: 'Second test todo' }
];

beforeEach((done) => {
  // reset db each time
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo by id', (done) => {
    request(app)
      .get(`/todos/${ todos[0]._id.toHexString() }`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    // make sure you get a 404 back
    const id = new ObjectID();
    request(app)
      .get(`/todos/${ id.toHexString() }`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/000000')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo by id', (done) => {
    request(app)
      .delete(`/todos/${ todos[0]._id.toHexString() }`)
      .expect(200)
      .expect((res) => {
        expect(todos).toExclude(res.body.todo);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    // make sure you get a 404 back
    const id = new ObjectID();
    request(app)
      .delete(`/todos/${ id.toHexString() }`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .delete('/todos/000000')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo by id', (done) => {
    request(app)
      .patch(`/todos/${ todos[0]._id.toHexString() }`)
      .expect(200)
      .expect((res) => {
        expect(todos).toInclude({
          _id: new ObjectID(res.body.todo._id),
          text: res.body.todo.text
        });
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    // make sure you get a 404 back
    const id = new ObjectID();
    request(app)
      .patch(`/todos/${ id.toHexString() }`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .patch('/todos/000000')
      .expect(404)
      .end(done);
  });
});