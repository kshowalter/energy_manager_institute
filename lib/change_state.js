export default function change_props(shape, end){

  if( shape.meta && shape.meta.alts && shape.meta.alts.length > 0 ){
    shape.meta.alts.push( shape.props );
    shape.props = shape.meta.alts[0];
    shape.meta.alts.shift();
  }

  if( ! end && shape.meta && shape.meta.linked && shape.meta.linked.length > 0 ){
    shape.meta.linked.forEach(function(shape){
      change_props(shape, true);
    });
  }

}
