var Alexa = require('alexa-sdk');

const skillData = [
  {
    state:"FLORIDA",
    category:"Ale",
    recomendation:"When this skill is complete I will suggest a beer from Florida."
  },
  {
    state:"GEORGIA",
    category:"Lager",
    recomendation:"When this skill is complete I will suggest a beer from Georgia."
  },
  {
    state:"ALABAMA",
    category:"Lager",
    recomendation:"When this skill is complete I will suggest a beer from Alabama."
  }
]
exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'I can suggest a local beer from any state in the united states. What state would you like a suggestion for?', 'Which state would you like a suggestion for?');
  },
  'MakeRecommendation': function () {
    // set constants
    const undefinedPrompt = "Sorry, I dont have recommendation for that. Try again by saying the name of a state.";
    const undefinedRePrompt = "Can you say a state name?";

    // get the value of the category slot
    var categorySlot = this.event.request.intent.slots.category.value;

    // make sure we have a recommendation
    if (getRecommendation(skillData, 'category', categorySlot) === undefined)
    {
      this.emit(':ask', undefinedPrompt, undefinedRePrompt);
    }

    // return the recommendation
    this.emit(':tell', getRecommendation(skillData, 'category', categorySlot).recomendation);
  },
  'LocalSuggestion': function () {
    // set constants
    const undefinedPrompt = "Sorry, I dont have recommendation for that. I can recommend a: light beer, or a: dark beer. Which would you prefer?";
    const undefinedRePrompt = "Can I recommend a: light beer, or a: dark beer?";

    // get the value of the category slot
    var stateSlot = this.event.request.intent.slots.state.value;

    // make sure we have a recommendation
    if (getRecommendation(skillData, 'state', stateSlot.toUpperCase()) === undefined)
    {
      this.emit(':ask', undefinedPrompt, undefinedRePrompt);
    }

    // return the recommendation
    this.emit(':tell', getRecommendation(skillData, 'state', stateSlot.toUpperCase()).recomendation);
  },
  'Unhandled': function(){
    this.emit(':ask', undefinedPrompt, undefinedRePrompt);
  }
};

function getRecommendation(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++) {
    if (arr[i][propName] == propValue) {
      return arr[i];
    }
  }
}
