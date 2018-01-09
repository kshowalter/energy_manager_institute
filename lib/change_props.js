import analyze_shape from './analyze_shape';


export default function change_props(shape, end){
  console.log("before", shape.props.type);

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

  if( shape.children && shape.children.length > 0 ){
    shape.children.forEach(function(child_shape){
      change_props(child_shape, end);
    });
  }

  shape = analyze_shape(shape);

  console.log("after", shape.props.type);
  return shape;
}
