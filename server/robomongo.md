## RoboMongo

### Hooking the heroku environment up in RoboMongo

```
heroku config:get MONGODB_URI
mongodb://heroku_2sc0i6dt:ef9872ma56lqvpivfqualarnv1@ds161162.mlab.com:61025/heroku_2sc0i6dt
```

Protocol
`mongodb://`

Username
`heroku_2sc0i6dt`

Password
`ef9872ma56lqvpivfqualarnv1`

Address
`ds161162.mlab.com`

Port
`61025`

DB
`heroku_2sc0i6dt`

In RoboMongo, go to Connections > Create > Connection Tab

Insert a name for the connection and input the address and port

Go to Authentication tab and check "Perform authentication"

Input the database, user name, and password. The Auth Mechanism can stay as the default value.

Your user name and database _should_ be the same

Go ahead and click Test to make sure everything is good.