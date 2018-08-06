import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
import titlebar_spec from './titlebar_spec';
import Specdom  from 'specdom';

export default function(actions, selected_page_id){

  var titlebar_content = titlebar_spec('Energy Manager Institute', [], selected_page_id);

  var specs = div([
    {
      tag: 'div',
      props: {
        id: 'titlebar'
      },
      children: [titlebar_content]
    },
    div({class:'transition'}),
    div({id:'background'},[
      div({class:'display_area'})
    ])
  ]);

  var content_specdom = Specdom('#content');
  //rint_specs( specsspan, console.log, 's| ');
  var status = content_specdom.load(specs);
  if( status ){
    console.log('Load status:', status);
    actions.init();
  }
}
