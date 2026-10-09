// RFC-style quoted CSV fields, including embedded commas, quotes and newlines.
function parseCSV(text){let rows=[],row=[],field='',quoted=false;const input=text.replace(/^\uFEFF/,'');
 for(let i=0;i<input.length;i++){const c=input[i];if(c==='"'){if(quoted&&input[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
 else if(c===','&&!quoted){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&input[i+1]==='\n')i++;row.push(field);if(row.some(Boolean))rows.push(row);row=[];field='';}else field+=c;}
 if(quoted)throw Error('Unterminated CSV quote');if(field||row.length){row.push(field);rows.push(row);}const headers=rows.shift()||[];
 return{headers,rows:rows.map(values=>Object.fromEntries(headers.map((h,i)=>[h,values[i]||''])))};
}
if(typeof module!=='undefined')module.exports=parseCSV;
