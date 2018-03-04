import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';

export default function(){
  var spec = {
    tag: 'div',
    props: {
      class: 'section level_2',
    },
    children: [
      select({class: 'droplist'}, [
        option('opt1', {value:'opt1'}),
        option('opt2', {value:'opt2'}),
        option('opt3', {value:'opt3'}),
      ])

    ]
  };

  return spec;
}
