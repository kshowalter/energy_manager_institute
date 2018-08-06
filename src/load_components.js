function process_db_doc(doc,db_id){

  if(doc.type === 'light_incandecent'){
    doc.load = doc.load || Math.ceil( doc.output / 1 );
    doc.cost = doc.cost || Math.ceil( doc.output / 20 );
  }
  if(doc.type === 'light_florecent'){
    doc.load = doc.load || Math.ceil( doc.output / 3 );
    doc.cost = doc.cost || Math.ceil( doc.output / 3 );
  }
  if(doc.type === 'light_led'){
    doc.load = doc.load || Math.ceil( doc.output / 10 );
    doc.cost = doc.cost || Math.ceil( doc.output / 6 );
  }
  if(doc.type === 'PV'){
    doc.cost = doc.cost || Math.ceil( doc.supply * 2 );
  }
  if(doc.type === 'appliance'){
    doc.cost = doc.cost || Math.ceil( doc.load / 3 );
  }
  if(doc.type === 'electronic'){
    doc.cost = doc.cost || Math.ceil( doc.load * 2 );
  }
  if(doc.type === 'AC'){
    doc.cost = doc.cost || Math.ceil( doc.load * 1 );
  }

  var name = doc.name;
  doc.name = doc.type;
  doc.name += name ? ': '+name+' ' : '';
  if( !doc.load && !doc.supply ){

  } else {
    doc.name += '(';
    if( doc.load ) doc.name += '-'+doc.load+doc.unit;
    if( doc.supply ) doc.name += '+'+doc.supply+doc.unit;
    doc.name += ')';

  }

  doc.db_id = db_id;
  return doc;
}

export default function(components){
  components.tree = {};

  components.docs.forEach((doc,i)=>{
    doc = process_db_doc(doc,i);
    components.tree[doc.type] = components.tree[doc.type] || [];
    components.tree[doc.type].push(doc);
  });



  return components;
}
