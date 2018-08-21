import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
import titlebar_spec from './titlebar_spec';
import $  from 'simpledom';
import f from 'functions';

var sdom = $('#content');

export default function(state, actions){
  var system = state.system || {};

  var titlebar_content = titlebar_spec('Energy Manager Institute', []);

  var specs = div([
    div({id:'titlebar'},[titlebar_content]),
    div({class:'transition'}),
    div({id:'background'},[
      div({class:'page'},[
        div({class:'section_title'},'Time'),
        div({class:'input_group'},[
          div({id:'time'},system.time),
        ]),
        div({class:'section_title'},'Components'),
        div({id:'components_specs',class:'input_group'},system.components.map(component=>{
          return div([
            span({class:'label'},component.label!==undefined? component.label : '-'),
            span({class:'label label_neg'},component.load!==undefined? component.load : ''),
            span({class:'label label_pos'},component.supply!==undefined? component.supply : ''),
          ]);
        })),
        div({class:'input_group'},[
          span({class:'input_list_mid'},[
            select(
              {
                class: 'input',
                id:'component_category_selection',
                value: state.inputs.component_category_selection,
                onchange: function(e){
                  actions.update_inputs(e.target.id,e.target.value);
                },
              },
              state.options.component_category_selection.map(type=>
                option(f.pretty_name(type),{value:type})
              )
            )
          ]),
          span({class:'input_list_mid'},[
            select(
              {
                class:'input',
                id:'component_selection',
                disabled: state.inputs.component_category_selection !== undefined ? null : true ,
                value: state.inputs.component_selection,
                onchange: function(e){
                  actions.update_inputs(e.target.id,e.target.value);
                },
              },
              state.options.component_selection.map(component=>
                option(component.label,{value:component.db_id})
              )
            )
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
          div({id:'init_energy_loads',class:'label'},system.energy_loads),
          div({id:'init_energy_supply',class:'label'},system.energy_supply),
          div({id:'init_energy_balance',class:'label'},system.energy_balance),
        ]),
        div({class:'section_title'},'Utility Grid'),
        div({class:'input_group'},[
          div({id:'grid.load',class:'label'},system.grid.load),
          div({id:'grid.supply',class:'label'},system.grid.supply),
        ]),
        div({class:'section_title'},'System totals'),
        div({class:'input_group'},[
          div({id:'energy_loads',class:'label'},system.energy_loads),
          div({id:'energy_supply',class:'label'},system.energy_supply),
          div({id:'energy_balance',class:'label'},system.energy_balance),
        ]),
      ]),
    ])
  ]);

  console.log('specs',specs);
  sdom.load(specs);
  state.specs = specs;
  //actions.init(state);
}
