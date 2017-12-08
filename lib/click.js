import change_state from './change_state';

var global = window || global;

var clicked = function(spec, coor){
  var x1 = spec.props.x;
  var x2 = spec.props.x + spec.props.dx;
  var y1 = spec.props.y;
  var y2 = spec.props.y + spec.props.dy;
  return ( coor.x > x1 ) && ( coor.x < x2 ) && ( coor.y > y1 ) && ( coor.y < y2 );
};

var update_shape = function update_shape( shape, coor, just_check ){
  var updated = false;
  if( shape.tag === 'group' ){
    shape.children.forEach(function(child_shape){
      updated = update_shape( child_shape, coor, true ) || updated;
    });
    if(updated){
      change_state( shape );
    }
  } else {
    if( clicked(shape, coor) ){
      updated = true;
      if( ! just_check ){
        change_state( shape );
      }
    }
  }
  return updated;
};

export default function(coor){
  var updated = false;
  global.page_state.shapes.forEach(function(shape){
    updated = update_shape(shape, coor) || updated;
  });
  global.page_state.update = updated;
}
