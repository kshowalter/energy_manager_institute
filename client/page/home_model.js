//import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
//var div, span, p, a, ul, li, br, h1, h2, h3, input, select, option;
//var specdom_helper = require('specdom_helper');


export default function(){


  var spec = {
    tag: 'div',
    props: {
      id: 'page',
    },
    children: [
      {
        tag: 'canvas',
        props: {
          id: 'canvas',
          width: 1000,
          height: 1000
        }
      }

    ]

  }






  return spec;
}
