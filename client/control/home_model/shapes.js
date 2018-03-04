import mk_shape from '../../../lib/mk_shape';
import link_shapes from '../../../lib/link_shapes';
import analyze_shape from '../../../lib/analyze_shape';
import parse_svg_path from '../../../lib/parse_svg_path';

export default function(state){
  var shape;
  var group;
  var shapes = [];
  var path;

  var x, y, w, h;

  group = mk_shape('group');
  shapes.push(group);

  // ground floor
  x = 500;
  y = 500;
  w = 500;
  h = 150;
  shape = mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h], null, 'house');
  group.children.push(shape);

  // second floor
  y -= 150;
  shape = mk_shape('rect', 'stroke', 'blue', [x-w/2,y-h/2,w,h], null, 'house');
  group.children.push(shape);

  // roof
  y -= 75;
  y -= 150;
  path = [
    {x:x,y:y},
    [275,150],
    [-550,0],
    'close'
  ];
  shape = mk_shape('path', 'stroke', 'blue', path, null, 'status:document');
  group.children.push(shape);



  x = 100;
  y = 500;
  path = [
    {x:x,y:y},
    [30,0],
    [0,10,10,10],
    [0,20],
    [0,10,-10,10],
    [-20,0],
    [-10,0,-10,-10],
    'close'
  ];
  shape = mk_shape('path', 'fill', 'black', path,[
    mk_shape('path', 'stroke', 'grey', path),
  ], 'status:document');
  shapes.push(shape);

  x = 500;
  y = 500;
  path = [
    {x:x,y:y},
    [30,0],
    [0,10,10,10],
    [0,20],
    [0,10,-10,10],
    [-20,0],
    [-10,0,-10,-10],
    'close'
  ];
  shape = mk_shape('path', 'stroke', 'grey', path,[
    mk_shape('path', 'fill', 'black', path),
  ], 'status:document');
  shapes.push(shape);

  link_shapes(shapes,2);



  var d2 = "M119.4,176.6v293.6h24.5V490h47.4v-19.8H299V490h47v-19.8h24.5V176.6H119.4z M167.2,264.1c0,5.4-4.3,9.7-9.7,9.7     s-9.7-4.3-9.7-9.7v-57.2c0-5.4,4.3-9.7,9.7-9.7s9.7,4.3,9.7,9.7V264.1z";
  path = parse_svg_path(d2);
  console.log(path);
  shape = mk_shape('path', 'stroke', 'grey', path);
  shapes.push(shape);




  var d2 = "M 370.6,157.1 V 0 H 119.4 V 157.1 Z M 147.4,67.3 c 0,-5.4 4.3,-9.7 9.7,-9.7 5.4,0 9.7,4.3 9.7,9.7 v 57.2 c 0,5.4 -4.3,9.7 -9.7,9.7 -5.4,0 -9.7,-4.3 -9.7,-9.7 z";
  path = parse_svg_path(d2);
  console.log(path);
  shape = mk_shape('path', 'stroke', 'grey', path);
  shapes.push(shape);




  /*

  x = 300;
  y = 340;

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

  x += 50;

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

   //*/



  shapes.forEach(analyze_shape);
  return shapes;
}
