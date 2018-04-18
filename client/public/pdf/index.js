//import { BingoCard } from "./BingoCard.js";

let init = false;
let curCard = new BingoCard();
let loadCard = '';

function toggleEdit(str) {
  toggleDisplay(`${str}_area`); 
  document.getElementById(`${str}_PDF_btn`).value = toggleVal(document.getElementById(`${str}_PDF_btn`).value, str, `Hide ${str}`); 
}

function checkText(id, old, delay) {
  if(
      document.getElementById(id).value !== old && 
      document.getElementById(id).value !== curCard.cell_viewStr
    ) {
    //update(null, true);
    //console.log(document.getElementById(id).value);
    curCard.randMode = 'none';
    old = document.getElementById(id).value;
    parseTextVal(old);
    delay = 0;
  } else {
    delay = 500;
  }
  setTimeout(function () { checkText(id, old, delay); }, delay);
}

function parseTextVal(str) {
  //.split('/\r\n|\n|\r/')
  str = unEscQuote(str);
  curCard.arrList = str.split('\n');
  //Clip to card Cells_area to max cells:
  //curCard.valMax = curCard.arrList.length;
  curCard.valMin = 0;
  curCard.isNum = false;
  update(null, true);
}


setTimeout(function () { checkText('Cells_area', document.getElementById('Cells_area').value, 50); }, 200);

function parseNumVal(cmdStr) {
  cmdStr = cmdStr.slice(1, cmdStr.len);
  let arrCmd = cmdStr.split('-');
  //if(isNaN(parseInt(arrCmd[0])) !== true && isNaN(parseInt(arrCmd[1])) !== true) {
    curCard.valMin = parseInt(arrCmd[0]);
    curCard.valMax = parseInt(arrCmd[1]);
    curCard.isNum = true;
    curCard.topWord = `BINGO`;
    update(null, true);
  //}
}

function parseStrVal(cmdStr) {
  //.split('/\r\n|\n|\r/')
  curCard.arrList = eval(`dat_${cmdStr}`).split('\n');
  curCard.valMax = curCard.arrList.length;
  curCard.valMin = 0;
  curCard.isNum = false;
  update(null, true);
}

function dropDown(cmdStr) {
  let arrCmd = cmdStr.split('_');
  if(arrCmd[1] !== 'MAIN') {
    curCard.randMode = 'norm';
    // hide the selection clicked
    toggleDisplay(`${arrCmd[0]}_${arrCmd[1]}`);
    // activate (display) MAIN label below
    toggleDisplay(`${arrCmd[0]}_${document.getElementById(`${arrCmd[0]}_MAIN`).value}`);
    // set the new MAIN label
    document.getElementById(`${arrCmd[0]}_MAIN`).value = arrCmd[1];
    
    if(arrCmd[1][0] !== '#') {
      parseStrVal(arrCmd[1]);
      } else {
      parseNumVal(cmdStr);
    }
  }
  // toggle dropdown
  toggleDisplay(`${arrCmd[0]}_div`);
}


let docArr = [];

//\\n\\n   
//\\n\\n\\n\\n

/*
let dd = {
info: {
title: "Bingo Cards",
author: "Bangarang Bingo",
subject: "",
keywords: ""
},
pageOrientation: "portrait", 
pageSize: "A4",
pageMargins: [8, 8, 10.5, 10.5],
content: [
{
alignment: "center",
background:"",
content:[],
  table: {
    headerRows: 1,
    widths: [ "*", "*", "*", "*", "*" ],
    margin: [0, 0, 0, 0],
    heights: [64, 16, 124, 124, 124 ,124, 124],
    body: [ 
      [ { text: "B", bold: true, style: "top", fontSize: 64  }, { text: "I", bold: true, style: "top", fontSize: 64 }, { text: "N", bold: true, style: "top", fontSize: 64 }, { text: "G", bold: true, style: "top", fontSize: 64}, { text: "O", bold: true, style: "top", fontSize: 64 } ],
      [ {text: " ", colSpan: 5, fillColor: "#000000",} ],
      [ "\\n\\n\\n\\n012345678910", "Value 2", "Value 3", "Value 4", "Value 5" ],
      [ "Value 1", "Value 2", "Value 3", "Value 4", "Value 5" ],
      [ "Value 1", "Value 2", { text: "\\n\\n( FREE )", bold: true, fontSize: 22, color: "#800000" }, "Value 4", "Value 5" ],
      [ "Value 1", "Value 2", "Value 3", "Value 4", "Value 5" ],
      [ "Value 1", "Value 2", "Value 3", "Value 4", "Value 5" ]
    ]
  },//pageBreak: "after",
  layout: {
    hLineWidth: function (i, node) { return (i === 0 || i === node.table.body.length) ? 16 : 1; },
    vLineWidth: function (i, node) { return (i === 0 || i === node.table.widths.length) ? 8 : 1; },
    hLineColor: function (i, node) { return (i === 0 || i === node.table.body.length) ? "black" : "black"; },
    vLineColor: function (i, node) { return (i === 0 || i === node.table.widths.length) ? "black" : "black"; },
  },
}
],
styles: {
top: {
  alignment: "center",
  color: "#ffffff", 
  fillColor: "#000000"
},
sub: {
  fontSize: 32,
  bold: true
},
fill: {
  fillColor: "#000000"
},
quote: {
  italics: true
},
small: {
  fontSize: 8
}
}
};
*/



//let ddx = JSON5.stringify(dd);
//alert(ddx);

// dd = JSON.stringify(ddx);
// dd2 = JSON.parse(docStr);

//let dd2 = JSON5.parse(dd);
//alert(dd2);

//let dd2 = JSON5.parse(dx);

//dd = dd.replace(/(\r?)\n/g, '\n').replace(/(^)/gm, '\t');
//dd = '{\n' + dd.replace(/(\r?)\n/g, '\n').replace(/(^)/gm, '\t') + '\n}';
//alert(dd);

// let dx = `{info:{title:'Bingo Cards',author:'Bangarang Bingo',subject:'',keywords:''},pageOrientation:'portrait',pageSize:'A4',pageMargins:[8,8,10.5,10.5],content:[{alignment:'center',background:'',content:[],table:{headerRows:1,widths:['*','*','*','*','*'],margin:[0,0,0,0],heights:[64,16,124,124,124,124,124],body:[[{text:'B',bold:true,style:'top',fontSize:64},{text:'I',bold:true,style:'top',fontSize:64},{text:'N',bold:true,style:'top',fontSize:64},{text:'G',bold:true,style:'top',fontSize:64},{text:'O',bold:true,style:'top',fontSize:64}],[{text:' ',colSpan:5,fillColor:'${curCard.fillColor}'}],['\\n\\n\\n\\n012345678910','Value 2','Value 3','Value 4','Value 5'],['Value 1','Value 2','Value 3','Value 4','Value 5'],['Value 1','Value 2',{text:'\\n\\n( FREE )',bold:true,fontSize:22,color:'#800000'},'Value 4','Value 5'],['Value 1','Value 2','Value 3','Value 4','Value 5'],['Value 1','Value 2','Value 3','Value 4','Value 5']]},layout:{}}],styles:{top:{alignment:'center',color:'#ffffff',fillColor:'${curCard.fillColor}'},sub:{fontSize:32,bold:true},fill:{fillColor:'${curCard.fillColor}'},quote:{italics:true},small:{fontSize:8}}}`;

// let dd2 = JSON5.parse(dx);

//  let pdf00 = pdfMake.createPdf(dd2, pdfMake.fonts, pdfMake.vfs);

let dx;
let dd2;
let pdf00;

let data = '';
let preData = 'data:application/pdf;base64,';
let width = '100%';
let height = window.innerHeight - 32;
let imgWidth = '';
let imgHeight = '';
let view_topWord = '';
let view_cellDat = [''];
let view_pageBreak = ',pageBreak: "after"';

/*
function setTextColor(picker) {
  document.getElementsByTagName('body')[0].style.color = '#' + picker.toString();
}
*/
  
function update(color, updateText) {
  //console.log('color: ' + color);
 if(loadCard !== '') {
    curCard = JSON.parse(loadCard);
    loadCard = '';
  }

  if(curCard.numCards > 1) {
    eval(`update2(color, updateText)`);
    return;
  }

  if(!init) {
    init = true;
  }

  if(color !== curCard.fillColor && color !== null) {
    curCard.fillColor = `#${color}`;
  }

  if(updateText) {
    if(curCard.randMode !== 'none') {
        document.getElementById('Cells_area').value = '';
    }
    
    curCard = genCells(curCard);
    if(!curCard.isNum) {
      if(curCard.randMode !== 'none') {
        document.getElementById('Cells_area').value = curCard.cell_viewStr;
      }
    }
  }
  
  if(!curCard.topWord.match(/\\/i) && !curCard.topWord.match(/\'/i)) {
    view_topWord = fillBlanks(curCard.topWord, 5);
  }
   view_pageBreak = '';
  //pageMargins:[8,8,10.5,10.5],
  dx00 = `{info:{title:'Bingo Cards',author:'Bangarang Bingo',subject:'',keywords:''},pageOrientation:'portrait',pageSize:'A4',content:[`;

  /*

  */

  dx01 = `{alignment:'center',background:'',content:[],table:{headerRows:1,widths:[94,94,94,94,94],margin:[0,0,0,0],heights:[64,16,124,124,124,124,124],body:[[{text:'${view_topWord[0]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[1]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[2]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[3]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[4]}',bold:true,style:'top',fontSize:64}],[{text:' ',colSpan:5,fillColor:'${curCard.fillColor}'}],['${curCard.cellDat[0]}','${curCard.cellDat[1]}','${curCard.cellDat[2]}','${curCard.cellDat[3]}','${curCard.cellDat[4]}'],['${curCard.cellDat[5]}','${curCard.cellDat[6]}','${curCard.cellDat[7]}','${curCard.cellDat[8]}','${curCard.cellDat[9]}'],['${curCard.cellDat[10]}','${curCard.cellDat[11]}',{text:'\\n\\n${curCard.freeStr}',bold:true,fontSize:${curCard.freeFontSize},color:'${curCard.freeFontColor}'},'${curCard.cellDat[13]}','${curCard.cellDat[14]}'],['${curCard.cellDat[15]}','${curCard.cellDat[16]}','${curCard.cellDat[17]}','${curCard.cellDat[18]}','${curCard.cellDat[19]}'],['${curCard.cellDat[20]}','${curCard.cellDat[21]}','${curCard.cellDat[22]}','${curCard.cellDat[23]}','${curCard.cellDat[24]}',]]}`;

  dx02 = `${view_pageBreak},layout:{hLineColor:'${curCard.fillColor}', vLineColor:'${curCard.fillColor}'}}],styles:{top:{alignment:'center',color:'#ffffff',fillColor:'${curCard.fillColor}'},sub:{fontSize:32,bold:true},fill:{fillColor:'${curCard.fillColor}'},quote:{italics:true},small:{fontSize:8}}}`;

  dx = `${dx00}${dx01}${dx02}`;

  dd2 = JSON5.parse(dx);

  pdf00 = pdfMake.createPdf(dd2, pdfMake.fonts, pdfMake.vfs);

  height = window.innerHeight - 32;
  pdf00.getBase64((data) => { 
    //data = preData + data;
    //document.getElementById('PDFobj').data = `data:application/pdf;base64, ${data}`;
    //docment.getElementById('PDFobj').data = preData + data;
    document.getElementById('PDFdiv').innerHTML = `<object id="PDFobj" width="${width}" height="${height}" data="data:application/pdf;base64, ${data}"></object>`;
  });
}

window.addEventListener('resize', function(height){ height = window.innerHeight - 32; document.getElementById('PDFobj').height = height;}, true);

if(!init) {
  picker = '#000000';
  update(null, true);
}

/*
function fixCellDat(str, tmpCurCard) {
	let len = str.length;
	if(len !== 0) {
		if(len > tmpCurCard.charMax) {
			str = str.slice(0, tmpCurCard.charMax);
			return str;
		}	
		
		if(len > tmpCurCard.charMax) {
			let lines = Math.round(tmpCurCard.charMax / len);
			if(lines > tmpCurCard.marginLines) { return str; }
			let i = 0;
			for(;i < tmpCurCard.marginLines-lines;){

			}
		}
	}
	else { return ' '; }
	return str;
}
*/

function fixCellDat(tmp_curCard, i) {
	let len = tmp_curCard.cellStr.length;
	let strMargin = '\\n\\n\\n';
	if(len !== 0) {
		if(len > tmp_curCard.charMax) {
			tmp_curCard.cellStr = tmp_curCard.cellStr.slice(0, tmp_curCard.charMax);
		} else {			
		if(len > tmp_curCard.charMax) {
			let lines = Math.round(tmp_curCard.charMax / len);
			if(lines >= tmp_curCard.marginLines) { strMargin = ''; }
			let j = 0;
			strMargin = '\\n';
			for(; j < tmp_curCard.marginLines - lines; j++) { strMargin += strMargin; }
			}
		}
	} else { tmp_curCard.cellStr = ''; }
	if(!tmp_curCard.init) { 
		tmp_curCard.cellMarginDat.push(strMargin);
		tmp_curCard.cellDat.push(tmp_curCard.cellStr); 
	} else { 
		tmp_curCard.cellMarginDat[i] = strMargin;
		tmp_curCard.cellDat[i] = tmp_curCard.cellStr; 
	}
	return tmp_curCard;
}

function genCells(tmp_curCard) {
	if(!tmp_curCard.init) {
		tmp_curCard.init = true;
	}
	
	if(!tmp_curCard.isNum) {
		tmp_curCard.topWord = tmp_curCard.arrList[0];
	}
	tmp_curCard.cell_viewStr = `${tmp_curCard.topWord}`;

	if(tmp_curCard.randMode !== 'none') {
		tmp_curCard.cell_viewStr += '\n';
	}

	let curW = 1;
	let curH = 1;
	let cardMax = 0;
	let i = 0;
	let finish = (tmp_curCard.numCells * tmp_curCard.numCards) + 1;
		
	for(; i < finish ;) {		
		if(cardMax != tmp_curCard.numCenter - 20 && tmp_curCard.isCenterFree) {
			if(tmp_curCard.isNum) {
				tmp_curCard.cellStr = Math.round(Math.random() * tmp_curCard.valMax);			
			if(tmp_curCard.isPad0) {
					tmp_curCard.cellStr = pad(tmp_curCard.cellStr, `${tmp_curCard.valMax}`.length);
				}
        tmp_curCard.cell_viewStr += tmp_curCard.cellStr;
        tmp_curCard.list_viewStr += tmp_curCard.cellStr;
			} else {
				if(tmp_curCard.randMode === 'norm') {
					tmp_curCard.cellStr = fillBlank(tmp_curCard.arrList[Math.floor(Math.random() * (tmp_curCard.valMax - 1) + 1)]);
				} else {
					tmp_curCard.cellStr = fillBlank(tmp_curCard.arrList[i+1]);
				}
				tmp_curCard.cell_viewStr += tmp_curCard.cellStr;
				if(i !== cardMax - 1) {
          tmp_curCard.cell_viewStr += '\n';
          tmp_curCard.list_viewStr += '\n';
				}
				tmp_curCard.cellStr = escQuote(tmp_curCard.cellStr);
			}
		} else {
			tmp_curCard.cellStr = tmp_curCard.freeStr;
		}
		if(!this.init)	{
			//tmp_curCard.cellDat.push(tmp_curCard.cellStr);
			//trmpCurCard.cellMarginDat;
		} else {
			//tmp_curCard.cellDat[i] = tmp_curCard.cellStr;
			//tmp_curCard = fixCellDat(tmp_curCard, i);
		}
		//console.log(`0000000000000000002: ${tmp_curCard.cellDat[i]}`);	
  
    //console.log(`00: ${tmp_curCard.cellStr}`);
		tmp_curCard = fixCellDat(tmp_curCard, i);
		//console.log(`01: ${tmp_curCard.cellStr}`);
    
    //console.log(`###################3: ${tmp_curCard.cellDat[i]}`);	

		++curW;
		if(curW > tmp_curCard.numCols) {
			curW = 1;
			++curH;
		}
		++cardMax;
		if(cardMax > tmp_curCard.numCells) {
			cardMax = 1;
		}
		i++;
	}
  tmp_curCard.init = false;
  //console.log(`EoC tmp_curCard.cellStr: ${tmp_curCard.cellStr}`);
	return tmp_curCard;
}

//export { BingoCard }

/////////////////////////////////////////////////////////////////////
//File loading:
/////////////////////////////////////////////////////////////////////

/*
pdf00.getBase64((data) => { 
  document.getElementById('pdfDiv').innerHTML = '<svg id="svg00"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + 
  width + '" height="' + height + '" src = "data:image/svg+xml;base64, ' + data +
  '"></svg>';
  //alert(data);
});
*/

/*
pdf00.getBuffer( function (buffer) {
  const dataUrl =  URL.createObjectURL(new Blob([buffer], {
      type: "application/pdf" 
    }
}));
document.getElementById('PDFiframe').src = dataUrl;
  
*/    

/*
pdf01.getDataUrl(function (outDoc) {
  document.getElementById('PDFiframe').src = outDoc;
});
*/

/*
pdf01.getDataUrl(function (outDoc) {
  document.getElementById('PDFiframe').src = outDoc;
});
*/
/////////////////////////////////////////////////////////////////////


function goPDF(str = 'open', dd = docDefinition, PDFname = 'doc.pdf') { 
  switch(str) {
    case 'open':
      try { //pdfMake.createPdf(dd, pdfMake.fonts, pdfMake.vfs).open({}, window); 
      pdf00.open({}, window);}
      catch(err){ console.log('PDF failed to open.') };
      break;
    case 'download':
      try { pdfMake.createPdf(dd).download(PDFname); }
      catch(err){ console.log('PDF failed to download.') };
      break;
    case 'print':
      try { pdf00.print({}, window); }
      catch(err){ console.log('PDF failed to print.') };
      break;
    case 'preview':
      try { console.log(data); }
      catch(err){ console.log('PDF failed to preview.') };
      break;
  }
}

