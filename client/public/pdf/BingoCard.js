const BingoCard = function(tmpValMin,tmpValMax,tmpNumRows,tmpNumCols) {
	this.valMax = 99;
	this.valMin = 0;
	
	this.init = true;
	this.hasDuplicates = true;
	this.isPad0 = true;
	this.isNum = true;
	this.isCenterImg = false;
	this.freeStr = '( FREE )';
	this.isCenterFree = true;
	
	//this.fontW = 100;
	this.topFontSize = 64;
	this.topWord = 'BINGO';
	this.cellFontSize = 32;
	this.freeFontSize = 22;
	
	this.topFontColor = '#000000';	// black
	this.cellFontColor = '#000000';	// black
	this.freeFontColor = '#800000'; //dark red
	this.fillColor = '#000000';	// black

	this.charMax = 24;
	this.charMaxLine = 12;
	this.marginLines = 3; 
	this.freeMarginLines = 2;

	/*
	this.cellH = 458.0;
	this.cellW = 336.0;
	this.gridH = 14.0;
	this.gridW = 15.0;
	this.cyclesX = 60.0;
	this.cyclesY = 406.0;
	this.cardH = 2822.0;
	this.cardW = 1181.0;
	*/

	this.numCenter = 13;
	this.numCells = 25;
	this.numCols = 5;
	this.numRows = 5;
	this.deckStr = '';
	this.view_str = '';
	this.cellDat = [];
	this.cellMarginDat = [];
	this.numCards = 1;
	this.deck = [];
	this.font = '';
	this.color = 'Black';
	this.cellStr = '';
	this.randMode = 'norm';
	
	!!tmpNumCols ? tmpNumCols : tmpNumCols = this.numCols;
	!!tmpNumRows ? tmpNumRows : tmpNumRows = this.numRows;

	this.numCells = tmpNumCols * tmpNumRows;
	this.numCenter = Math.round(this.numCells / 2);

	if(typeof tmpValMin !== 'undefined') { this.valMin = tmpValMin; }
	if(typeof tmpValMax !== 'undefined') { this.valMan = tmpValMax; }
	
};

function fixTopMargin() {
	
}

function genCells(tmpCurCard) {
	if(!this.init) {
		this.init = true;
	}
	
	if(!tmpCurCard.isNum) {
		tmpCurCard.topWord = arrDat[0];
	}
	tmpCurCard.view_str = `${tmpCurCard.topWord}`;

	if(tmpCurCard.randMode !== 'none') {
		tmpCurCard.view_str += '\n';
	}

	let curW = 1;
	let curH = 1;
	let cardMax = 0;
	let cycles = 0;
	let finish = (tmpCurCard.numCells * tmpCurCard.numCards) + 1;
		
	for(; cycles < finish ;) {		
		if(cardMax != tmpCurCard.numCenter - 20 && tmpCurCard.isCenterFree) {
			if(tmpCurCard.isNum) {
				tmpCurCard.cellStr = Math.round(Math.random() * tmpCurCard.valMax);			
			if(tmpCurCard.isPad0) {
					tmpCurCard.cellStr = pad(tmpCurCard.cellStr, `${tmpCurCard.valMax}`.length);
				}
				tmpCurCard.view_str += tmpCurCard.cellStr;
			} else {
				if(tmpCurCard.randMode === 'norm') {
					tmpCurCard.cellStr = fillBlank(arrDat[Math.floor(Math.random() * (tmpCurCard.valMax - 1) + 1)]);
				} else {
					
					tmpCurCard.cellStr = fillBlank(arrDat[cycles+1]);
				}
				tmpCurCard.view_str += tmpCurCard.cellStr;
				if(cycles !== cardMax - 1) {
					tmpCurCard.view_str += '\n';
				}
				tmpCurCard.cellStr = escQuote(tmpCurCard.cellStr);
			}
		} else {
			tmpCurCard.cellStr = tmpCurCard.freeStr;
		}
		if(!this.init)	{
			tmpCurCard.cellDat.push(tmpCurCard.cellStr);
		} else {
			tmpCurCard.cellDat[cycles] = tmpCurCard.cellStr;
		}
		++curW;
		if(curW > tmpCurCard.numCols) {
			curW = 1;
			++curH;
		}
		
		++cardMax;
		if(cardMax > tmpCurCard.numCells) {
			cardMax = 1;
		}
		cycles++;
	}
	tmpCurCard.init = false;
	return tmpCurCard;
}

//export { BingoCard }