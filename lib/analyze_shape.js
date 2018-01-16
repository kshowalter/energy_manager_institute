export default function analyze_shape(spec){
  var min_x = Infinity;
  var min_y = Infinity;
  var max_x = -Infinity;
  var max_y = -Infinity;
  if( spec.tag  === 'rect' ){
    min_x = spec.props.x;
    min_y = spec.props.y;
    max_x = spec.props.x + spec.props.dx;
    max_y = spec.props.y + spec.props.dy;
  } else if( spec.tag === 'circ' ){
    min_x = spec.props.x - spec.props.radius;
    min_y = spec.props.y - spec.props.radius;
    max_x = spec.props.x + spec.props.radius;
    max_y = spec.props.y + spec.props.radius;
  } else if( spec.tag === 'path' ){
    var x = 0;
    var y = 0;
    spec.props.path.forEach(function(instruction){
      var coors = instruction.coors;

      if( coors === Array ){
        if( instruction.positioning === 'relative'){
          x += coors.slice(-2)[0];
          y += coors.slice(-2)[1];
        } else {
          x = coors.slice(-2)[0];
          y = coors.slice(-2)[1];
        }
      }

      min_x = x < min_x ? x : min_x;
      min_y = y < min_y ? y : min_y;
      max_x = x > max_x ? x : max_x;
      max_y = y > max_y ? y : max_y;

    });
  } else if( spec.tag === 'group'){
    spec.children.forEach(function(child_spec){
      analyze_shape(child_spec);
      min_x = child_spec.props.min_x < min_x ? child_spec.props.min_x : min_x;
      min_y = child_spec.props.min_y < min_y ? child_spec.props.min_y : min_y;
      max_x = child_spec.props.max_x > max_x ? child_spec.props.max_x : max_x;
      max_y = child_spec.props.max_y > max_y ? child_spec.props.max_y : max_y;
    });
  }

  if( spec.meta && spec.meta.alts ){
    spec.meta.alts = spec.meta.alts.map(function(alt_props){
      return analyze_shape({
        tag: spec.tag,
        props: alt_props
      }).props;
    });
  }

  spec.props.min_x = min_x;
  spec.props.max_x = max_x;
  spec.props.min_y = min_y;
  spec.props.max_y = max_y;

  return spec;
}
