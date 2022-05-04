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
	'ableism',
	'abortion',
	'abortion access',
	'abortion rights',
	'a path to citizenship for DREAMers',
	'the alt-right',
	'being tolerant',
	'bodily autonomy',
	'the climate',
	'climate change',
	'disability rights',
	'health care',
	'income inequality',
	'decriminalizing cannabis',
	'decriminalizing marijuana',
	'denouncing white supremacists',
	'election security',
	'the environment',
	'flattening the curve',
	'gay rights',
	'getting dark money out of politics',
	'getting money out of politics',
	'global warming',
	'guns',
	'gun control',
	'gun violence',
	'immigrant rights',
	'kids in cages',
	'legal protections for disabled people',
	'legal protections for gay people',
	'legal protections for queer people',
	'legal protections for trans people',
	'legal protections for transgender people',
	'legalizing cannabis',
	'legalizing marijuana',
	'the minimum wage',
	'neo-Nazis in the U.S.',
	'nuclear proliferation',
	'police accountability',
	'police brutality',
	'police misconduct',
	'police violence',
	'racism',
	'raising the minimum wage',
	'raising workers\' wages',
	'reproductive freedom',
	'reproductive rights',
	'the rise of facism',
	'police brutality',
	'police violence',
	'queer rights',
	'sexism',
	'stopping COVID-19',
	'stopping facism',
	'stopping family separation',
	'stopping foreign election interference',
	'stopping the novel coronavirus',
	'stopping the spread of COVID-19',
	'toxic masculinity',
	'trans liberation',
	'trans rights',
	'transgender liberation',
	'transgender rights',
	'Trump\'s obstruction of justice',
	'universal health care',
	'voter suppression',
	'voting by mail',
	'voting rights',
	'white supremacy',
	'women\'s rights',
	'worker protections',
	'workers\' rights'
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
	'the American flag',
	'black-on-black crime',
	'branding Antifa as terrorists',
	'buying the police more tanks',
	'defending the 2<sup>nd</sup> amendment',
	'defending the American flag',
	'defending the Confederate flag',
	'defending Christianity',
	'defending Christian values',
	'defending family values',
	'defending God',
	'defending Jesus Christ',
	'defending our Lord and Savior, Jesus Christ',
	'defending Southern heritage',
	'defending your guns',
	'the flag',
	'the gay agenda',
	'gay people marrying animals',
	'getting more white immigrants',
	'George Soros',
	'God punishing gay people',
	'God punishing transgender people',
	'God punishing us for gay people',
	'God punishing us for transgender people',
	'Hillary\'s emails',
	'hydroxychloroquine',
	'ivermectin',
	'liberal media bias',
	'liberals censoring our voices',
	'the military',
	'Obama\'s birth certificate',
	'our right to go to bars',
	'our right to not wear masks',
	'the plight of poor, innocent, oil companies',
	'the plight of poor, innocent, trillion-dollar corporations',
	'protecting the 2<sup>nd</sup> amendment',
	'protecting coal miners',
	'protecting Christian values',
	'protecting Christian religious freedom',
	'protecting family values',
	'protecting the free speech of the alt-right',
	'stopping the alt-left',
	'stopping Sharia law',
	'stopping socialism',
	'supporting the troops',
	'supporting our troops',
	'reverse-racism',
	'taking God out of schools',
	'thoughts and prayers',
	'thugs in the streets',
	'video games causing mass shootings',
	'video games causing violence',
	'voter fraud conspiracy theories',
	'the war on Christmas',
	'the war on men',
	'why I should be allowed to say the n-word'
];

var ANOTHER_THING_PROBABILITY = 0.2;

var ANOTHER_THING_STARTS = [
	'Also',
	'And besides',
	'And besides which',
	'And don\'t forget',
	'Besides',
	'Besides which',
	'Not to mention',
	'Plus'
];

var OTHER_THINGS = [
	'America is the #1 country in the world',
	'Clinton did it first',
	'Clinton did it too',
	'the Democrats were the racist ones before the 20<sup>th</sup> century',
	'I am the least racist person',
	'if you hate America so much, you should just leave',
	'if you hate America so much, why don\'t you just move somewhere else?',
	'it\'s really Biden\'s fault',
	'it\'s really Clinton\'s fault',
	'it\'s really the Clintons\' fault',
	'it\'s really the Democrats\' fault',
	'it\'s really Obama\'s fault',
	'it\'s really Pelosi\'s fault',
	'Obama did it first',
	'Obama did it too',
	'stop putting politics in sports',
	'the stock market is doing great, so stop complaining',
	'this is all China\'s fault',
	'we can\'t erase history',
	'we can\'t erase our history',
	'you already got the 19<sup>th</sup> Amendment; what else do you want?',
	'you already got gay marriage; what else do you want?',
	'you clearly just hate America',
	'you clearly just hate the Constitution',
	'you just hate America',
	'you just hate the Constitution'
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
