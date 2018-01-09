import mk_shape from '../../../lib/mk_shape';
import link_shapes from '../../../lib/link_shapes';
import analyze_shape from '../../../lib/analyze_shape';

export default function(state){
  var shape;
  var group;
  var shapes = [];
  var path;

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

  link_shapes(shapes,2);





  x = 100;
  y = 100;
  w = 100;
  h = 100;
  shape = mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'fill', 'blue', [x-w/2,y-h/2,w,h])
  ], 'add:refrig1');
  shapes.push(shape);

  x = 600;
  y = 600;
  w = 100;
  h = 100;
  shape = mk_shape('rect', 'fill', 'purple', [x-w/2,y-h/2,w,h], [
    mk_shape('rect', 'stroke', 'purple', [x-w/2,y-h/2,w,h])
  ], 'remove:refrig1');
  shapes.push(shape);

  link_shapes(shapes,2);





  path = [
    {x:40,y:200},
    [30,0],
    [0,10,10,10],
    [0,20],
    [0,10,-10,10],
    [-20,0],
    [-10,0,-10,-10],
    'close'
  ];
  shape = mk_shape('path', 'stroke', 'blue', path,[
    mk_shape('path', 'stroke', 'red', path),
    mk_shape('path', 'fill', 'red', path),
  ], 'status:document');
  shapes.push(shape);


  shape = mk_shape('circ', 'fill', 'red', [500,500,50], [
    mk_shape('circ', 'fill', 'purple', [500,500,50])
  ]);
  shapes.push(shape);





  shapes.forEach(analyze_shape);
  return shapes;
}
