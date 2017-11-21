//import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
var div, span, p, a, ul, li, br, h1, h2, h3, input, select, option;
var specdom_helper = require('specdom_helper');

console.log(specdom_helper, typeof specdom_helper);

export default function(){


  target_element.append($({
    tag: 'canvas',
    props: {
      id: 'canvas',
      width: 1500,
      height: 1500
    }
  }));
  var canvas = document.getElementById('canvas');
  canvas.style.backgroundColor = 'white';






  return spec;
}
