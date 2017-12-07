import change_state from './change_state';

var global = window || global;

export default function(coor){
  global.page_state.shapes.forEach(function(shape){

    var x1 = shape.props.x;
    var x2 = shape.props.x + shape.props.dx;
    var y1 = shape.props.y;
    var y2 = shape.props.y + shape.props.dy;

    var clicked = ( coor.x > x1 ) && ( coor.x < x2 ) &&
                  ( coor.y > y1 ) && ( coor.y < y2 );


    if(clicked){
      change_state( shape );
    }


    global.page_state.update = true;
    shape.meta.clicked = true;
  });


}
