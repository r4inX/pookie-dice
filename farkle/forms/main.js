/**
 *
 * @type {String}
 *
 * @properties={typeid:35,uuid:"693085B5-AB46-40B7-A680-9838098D7DC9"}
 */
var testImg = null;


/**
 * global variable to store the dice values
 * 
 * @type {Array<Number>}
 *
 * @properties={typeid:35,uuid:"F73669B2-7C04-483A-9AC6-19ED3F2F3237",variableType:-4}
 */
var _diceValues = [0,0,0,0,0,0]
				
/**
 * @properties={typeid:35,uuid:"552A5C6F-452A-4C66-927E-FF26823E9C68",variableType:-4}
 */
var oDiceFAS = {
	1: 'fas fa-dice-one',
    2: 'fas fa-dice-two',
    3: 'fas fa-dice-three',
    4: 'fas fa-dice-four',
    5: 'fas fa-dice-five',
    6: 'fas fa-dice-six'
}

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"98A63E45-2142-43B7-A67C-B2A6CAD9AD12",variableType:4}
 */
var _scoreRound 	= 0
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"37BEB709-CDE6-4B6F-9736-3525192C332A",variableType:4}
 */
var _scoreSelected 	= 0
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"860EF9EF-C5F8-41D7-98C5-687DD46307D8",variableType:4}
 */
var _scoreTotal 	= 0


/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"2ACA1D0E-7246-4CCE-8502-65779C72E11E"}
 */
function onAction(event) {
	resetDice()
	rollDice()
	updateFormDice()
}

/**
 * @properties={typeid:24,uuid:"58F0EF96-7869-439E-BC98-C7C67185CDCF"}
 */
function resetScores(){
	_scoreRound = 0
	_scoreSelected = 0
	_scoreTotal = 0
}


/**
 * @properties={typeid:24,uuid:"E196D4F9-A731-4196-B429-0EDB48D75692"}
 */
function resetDice() {
	// --- reset data values ---
	_diceValues = [0, 0, 0, 0, 0, 0]
	
	// --- reset fa-icons ---
	for (var i = 1; i <= 6; i++) {
		var btnName = 'd' + i
		elements[btnName].imageStyleClass = 'fas fa-question'
	}
}

/**
 * @properties={typeid:24,uuid:"39847FE6-B95F-4E43-9355-F69AF49250AE"}
 */
function rollDice() {
	for (var i = 0; i < _diceValues.length; i++) {
		_diceValues[i] = Math.floor(Math.random() * 6) + 1
	}
}

/**
 * @properties={typeid:24,uuid:"0CA82DDF-3B51-439E-82BD-775251FCD48B"}
 */
function updateFormDice(){
	// --- update the form dice values ---
	for (var i = 0; i < _diceValues.length; i++) {
		var btnValue 	= _diceValues[i]
		var btnName 	= 'd'+(i + 1)
		var imgName 	= 'di'+(i + 1)
		var btnIcon 	= oDiceFAS[btnValue]
				
		elements[btnName].imageStyleClass = btnIcon
		elements[btnName].toolTipText = 'Dice value: ' + btnValue
		
		elements[imgName].media = 'media:///dices/hearts/' + btnValue + '.png'
	}
}


/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E8C5B28C-3455-42FD-8662-1CE83D54D9B2"}
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


/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"A69316A3-562D-4813-9832-FFAEE9F89029"}
 */
function onAction1(event) {
	// TODO Auto-generated method stub
	var x =  utils.numberFormat(Math.floor(Math.random() * 6) + 1,'#')
	
	testImg = 'media:///dices/hearts/' + x + '.png'
	
	
}

