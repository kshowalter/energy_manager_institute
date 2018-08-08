import f from 'functions';

function process_db_doc(doc,db_id){

  if(doc.type === 'light'){
    doc.load = doc.load || Math.ceil( doc.output * doc.eff );
    doc.cost = doc.cost || Math.ceil( doc.output / doc.eff / 50 );
  }
  if(doc.type === 'photovoltaic_panel'){
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

  doc.name = doc.name || f.pretty_name(doc.type);
  doc.label = doc.name;
  if( doc.load || doc.supply ){
    doc.label += ' (';
    if( doc.load ) doc.label += '-'+doc.load+doc.unit;
    if( doc.supply ) doc.label += '+'+doc.supply+doc.unit;
    if( doc.cost ) doc.label += ' ,'+doc.cost+'$';
    doc.label += ')';

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
    components[i] = doc;
  });



  return components;
}
