
export default function print_specs(specs, logger, indent_string){
  var desc;
  if( specs.constructor === String ){
    desc = indent_string + '  ' + specs;
  } else {
    desc = indent_string + '<' + specs.tag;
    if( specs.props && ( specs.props.class || specs.props.id ) ){
      desc += ': ';
      if( specs.props.class ){
        desc += '.'+specs.props.class;
      }
      if( specs.props.id ){
        desc += '#'+specs.props.id;
      }
    }
    if( specs.text ){
      desc += ' | ' + specs.text;
    }
  }
  logger( desc );
  indent_string += '  ';
  if( specs.children ){
    specs.children.forEach(function(child_specs){
      print_specs(child_specs, logger, indent_string);
    });
  }
}
