/**
 * global variable to store the dice values
 * 
 * @type {Array<Number>}
 *
 *
 * @properties={typeid:35,uuid:"CFF409A1-88BD-41CA-9193-8D8B1F52764F",variableType:-4}
 */
var _diceValues = [0,0,0,0,0,0]

/**
 * @properties={typeid:35,uuid:"ED513730-3054-44F1-A53A-B7170BE66AA8",variableType:-4}
 */
var _selectedValues = [null,null,null,null,null,null]

/**
 * @properties={typeid:35,uuid:"53A83D4C-06D1-4993-9A0B-10288C9D93CC",variableType:-4}
 */
var _inGame = false;

/**
 * @properties={typeid:35,uuid:"7613BFCD-CB21-4453-BB9E-B5B162D13EBD",variableType:-4}
 */
var _inRoll = false;
				
/**
 *
 * @properties={typeid:35,uuid:"231CE5F0-704D-4535-881C-9D043BCAC043",variableType:-4}
 */
var oDiceImages = {
	1: 'dices/hearts/1.png',
    2: 'dices/hearts/2.png',
    3: 'dices/hearts/3.png',
    4: 'dices/hearts/4.png',
    5: 'dices/hearts/5.png',
    6: 'dices/hearts/6.png'
}

/**
 * @type {Number}
 *
 *
 * @properties={typeid:35,uuid:"875097D4-FA4B-4365-BA50-44E6C8AC12A4",variableType:8}
 */
var _scoreRound 	= 0
/**
 * @type {Number}
 *
 *
 * @properties={typeid:35,uuid:"680A83B3-D995-4C3F-92AC-6BA8B97FBEAA",variableType:8}
 */
var _scoreSelected 	= 0
/**
 * @type {Number}
 *
 *
 * @properties={typeid:35,uuid:"BC30E394-DBBD-4F6C-946C-09C30DEEB105",variableType:8}
 */
var _scoreTotal 	= 0
/**
 * @param {JSEvent} event
 *
 *
 * @properties={typeid:24,uuid:"D9826889-CEF3-457C-A3DC-03F94998BF42"}
 */
function onAction_Start(event) {
	resetScores()
	resetDice()
	updateFormDice()
	
	_inGame = true
	_inRoll = false
	setButtonVisibility()
}

/**
 * @properties={typeid:24,uuid:"D9AE969F-37AF-4152-8213-0215FC00100B"}
 */
function setButtonVisibility(){
	elements.btnRoll.visible = true;
	elements.btnKeepAndPass.visible = true;
	elements.btnKeepAndRoll.visible = true
	
	elements.btnStart.visible = false
}

/**
 * @properties={typeid:24,uuid:"4CAD4DEF-CCFC-42EA-B707-99E10BE7C7C8"}
 */
function resetScores(){
	_scoreRound 	= 0
	_scoreSelected 	= 0
	_scoreTotal 	= 0
}

/**
 * @properties={typeid:24,uuid:"6C276B6D-2FA2-4754-8F7F-A3B40798F579"}
 */
function resetDice() {
	// --- reset data values ---
	_diceValues 	= [0, 0, 0, 0, 0, 0]
	_selectedValues = [null,null,null,null,null,null]
	
	// --- reset images ---
	for (var i = 1; i <= 6; i++) {
		var btnName = 'di' + i
		elements[btnName].media = 'media:///dices/hearts/1.png'
		elements[btnName].removeStyleClass('dice-selected')
		elements[btnName].removeStyleClass('btn-muted')
	}
}

/**
 * @properties={typeid:24,uuid:"591DF584-B227-43E5-ADD9-725722305155"}
 */
function rollDice() {
	if(!_inRoll){
		for (var i = 0; i < _diceValues.length; i++) {
			_diceValues[i] = Math.floor(Math.random() * 6) + 1
		}
		updateFormDice()
	}
}

/**
 * @properties={typeid:24,uuid:"1A5DEEF0-469A-43AF-AA94-C3EF90F9476D"}
 */
function updateFormDice(){
	// --- update the form dice values ---
	for (var i = 0; i < _diceValues.length; i++) {
		var btnValue 	= _diceValues[i]
		var imgName 	= 'di'+(i + 1)
		
		elements[imgName].toolTipText 	= 'Dice value: ' + btnValue
		if(btnValue == 0){
            elements[imgName].media 	= 'media:///dices/hearts/1.png'
		}else{
			elements[imgName].media 		= 'media:///dices/hearts/' + btnValue + '.png'
		}
		
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"9C267B1A-06EF-416F-8E12-849ECE0C2FA5"}
 */
function onDiceClicked(event) {
	
	/** @type {String} */
	var clickedDice = event.getElementName()
	var diceValue	= _diceValues[parseInt(clickedDice.substr(2)) - 1]
	var pos			= parseInt(clickedDice.substr(2)) - 1
	
	// --- check if we can select this value ---
	application.output(clickedDice + ' -> ' + diceValue)
	
	if(_selectedValues[pos] != null){
        _selectedValues[pos] = null
	}else{
		_selectedValues[pos] = diceValue
	}
	
	application.output(_selectedValues)
	calculateScore()
	
	
	
	
	
	// --- add or remove the dice-selected css class
	if (elements[clickedDice].hasStyleClass('dice-selected')) {
		elements[clickedDice].removeStyleClass('dice-selected')
	} else {
		elements[clickedDice].addStyleClass('dice-selected')
	}
}

/**
 * @properties={typeid:24,uuid:"686E73B2-3884-44CD-AAE3-FEB6976DAD26"}
 */
function calculateScore(){
	var tempScore = 0;
	
	var ones 	= [];
	var twos 	= [];
	var threes 	= [];
	var fours 	= [];
	var fives 	= [];
	var sixes 	= [];
	var scoreArray = [];
	
	for (var i = 0; i < 6; i++) {							//test out totals, etc.
			switch (_selectedValues[i]) {
				case 1: ones.push(1);
								break;
				case 2: twos.push(2);
								break;
				case 3: threes.push(3);
								break;
				case 4: fours.push(4);
								break;
				case 5: fives.push(5);
								break;
				case 6: sixes.push(6);
								break;
			}
	}
	switch (ones.length) {
		case 1: scoreArray[0] = 100; break;
		case 2: scoreArray[0] = 200; break;
		case 3: scoreArray[0] = 1000; break;
		case 4: scoreArray[0] = 2000; break;
		case 5: scoreArray[0] = 3000; break;
		case 6: scoreArray[0] = 4000; break;
		default: scoreArray[0] = 0;
	}
	switch (twos.length) {
		case 3: scoreArray[1] = 200; break;
		case 4: scoreArray[1] = 400; break;
		case 5: scoreArray[1] = 600; break;
		case 6: scoreArray[1] = 800; break;
		default: scoreArray[1] = 0;
	}
	switch (threes.length) {
		case 3: scoreArray[2] = 300; break;
		case 4: scoreArray[2] = 600; break;
		case 5: scoreArray[2] = 900; break;
		case 6: scoreArray[2] = 1200; break;
		default: scoreArray[2] = 0;
	}
	switch (fours.length) {
		case 3: scoreArray[3] = 400; break;
		case 4: scoreArray[3] = 800; break;
		case 5: scoreArray[3] = 1200; break;
		case 6: scoreArray[3] = 1600; break;
		default: scoreArray[3] = 0;
	}
	switch (fives.length) {
		case 1: scoreArray[4] = 50; break;
		case 2: scoreArray[4] = 100; break;
		case 3: scoreArray[4] = 500; break;
		case 4: scoreArray[4] = 1000; break;
		case 5: scoreArray[4] = 1500; break;
		case 6: scoreArray[4] = 2000; break;
		default: scoreArray[4] = 0;
	}
	switch (sixes.length) {
		case 3: scoreArray[5] = 600; break;
		case 4: scoreArray[5] = 1200; break;
		case 5: scoreArray[5] = 1800; break;
		case 6: scoreArray[5] = 2400; break;
		default: scoreArray[5] = 0;
	}
	tempScore = scoreArray[0] + scoreArray[1] + scoreArray[2] + scoreArray[3] + scoreArray[4] + scoreArray[5];
	application.output('Score: ' + tempScore)
	_scoreSelected = tempScore
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"AB3BDA3D-3CCA-488E-8573-8E008CC10D68"}
 */
function onAction_Roll(event) {
	// --- remove all selected-dice css classes ---
	for (var i = 1; i <= 6; i++) {
		var btnName = 'di' + i
		elements[btnName].removeStyleClass('dice-selected')
	}
	// --- roll the dice ---
	rollDice()
	
	// --- we are in a roll, mute the button ---
	_inRoll = true
	elements.btnRoll.visible = false
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"5CD9058E-DC13-4EDB-AC60-0F5436116F2B"}
 */
function onAction_KeepPass(event) {
	_scoreTotal 	+= _scoreSelected + _scoreRound
	_scoreRound 	= 0
	_scoreSelected 	= 0
	
	resetDice()
	
	
	_inRoll = false;
	elements.btnRoll.visible = true
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"88598939-B614-43B4-9464-F8DCFAFBA721"}
 */
function onAction_KeepRoll(event) {
	_scoreRound 	+= _scoreSelected
	_scoreSelected 	= 0
	
	
	// --- reroll the dice but only the ones that are not selected and disable the selected ones ---
	for (var i = 0; i < _diceValues.length; i++) {
		if (_selectedValues[i] == null) {
			_diceValues[i] = Math.floor(Math.random() * 6) + 1
		}else{
			elements['di' + (i+1)].enabled = false
			elements['di' + (i+1)].addStyleClass('btn-muted')
		}
	}
	
	updateFormDice()
	
	_selectedValues = [null,null,null,null,null,null]
	
}
