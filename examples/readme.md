# Code Examples

Here you'll find the code examples used in the course videos. In the course we create a custom skill that lets users ask Alexa for suggestions on a topic of your choice. It could be, suggestion for books to read, coffee to try, movies to see - whatever interests you.

The examples for the Lambda code require the alexa-sdk node module. So, to use them, setup a Lambda function based on one of the Node.js Alexa blueprints that Amazon provides, then, replace all of the code provided by the blueprint with the code from one of the examples below.

## Hello World Skill

This is a bare bones Alexa skill service. It can be used as a starting point for setting up a Node.js Lambda Function. It does not handle any custom intents and all it does is say 'Hello World' when the skill is opened.

### Lambda Code
```javascript
var Alexa = require('alexa-sdk');

const APP_ID = undefined;

var handlers = {
  'LaunchRequest': function () {
    this.emit(':tell', 'Hello World!');
  },
  'Unhandled': function () {
    this.emit(':tell', 'Sorry, I don\'t know what to do');
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', "What can I help you with?", "How can I help?");
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Goodbye!");
  },
};

exports.handler = function(event, context){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};
```

## Suggestions Skill
This is the code for the suggestion skill example used in the course. It's for a skill that lets users local craft beer brewed in a given state in the United States. This code can be used as a reference for building your suggestion or recommendation skill.

### Intent Schema

```javascript
{
  "intents": [
    {
      "intent": "AMAZON.CancelIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "slots": [
        {
          "name": "state",
          "type": "AMAZON.US_STATE"
        }
      ],
      "intent": "MakeSuggestion"
    }
  ]
}
```

### Sample Utterances
```text
MakeSuggestion suggest a beer from {state}
MakeSuggestion from {state}
MakeSuggestion {state}
```

### Lambda Code

```javascript
var Alexa = require('alexa-sdk');

const APP_ID = undefined;

const skillData = [
    {
        state: "FLORIDA",
        suggestion: "My suggestion for Florida"
    },
    {
        state: "GEORGIA",
        suggestion: "My suggestion for Florida"
    },
    {
        state: "ALABAMA",
        suggestion: "My suggestion for Alabama"
    }
];

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'I can suggest a beer from any state in the United States. What state would you like a beer suggestion for?', 'Tell me a state name and I will suggest a local beer from there.');
  },
  'MakeSuggestion': function() {
      var stateSlot = this.event.request.intent.slots.state.value;
      this.emit(':tell', getSuggestion(skillData, 'state', stateSlot.toUpperCase()).suggestion);
  },
  'Unhandled': function () {
    this.emit(':tell', 'Sorry, I don\'t know what to do');
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', "What can I help you with?", "How can I help?");
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Goodbye!");
  },
};

exports.handler = function(event, context){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

function getSuggestion(data, propName, propValue) {
  for (var i=0; i < data.length; i++) {
    if (data[i][propName] == propValue) {
      return data[i];
    }
  }
}
```
