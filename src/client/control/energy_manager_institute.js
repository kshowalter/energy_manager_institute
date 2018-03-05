import draw_on_canvas from '../../lib/draw_on_canvas';
import mk_shape from '../../lib/mk_shape';
import mouse from '../../lib/mouse';
import mindux from '../../lib/mindux';
import shapes from './energy_manager_institute/shapes';
import reducer from '../reducer';
import action_makers from '../action_makers';

var global = window || global;

var page_state = global.page_state = {
  specs: {},
  update: true,
  shapes: {},
  locations: {
    center: {
      x: 300,
      y: 300,
    },
  },
  shape_action_queue: []
};

var store = mindux(page_state, reducer, action_makers);

page_state.shapes = shapes(page_state);

//console.log(page_state.shapes);


var id = 'canvas';
var canvas;
//console.log('canvas', canvas);selected

function draw(state) {
  console.log('|>raw', state );
  if( state.update ){
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
    //window.requestAnimationFrame(draw);
  }
}

store.subscribe(draw);


export default function(){

  canvas = document.getElementById(id);
  //canvas.style.backgroundColor = "#caeffc";
  if (canvas.getContext) {
    //var ctx = canvas.getContext('2d');

    mouse(canvas, store.actions);

    store.actions.update();
    //window.requestAnimationFrame(draw);
  } else {
    console.log('NO CANVAS');
  }


}
