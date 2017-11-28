//import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
//var div, span, p, a, ul, li, br, h1, h2, h3, input, select, option;
var specdom_helper = require('specdom_helper');
import $ from 'simpledom';
console.log('$', $);
//console.log(specdom_helper, typeof specdom_helper);

export default function(){

  var canvas = $('#canvas');
  console.log('canvas' ,canvas);
  canvas.elem.style.backgroundColor = 'green';






}
