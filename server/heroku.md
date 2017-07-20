## Heroku Commands

Docs: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

```
#############
# Set Up
#############
$ heroku login
Enter your Heroku credentials.
Email: adam@example.com
Password (typing will be hidden):
Authentication successful.

#############
# Create
#############
$ cd ~/myapp
$ heroku create
Creating app... done, ⬢ sleepy-meadow-81798
https://sleepy-meadow-81798.herokuapp.com/ | https://git.heroku.com/sleepy-meadow-81798.git

#############
# Deploy
#############
$ git push heroku master

#############
# Extras
#############

# Make sure at least one instance of app is running
$ heroku ps:scale web=1

# Open app in default browser
$ heroku open

# View Heroku Logs
$ heroku logs --tail

# Create config vars
$ heroku config:set TIMES=2
$ heroku config:get TIMES
$ heroku config:unset TIMES
$ heroku config
```