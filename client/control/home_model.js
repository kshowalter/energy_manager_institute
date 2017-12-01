import draw_on_canvas from '../../lib/draw_on_canvas';
import shape from '../../lib/shape_maker';
import mouse from '../../lib/mouse';

var state = {
  specs: {},
  center: {
    x: 300,
    y: 300,
  }
};
var id = 'canvas';
var canvas;
console.log('canvas', canvas);

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var x = state.center.x;
  var y = state.center.y;

  state.specs = [
    shape('fill', 'white', 'rect', [0, 0, canvas.width, canvas.height]),

    shape('stroke', 'red', 'rect', [x,y,100,300]),
    shape('fill', 'blue', 'rect', [x,y,300,100]),
  ];

  ctx.save();

  draw_on_canvas(canvas, state.specs);

  ctx.restore();

  window.requestAnimationFrame(draw);
}

export default function(){

  canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');


    mouse(canvas, state);

    window.requestAnimationFrame(draw);
  } else {
    console.log('NO CANVAS');
  }


}
