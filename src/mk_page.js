import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
import titlebar_spec from './titlebar_spec';
import $  from 'simpledom';

export default function(actions, selected_page_id){

  var titlebar_content = titlebar_spec('Energy Manager Institute', [], selected_page_id);

  var specs = div([
    div({id:'titlebar'},[titlebar_content]),
    div({class:'transition'}),
    div({id:'background'},[
      div({class:'page'},[
        div({class:'section_title'},'Time'),
        div({class:'input_group'},[
          div({id:'time'}),
        ]),
        div({class:'section_title'},'Components'),
        div({id:'components_specs',class:'input_group'},[
          br(),
        ]),
        div({class:'input_group'},[
          span({class:'input_list_mid'},[
            select({
              id:'component_category_selection',
              onchange: function(e){
                var component_selection_sd = $('#component_selection').attr('disabled',null).clear();
                component_selection_sd.append($(option('')));
                var components = state.db.components.tree[e.target.value];
                components.forEach(component=>{
                  component_selection_sd.append(option(component.label,{value:component.db_id}));
                });


              },
            })
          ]),
          span({class:'input_list_mid'},[
            select({id:'component_selection',disabled:true})
          ]),
          a('add',{
            href: 'javascript:;',
            onclick: function(){
              var db_id = $('#component_selection').elem.value;
              actions.add_component(db_id);
            },
          }),
        ]),
        div({class:'section_title'},'Building totals'),
        div({class:'input_group'},[
          div({id:'init_energy_loads',class:'label'}),
          div({id:'init_energy_supply',class:'label'}),
          div({id:'init_energy_balance',class:'label'}),
        ]),
        div({class:'section_title'},'Utility Grid'),
        div({class:'input_group'},[
          div({id:'grid.load',class:'label'}),
          div({id:'grid.supply',class:'label'}),
        ]),
        div({class:'section_title'},'System totals'),
        div({class:'input_group'},[
          div({id:'energy_loads',class:'label'}),
          div({id:'energy_supply',class:'label'}),
          div({id:'energy_balance',class:'label'}),
        ]),
      ]),
    ])
  ]);


  var sdom = $('#content');
  sdom.append(specs);
  actions.init();
}
