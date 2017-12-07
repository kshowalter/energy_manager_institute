import draw_on_canvas from '../../lib/draw_on_canvas';
import mk_shape from '../../lib/mk_shape';
import mouse from '../../lib/mouse';
import shapes from './home_model/shapes';
import click from '../../lib/click';

var global = window || global;


var state = global.page_state = {
  specs: {},
  update: true,
  shapes: {},
  locations: {
    center: {
      x: 300,
      y: 300,
    }

  }
};
state.shapes = shapes(state);


var id = 'canvas';
var canvas;
//console.log('canvas', canvas);selected

function draw() {
  if( state.update ){
    console.log('|>raw');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    state.specs = [
      mk_shape('rect', 'fill', 'white', [0, 0, canvas.width, canvas.height]),
    ];

    state.shapes.forEach(function(shape){
      state.specs.push(shape);
    });

    ctx.save();

    draw_on_canvas(canvas, state.specs);

    ctx.restore();

    state.update = false;
    window.requestAnimationFrame(draw);
  }
}

var actions = {
  center: function(coor){
    state.center = coor;
    draw();
  },
  click: function(coor){
    click(coor);
    console.log('changed, redraw');
    draw();
  },
};


export default function(){

  canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');


    mouse(canvas, actions);

    window.requestAnimationFrame(draw);
  } else {
    console.log('NO CANVAS');
  }


}
