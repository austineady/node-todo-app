## User Model Setup

```
email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
```

Starting with the email prop, add the property unique, setting it to true or false. This makes sure there isn't another
document with the same email.

Next is validating emails.
Docs: http://mongoosejs.com/docs/validation.html

Using a mongoose validator looks like this:

```
    var userSchema = new Schema({
      phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      }
    });
```

Here we will install the `validator` npm library to handle validation.
Docs: https://www.npmjs.com/package/validator

Updated email property

```
email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  }
```