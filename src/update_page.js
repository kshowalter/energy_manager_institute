import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
import Specdom  from 'specdom';
import $ from 'simpledom';
import f from 'functions';

var specdom_main = Specdom('#content');

export default function(state){
  var system = state.system;
  var components_specs = div({class:'input_group'},[]);

  var types = [''].concat( Object.keys(state.db.components.tree) );

  system.components.forEach(component=>{
    // var comp_parts = component.label;
    // text += component.load ? component.load : '';
    // text += component.supply ? component.supply : '';
    console.log(component);
    components_specs.children.push(div({class:'label'},[
      span({class:'label'},component.label!==undefined? component.label : ''),
      span({class:'label label_neg'},component.load!==undefined? component.load : ''),
      span({class:'label label_pos'},component.supply!==undefined? component.supply : ''),
    ]));
  });
  components_specs.children.push(div('add'));
  components_specs.children.push(span({class:'input_list_mid'},[
    select(types.map(type=>{
      return option(f.pretty_name(type),{value:type});
    }),{
      id:'component_category_selection',
      onchange: function(e){
        console.log('change',e.target.value);
        var component_selection_sd = $('#component_selection').attr('disabled',null).clear();
        component_selection_sd.append($(option('')));
        var components = state.db.components.tree[e.target.value];
        components.forEach(component=>{
          component_selection_sd.append(option(component.label,{value:component.db_id}));
        });


      },
    })
  ]));
  components_specs.children.push(span({class:'input_list_mid'},[
    select({id:'component_selection',disabled:true})
  ]));

  var building_specs = div({class:'input_group'},[
    div({class:'label'},system.energy_loads),
    div({class:'label'},system.energy_supply),
    div({class:'label'},system.energy_balance),
  ]);

  var utility_specs = div({class:'input_group'},[
    div({class:'label'},system.grid.load),
    div({class:'label'},system.grid.supply),
  ]);

  var system_specs = div({class:'input_group'},[
    div({class:'label'},system.energy_loads),
    div({class:'label'},system.energy_supply),
    div({class:'label'},system.energy_balance),
  ]);

  var specs = div([
    div({class:'page'},[
      span({class:'section_title'},'Components'),
      components_specs,
      span({class:'section_title'},'Building totals'),
      building_specs,
      span({class:'section_title'},'Utility Grid'),
      utility_specs,
      span({class:'section_title'},'System totals'),
      system_specs,
    ]),
  ]);

  console.log('state',state);
  console.log('specs',specs);
  specdom_main.load(specs);
}
