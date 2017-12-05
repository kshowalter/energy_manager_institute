import mk_shape from '../../../lib/shape_maker';
import link_shapes from '../../../lib/link_shapes';

export default function(state){
  var shapes = [];

  var x = state.locations.center.x;
  var y = state.locations.center.y;
  var w;
  var h;


  w = 100;
  h = 300;
  shapes.push(mk_shape('stroke', 'red', 'rect', [x-w/2,y-h/2,w,h]));

  w = 300;
  h = 100;
  shapes.push(mk_shape('fill', 'blue', 'rect', [x-w/2,y-h/2,w,h]));


  x = 100;
  y = 100;
  w = 100;
  h = 100;
  shapes.push(mk_shape('stroke', 'blue', 'rect', [x-w/2,y-h/2,w,h], [
    mk_shape('fill', 'blue', 'rect', [x-w/2,y-h/2,w,h]).props
  ]));


  x = 500;
  y = 100;
  w = 100;
  h = 100;
  shapes.push(mk_shape('fill', 'blue', 'rect', [x-w/2,y-h/2,w,h], [
    mk_shape('stroke', 'blue', 'rect', [x-w/2,y-h/2,w,h]).props
  ]));

  link_shapes(shapes.slice(-2));


  return shapes;
}
