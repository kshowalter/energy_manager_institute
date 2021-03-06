import change_props from './change_props';

var global = window || global;

var clicked = function(spec, coor){
  return ( coor.x > spec.props.min_x ) && ( coor.x < spec.props.max_x ) && ( coor.y > spec.props.min_y ) && ( coor.y < spec.props.max_y );
};

var check_shape = function check_shape( shape, coor){
  if( shape.tag === 'group' ){
    var updated = false;
    for( var i = 0; i<shape.children.length; i++ ){
      var child_shape = shape.children[i];
      if(check_shape( child_shape, coor )){
        return true;
      }
    }
  } else {
    if( clicked(shape, coor) ){
      return true;
    }
  }
  return false;
};

var update_shape = function update_shape( shape, coor, just_check ){
  var new_shape = false;
  if( shape.tag === 'group' ){
    var updated = false;
    shape.children.forEach(function(child_shape){
      updated = update_shape( child_shape, coor, true ) ? true : updated;
    });
    if(updated){
      new_shape = change_props( shape );

    }
  } else {
    if( clicked(shape, coor) ){
      if( ! just_check ){
        new_shape = change_props( shape );
      } else {
        return true;
      }
    }
  }

  return new_shape;
};

export default function(existing_state, coor){
  existing_state.update = false;
  existing_state.shapes.forEach(function(shape, i){
    if( check_shape(shape, coor) ){
      var new_shape = update_shape(shape, coor);
      if(new_shape){
        existing_state.shapes[i] = new_shape;
        existing_state.update = true;
        if(shape.meta.action_name){
          existing_state.shape_action_queue.push(shape.meta.action_name);
        }
      }
    }
  });
  return existing_state;
}
