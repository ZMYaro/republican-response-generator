'use strict';

if (!Array.prototype.pickRandom) {
	Array.prototype.pickRandom = function () {
		return this[Math.floor(Math.random() * this.length)];
	};
}

var STARTS = [
	'Don\'t you dare',
	'Don\'t you dare suggest we',
	'Don\'t you dare try to',
	'How dare you',
	'How dare you suggest we',
	'It is not the time to',
	'It\'s not the time to',
	'This is not the time to',
	'This is not the right time to',
	'This isn\'t the time to',
	'This isn\'t the right time to',
	'Stop trying to',
	'We can\'t',
	'We can\'t really',
	'We cannot',
	'We cannot really',
	'You can\'t really',
	'You can\'t possibly suggest we',
	'You cannot really',
	'You cannot possibly suggest we'
];

var WHAT_WE_ARE_NOT_DOING = [
	'address',
	'act like we need to care about',
	'deal with',
	'discuss',
	'focus on',
	'politicize',
	'talk about'
];

var ISSUES = [
	'the alt-right',
	'the climate',
	'climate change',
	'health care',
	'denouncing white supremacists',
	'election security',
	'the environment',
	'gay rights',
	'global warming',
	'guns',
	'gun control',
	'gun violence',
	'nuclear proliferation',
	'police brutality',
	'racism',
	'the rise of facism',
	'stopping facism',
	'stopping family separation',
	'stopping foreign election interference',
	'toxic masculinity',
	'trans rights',
	'transgender rights',
	'Trump\'s obstruction of justice',
	'white supremacy'
];

var ALTERNATIVE_PROBABILITY = 0.6;

var ALTERNATIVE_STARTS = [
	'if we don\'t',
	'unless we',
	'until we',
	'when it is really time to',
	'when it\'s really time to',
	'when we first need to',
	'when we have to',
	'when we haven\'t tried to',
	'when we have not tried to',
	'when we need to',
	'when we should',
	'when we should really'
];

var WHAT_WE_SHOULD_DO_INSTEAD = [
	'discuss',
	'help with',
	'focus on',
	'pay attention to',
	'prioritize',
	'talk about'
];

var NON_ISSUES = [
	'black-on-black crime',
	'branding Antifa as terrorists',
	'defending the 2<sup>nd</sup> amendment',
	'defending Christian values',
	'defending family values',
	'defending your guns',
	'gay people marrying animals',
	'God punishing gay people',
	'God punishing transgender people',
	'Hillary\'s emails',
	'liberal media bias',
	'liberals censoring our voices',
	'the military',
	'Obama\'s birth certificate',
	'protecting the 2<sup>nd</sup> amendment',
	'protecting coal miners',
	'protecting Christian values',
	'protecting Christian religious freedom',
	'protecting family values',
	'protecting the free speech of the alt-right',
	'stopping the alt-left',
	'stopping Sharia law',
	'stopping socialism',
	'supporting our troops',
	'reverse-racism',
	'thoughts and prayers',
	'video games causing mass shootings',
	'video games causing violence',
	'why I should be allowed to say the n-word'
];

var ANOTHER_THING_PROBABILITY = 0.2;

var ANOTHER_THING_STARTS = [
	'Also',
	'And besides which',
	'Besides',
	'Not to mention',
	'Plus'
];

var OTHER_THINGS = [
	'America is the #1 country in the world',
	'Clinton did it first',
	'Clinton did it too',
	'I am the least racist person',
	'if you hate America so much, you should just leave',
	'Obama did it first',
	'Obama did it too',
	'the stock market is doing great, so stop complaining',
	'you already got gay marriage; what else do you want?'
];

var responseField;

function init() {
	responseField = document.getElementById('response');
	
	document.getElementById('generate-button').addEventListener('click', generateResponse);
	document.getElementById('generate-button').disabled = false;
	
	generateResponse();
}

function generateResponse() {
	var string = '';
	
	// Assemble base thing we need to not talk about.
	string += STARTS.pickRandom() + ' ';
	string += WHAT_WE_ARE_NOT_DOING.pickRandom() + ' ';
	string += ISSUES.pickRandom();
	
	if (Math.random() < ALTERNATIVE_PROBABILITY) {
		// Maybe assemble a thing we should talk about instead.
		string += ' ' + ALTERNATIVE_STARTS.pickRandom() + ' ';
		string += WHAT_WE_SHOULD_DO_INSTEAD.pickRandom() + ' ';
		string += NON_ISSUES.pickRandom();
	} else if (Math.random() < 0.5) {
		// If there is not another thing to talk about, maybe just say we are not talking about this right now.
		string += ' right now';
	}
	
	string += '!';
	
	if (Math.random() < ANOTHER_THING_PROBABILITY) {
		// Maybe assemble an “And another thing”.
		string += '  ' + ANOTHER_THING_STARTS.pickRandom() + ', ';
		string += OTHER_THINGS.pickRandom() + '!';
	}
	
	// Display the assembled string.
	responseField.innerHTML = string;
};

window.addEventListener('load', init);
