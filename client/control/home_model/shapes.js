import mk_shape from '../../../lib/mk_shape';
import link_shapes from '../../../lib/link_shapes';

export default function(state){
  var shape;
  var group;
  var shapes = [];

  var x, y, w, h;

  x = state.locations.center.x;
  y = state.locations.center.y;

  group = mk_shape('group');
  shapes.push(group);

  w = 10;
  h = 30;
  shape = mk_shape('rect', 'fill', 'blue', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h])
  ]);
  group.children.push(shape);

  w = 30;
  h = 10;
  shape = mk_shape('rect', 'fill', 'blue', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h])
  ]);
  group.children.push(shape);

  x = state.locations.center.x + 50;

  group = mk_shape('group');
  shapes.push(group);

  w = 10;
  h = 30;
  shape = mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'fill', 'blue', [x-w/2,y-h/2,w,h])
  ]);
  group.children.push(shape);

  w = 30;
  h = 10;
  shape = mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'fill', 'blue', [x-w/2,y-h/2,w,h])
  ]);
  group.children.push(shape);

  link_shapes(shapes.slice(-2));





  x = 100;
  y = 100;
  w = 100;
  h = 100;
  shape = mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'fill', 'blue', [x-w/2,y-h/2,w,h])
  ]);
  shapes.push(shape);

  x = 600;
  y = 600;
  w = 100;
  h = 100;
  shape = mk_shape('rect', 'fill', 'purple', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'stroke', 'purple', [x-w/2,y-h/2,w,h])
  ]);
  shapes.push(shape);

  link_shapes(shapes.slice(-2));


  return shapes;
}
