
//import { BingoCard } from "./BingoCard.js";

function checkText2(delay) {
  if(document.getElementById('inputField').value !== `${curCard.numCards}` && 
	!(isNaN(parseInt(document.getElementById('inputField').value))) &&
	parseInt(document.getElementById('inputField').value) > 0
	) {
    //console.log(`NO MATCH: ${document.getElementById('inputField').value} ${curCard.numCards}`)  
    curCard.numCards = document.getElementById('inputField').value;
    curCard.randMode = 'none';
    curCard = genCells(curCard);
    update2(null, false);
    delay = 200;
    console.log(curCard.numCards);
  } else {
    delay = 500;
  }
  setTimeout(function () { checkText2(delay); }, delay);
}

setTimeout(function () { checkText2(200); }, 200);




function update2(color, updateText) {
  //console.log('color: ' + color);

  if(!init) {
    //document.getElementById('jscolor_btn').style.backgroundColor = '#000000';
    init = true;
  }

  if(color !== curCard.fillColor && color !== null) {
    curCard.fillColor = `#${color}`;
  }

  if(updateText) {
    	if(curCard.randMode !== 'none') {
        document.getElementById('editArea').value = '';
	  }
    
  curCard = genCells(curCard);
  
    if(!curCard.isNum) {
      if(	curCard.randMode !== 'none') {
        document.getElementById('editArea').value = curCard.view_str;
      }
    }
  }
  
  if(!curCard.topWord.match(/\\/i) && !curCard.topWord.match(/\'/i)) {
    view_topWord = fillBlanks(curCard.topWord, 5);
  }

  view_pageBreak = '';
  //pageMargins:[8,8,10.5,10.5],
  //{alignment:'center',background:'',content:[],;
  let comma = ','
  dx00 = `{info:{title:'Bingo Cards',author:'Bangarang Bingo',subject:'',keywords:''},pageOrientation:'portrait',pageSize:'A4',content:[`;
  let i = 0;
  dx01 = '';
  for(; i < curCard.numCards; i++) {
    dx01 += `{alignment:'center',background:'',content:[],table:{headerRows:1,widths:[94,94,94,94,94],margin:[0,0,0,0,],heights:[64,16,124,124,124,124,124],body:[[{text:'${view_topWord[0]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[1]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[2]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[3]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[4]}',bold:true,style:'top',fontSize:64}],[{text:' ',colSpan:5,fillColor:'${curCard.fillColor}'}],['${curCard.cellDat[i+0]}','${curCard.cellDat[i+1]}','${curCard.cellDat[i+2]}','${curCard.cellDat[i+3]}','${curCard.cellDat[i+4]}'],['${curCard.cellDat[i+5]}','${curCard.cellDat[i+6]}','${curCard.cellDat[i+7]}','${curCard.cellDat[i+8]}','${curCard.cellDat[i+9]}'],['${curCard.cellDat[i+10]}','${curCard.cellDat[i+11]}',{text:'\\n\\n${curCard.freeStr}',bold:true,fontSize:${curCard.freeFontSize},color:'${curCard.freeFontColor}'},'${curCard.cellDat[i+13]}','${curCard.cellDat[i+14]}'],['${curCard.cellDat[i+15]}','${curCard.cellDat[i+16]}','${curCard.cellDat[i+17]}','${curCard.cellDat[i+18]}','${curCard.cellDat[i+19]}'],['${curCard.cellDat[i+20]}','${curCard.cellDat[i+21]}','${curCard.cellDat[i+22]}','${curCard.cellDat[i+23]}','${curCard.cellDat[i+24]}']]},${view_pageBreak}layout:{hLineColor:'${curCard.fillColor}', vLineColor:'${curCard.fillColor}',}},`;

    if(i === curCard.numCards - 1) {
      //comma = '';
    }
    
  }
  dx02 = `],styles:{top:{alignment:'center',color:'#ffffff',fillColor:'${curCard.fillColor}'},sub:{fontSize:32,bold:true},fill:{fillColor:'${curCard.fillColor}'},quote:{italics:true},small:{fontSize:8}}}`;

  dx = `${dx00}${dx01}${dx02}`;
  console.log(dx);

  dd2 = JSON5.parse(dx);

  pdf00 = pdfMake.createPdf(dd2, pdfMake.fonts, pdfMake.vfs);

  height = window.innerHeight - 32;
  pdf00.getBase64((data) => { 
    //data = preData + data;
    //document.getElementById('PDFobj').data = `data:application/pdf;base64, ${data}`;
    //document.getElementById('PDFobj').data = preData + data;
    document.getElementById('PDFdiv').innerHTML = `<object id="PDFobj" width="${width}" height="${height}" data="data:application/pdf;base64, ${data}"></object>`;
  });
}
