Steps: 
1. Download the `mongodb` folder from their website
2. Move change `mongodb` folder name to `mongo` and move it into the `/usr` folder.
3. Create a second folder alongside `mongo` called `mongo-data`
4. To start the database, run:
```
$ ./mongod --dbpath ~/mongo-data --port PORT
```
5. Open new terminal tab, go to `~/mongo/bin` and run
```
$ ./mongo
```
Which will open up an interactive terminal
```
rv-clt-aeady(mongod-3.4.4) test> db.Todos.insert({ text: 'Film new node course' })

Inserted 1 record(s) in 85ms
WriteResult({
  "nInserted": 1
})

rv-clt-aeady(mongod-3.4.4) test>
```

Then make sure everything went well by fetching all documents.

```
rv-clt-aeady(mongod-3.4.4) test> db.Todos.find()

{
  "_id": ObjectId("596a9cbcc353ec0855cbad63"),
  "text": "Film new node course"
}

Fetched 1 record(s) in 6ms
```