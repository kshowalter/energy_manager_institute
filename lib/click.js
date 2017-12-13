import change_state from './change_state';

var global = window || global;

var clicked = function(spec, coor){
  return ( coor.x > spec.props.min_x ) && ( coor.x < spec.props.max_x ) && ( coor.y > spec.props.min_y ) && ( coor.y < spec.props.max_y );
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
