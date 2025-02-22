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
	// TODO Auto-generated method stub
	resetScores()
	resetDice()
	rollDice()
	updateFormDice()
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
	_diceValues = [0, 0, 0, 0, 0, 0]
	
	// --- reset images ---
	for (var i = 1; i <= 6; i++) {
		var btnName = 'di' + i
		elements[btnName].media = 'media:///dices/hearts/1.png'
	}
}

/**
 * @properties={typeid:24,uuid:"591DF584-B227-43E5-ADD9-725722305155"}
 */
function rollDice() {
	for (var i = 0; i < _diceValues.length; i++) {
		_diceValues[i] = Math.floor(Math.random() * 6) + 1
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
		elements[imgName].media 		= 'media:///dices/hearts/' + btnValue + '.png'
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"9C267B1A-06EF-416F-8E12-849ECE0C2FA5"}
 */
function onDiceClicked(event) {
	var clickedDice = event.getElementName()
	
	// --- add or remove the dice-selected css class
	if (elements[clickedDice].hasStyleClass('dice-selected')) {
		elements[clickedDice].removeStyleClass('dice-selected')
	} else {
		elements[clickedDice].addStyleClass('dice-selected')
	}
}