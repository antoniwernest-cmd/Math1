// Rebase the catalogue's links at download time, without loading its PNGs into ExcelJS.
window.ML_CATALOG_LINKS=async(blob,siteURL,questionIDs)=>{
 const bytes=new Uint8Array(await blob.arrayBuffer()),view=new DataView(bytes.buffer),decoder=new TextDecoder(),encoder=new TextEncoder();
 let end=bytes.length-22;for(;end>=Math.max(0,bytes.length-65557)&&view.getUint32(end,true)!==0x06054b50;end--);if(end<0)throw Error('The catalogue could not be opened.');
 const count=view.getUint16(end+10,true),centralOffset=view.getUint32(end+16,true),entries=[];let p=centralOffset;
 for(let i=0;i<count;i++){if(view.getUint32(p,true)!==0x02014b50)throw Error('The catalogue index is incomplete.');const n=view.getUint16(p+28,true),extra=view.getUint16(p+30,true),comment=view.getUint16(p+32,true),size=46+n+extra+comment;entries.push({name:decoder.decode(bytes.subarray(p+46,p+46+n)),header:bytes.slice(p,p+size),offset:view.getUint32(p+42,true),compressed:view.getUint32(p+20,true),method:view.getUint16(p+10,true)});p+=size}
 const table=Uint32Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0}),crc=data=>{let c=0xffffffff;for(const b of data)c=table[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0};
 const base=new URL('.',siteURL),ids=new Set(questionIDs),added=[];let offset=bytes.length,changed=0;
 for(const entry of entries.filter(e=>/^xl\/worksheets\/_rels\/[^/]+\.rels$/.test(e.name))){
  const at=entry.offset+30+view.getUint16(entry.offset+26,true)+view.getUint16(entry.offset+28,true),data=bytes.subarray(at,at+entry.compressed);let plain;
  if(entry.method===0)plain=data;else if(entry.method===8)plain=new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());else throw Error('This catalogue format is unavailable.');
  const xml=new DOMParser().parseFromString(decoder.decode(plain),'application/xml'),nodes=[...xml.getElementsByTagNameNS('*','Relationship')],rows=new Map();let updated=false;
  for(const node of nodes){const target=node.getAttribute('Target'),match=target?.match(/(?:^|\/)screens\/([^/]+)\.png$/);if(!match)continue;const id=decodeURIComponent(match[1]);rows.set(node.getAttribute('Id').replace(/^catalogD/,''),id);node.setAttribute('Target',new URL('screens/'+encodeURIComponent(id)+'.png',base).href);updated=true;changed++}
  for(const node of nodes){if(node.getAttribute('Target')!=='Math-Landing.html')continue;const id=rows.get(node.getAttribute('Id').replace(/^catalogE/,'')),url=new URL(base);if(ids.has(id))url.searchParams.set('question',id);node.setAttribute('Target',url.href);updated=true;changed++}
  if(!updated)continue;
  const content=encoder.encode(new XMLSerializer().serializeToString(xml)),name=encoder.encode(entry.name),checksum=crc(content),local=new Uint8Array(30+name.length),lv=new DataView(local.buffer),cv=new DataView(entry.header.buffer);
  lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0x800,true);lv.setUint16(8,0,true);lv.setUint16(10,cv.getUint16(12,true),true);lv.setUint16(12,cv.getUint16(14,true),true);lv.setUint32(14,checksum,true);lv.setUint32(18,content.length,true);lv.setUint32(22,content.length,true);lv.setUint16(26,name.length,true);local.set(name,30);
  cv.setUint16(8,0x800,true);cv.setUint16(10,0,true);cv.setUint32(16,checksum,true);cv.setUint32(20,content.length,true);cv.setUint32(24,content.length,true);cv.setUint32(42,offset,true);added.push(local,content);offset+=local.length+content.length;
 }
 if(changed!==4686)throw Error('The catalogue links are incomplete. Please try the download again.');
 const central=entries.map(e=>e.header),size=central.reduce((n,b)=>n+b.length,0),footer=new Uint8Array(22),fv=new DataView(footer.buffer);fv.setUint32(0,0x06054b50,true);fv.setUint16(8,count,true);fv.setUint16(10,count,true);fv.setUint32(12,size,true);fv.setUint32(16,offset,true);
 return new Blob([blob,...added,...central,footer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
};
