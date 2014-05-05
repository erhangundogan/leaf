# mwitter (aka cakma twitter)

### Yess, yet another twitter clone

* Client featuring popular Bootstrap and HTML5 enhancements.
* Fastest web server Node.js and rock solid, popular Express web framework.
* NoSQL star MongoDB and Mongoose ORM Library on the scene.

### How to Install

```bash
git clone git@github.com:erhangundogan/mwitter.git
cd mwitter
npm install -d
bower install
```

### How to use

```bash
node app.js
```

Browse [http://localhost:3000](http://localhost:3000) and enjoy :)

### Bugs
* There is a login problem with node.js 0.8.21 version, it affects mwitter.gelistirme.org

### Steps to reproduce project
* Download and install [Node.js](http://nodejs.org/download/)
* Download and install [Git](http://git-scm.com/downloads)
* Create Github repository mwitter
* Go to your console preferably *nix one, or Azure Powershell

```bash
git clone git@github.com:erhangundogan/mwitter.git
cd mwitter

npm install -d -g express
express -s -t jade

//edit package.json and add libraries
npm install -d

// create and edit .bowerrc and bower.json. add libraries
bower install

git add .
git commit -m 'first'
git push origin master

// go ahead and code with your favourite ide ...
```


### Author

**Erhan Gundogan**

* http://github.com/erhangundogan
* http://tr.linkedin.com/in/erhangundogan
* http://twitter.com/erhangundogan


License
---------------------

Copyright 2014 Erhan Gundogan

Licensed under the MIT License.
