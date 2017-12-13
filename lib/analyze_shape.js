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
      if( instruction.constructor === Array ){
        var ax = x + instruction.slice(-2)[0];
        var ay = y + instruction.slice(-2)[1];
        min_x = ax < min_x ? ax : min_x;
        min_y = ay < min_y ? ay : min_y;
        max_x = ax > max_x ? ax : max_x;
        max_y = ay > max_y ? ay : max_y;

        var path_section_type;
        if( instruction[0].constructor === String ){
          path_section_type = instruction[0];
          instruction = instruction.slice(1);
        } else {
          if( instruction.length === 2 ){
            path_section_type = 'lineTo';
          } else if( instruction.length === 4 ) {
            path_section_type = 'quadraticCurveTo';
          } else if( instruction.length === 6 ) {
            path_section_type = 'bezierCurveTo';
          }
        }

        if( path_section_type === 'lineTo' ){
          x += instruction[0];
          y += instruction[1];
        } else if( path_section_type === 'quadraticCurveTo' ) {
          var cp1x = x + instruction[0];
          var cp1y = y + instruction[1];
          x = x + instruction[2];
          y = y + instruction[3];
          //} else if( instruction.length === 5 ) {
          // arcTo(x1, y1, x2, y2, radius)
          //  ctx.arcTo( instruction[0], instruction[1], instruction[2], instruction[3], instruction[4] );
        } else if( path_section_type === 'bezierCurveTo' ) {
          //arc(x, y, radius, startAngle, endAngle, anticlockwise)
          //ctx.arc( instruction[0], instruction[1], instruction[2], instruction[3], instruction[4], instruction[5] );
          var cp1x = x + instruction[0];
          var cp1y = y + instruction[1];
          var cp2x = x + instruction[2];
          var cp2y = y + instruction[3];
          x = x + instruction[4];
          y = y + instruction[5];
        }
      } else {
        var ax = x + instruction.x;
        var ay = y + instruction.y;
        min_x = ax < min_x ? ax : min_x;
        min_y = ay < min_y ? ay : min_y;
        max_x = ax > max_x ? ax : max_x;
        max_y = ay > max_y ? ay : max_y;
        x = x + instruction.x;
        y = y + instruction.y;
      }
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

  spec.props.min_x = min_x;
  spec.props.max_x = max_x;
  spec.props.min_y = min_y;
  spec.props.max_y = max_y;


}
