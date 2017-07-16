All valid schema types:

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* Objectid
* Array

Example:

```
var schema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array:      [],
  ofString:   [String],
  ofNumber:   [Number],
  ofDates:    [Date],
  ofBuffer:   [Buffer],
  ofBoolean:  [Boolean],
  ofMixed:    [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
})

// example use

var Thing = mongoose.model('Thing', schema);

var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = new Buffer(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1,2,3,4);
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.save(callback);
```

SchemaType Options

All Schema Types

* required: boolean or function, if true adds a required validator for this property
* default: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
* select: boolean, specifies default projections for queries
validate: function, adds a validator function for this property
* get: function, defines a custom getter for this property using Object.defineProperty().
* set: function, defines a custom setter for this property using Object.defineProperty().
* alias: string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.

Indexes

* index: boolean, whether to define an on this property.
* unique: boolean, whether to define a unique index on this property.
* sparse: boolean, whether to define a sparse index on this property.

String

* lowercase: boolean, whether to always call .toLowerCase() on the value
* uppercase: boolean, whether to always call .toUpperCase() on the value
* trim: boolean, whether to always call .trim() on the value
* match: RegExp, creates a validator that checks if the value matches the given regular expression
* enum: Array, creates a validator that checks if the value is in the given array.

Number

* min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
* max: Number, creates a validator that checks if the value is less than or equal to the given maximum.

Date

* min: Date
* max: Date