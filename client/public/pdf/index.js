//import { BingoCard } from "./BingoCard.js";

let init = false;
let curCard = new BingoCard();

function toggleEdit() {
  toggleDisplay('editArea'); 
  document.getElementById('editPDF_btn').value = toggleVal(document.getElementById('editPDF_btn').value, 'Text', 'View'); 
}

function checkText(id, old, delay) {
  if(
      document.getElementById(id).value !== old && 
      document.getElementById(id).value !== curCard.view_str
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
  arrDat = str.split('\n');
  curCard.valMax = arrDat.length;
  curCard.valMin = 0;
  curCard.isNum = false;
  update(null, true);
}


setTimeout(function () { checkText('editArea', document.getElementById('editArea').value, 50); }, 200);

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
  arrDat = eval(`dat_${cmdStr}`).split('\n');
  curCard.valMax = arrDat.length;
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

function arrJSON(arr) {
let i = 0;
let str = '';
arr = arr.split('\n');
let len = arr.length;
for(; i < len; i++) {
  str += '/*'+ pad(i, (len +'').length) +'*/ docArr.push(`' + arr[i] + '`);\n';
}
}

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
let height = '1920';
let imgWidth = '';
let imgHeight = '';
let view_topWord = '';
let view_cellDat = [''];
let view_pageBreak = 'pageBreak: "after"';

function setTextColor(picker) {
  document.getElementsByTagName('body')[0].style.color = '#' + picker.toString();
}
  
function update(color, updateText) {
  //console.log('color: ' + color);
  
    
  if(!init) {
    //document.getElementById('jscolor_btn').style.backgroundColor = '#000000';
    init = true;
  }

  if(color !== curCard.fillColor && color !== null) {
    curCard.fillColor = '#' + color;
  //  setTimeout(toggleDisplay());
  }

  if(updateText) {
    //let val = document.getElementById('editArea').value.split['\n'];
    //val = val[0].split(`-`);

    	if(	curCard.randMode !== 'none') {
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

  //pageMargins:[8,8,10.5,10.5],
  dx00 = `{info:{title:'Bingo Cards',author:'Bangarang Bingo',subject:'',keywords:''},pageOrientation:'portrait',pageSize:'A4',content:[`;

  dx01 = `{alignment:'center',background:'',content:[],table:{headerRows:1,widths:[94,94,94,94,94],margin:[0,0,0,0,],heights:[64,16,124,124,124,124,124],body:[[{text:'${view_topWord[0]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[1]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[2]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[3]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[4]}',bold:true,style:'top',fontSize:64}],[{text:' ',colSpan:5,fillColor:'${curCard.fillColor}'}],['${curCard.cellDat[0]}','${curCard.cellDat[1]}','${curCard.cellDat[2]}','${curCard.cellDat[3]}','${curCard.cellDat[4]}'],['${curCard.cellDat[5]}','${curCard.cellDat[6]}','${curCard.cellDat[7]}','${curCard.cellDat[8]}','${curCard.cellDat[9]}'],['${curCard.cellDat[10]}','${curCard.cellDat[11]}',{text:'\\n\\n${curCard.freeStr}',bold:true,fontSize:${curCard.freeFontSize},color:'${curCard.freeFontColor}'},'${curCard.cellDat[13]}','${curCard.cellDat[14]}'],['${curCard.cellDat[15]}','${curCard.cellDat[16]}','${curCard.cellDat[17]}','${curCard.cellDat[18]}','${curCard.cellDat[19]}'],['${curCard.cellDat[20]}','${curCard.cellDat[21]}','${curCard.cellDat[22]}','${curCard.cellDat[23]}','${curCard.cellDat[24]}',]]}`;

  dx02 = `,${view_pageBreak},layout:{hLineColor:'${curCard.fillColor}', vLineColor:'${curCard.fillColor}'}}],styles:{top:{alignment:'center',color:'#ffffff',fillColor:'${curCard.fillColor}'},sub:{fontSize:32,bold:true},fill:{fillColor:'${curCard.fillColor}'},quote:{italics:true},small:{fontSize:8}}}`;

  dx = `${dx00}${dx01}${dx02}`;

  dd2 = JSON5.parse(dx);

  pdf00 = pdfMake.createPdf(dd2, pdfMake.fonts, pdfMake.vfs);

  pdf00.getBase64((data) => { 
    //data = preData + data;
    //document.getElementById('PDFobj').data = `data:application/pdf;base64, ${data}`;
    //document.getElementById('PDFobj').data = preData + data;
    document.getElementById('PDFdiv').innerHTML = `<object id="PDFobj" width="${width}" height="${height}" data="data:application/pdf;base64, ${data}"></object>`;
  });
}

update(null, true);

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

