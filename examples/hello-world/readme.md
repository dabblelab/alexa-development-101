# Hello World Skill

This is a bare bones template for a Node.js 'Hello World' skill. It only handles the 'LaunchRequest' so all this skill does is say 'Hello World' when the skill is opened.

### index.js
```javascript
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit(':tell', 'Hello World!');
  }
};
```
NOTE: You can download a .zip package that contains the alexa-sdk node module from: http://cdn.dabblelab.com/downloads/hello-world-alexa-skill.zip
