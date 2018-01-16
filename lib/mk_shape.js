//mk_shape('group', [] );
//mk_shape(tag, type, color, dimentions, alts );
module.exports = function(tag){

  if( tag === 'group'){
    var children = arguments[1];

    var spec = {
      tag: tag,
      props: {},
      meta: {},
      children: children || [],
    };


  } else {
    if( ['rect', 'circ', 'path'].indexOf(tag) === -1 ){
      console.warn('shape not found: ', tag, ' | ', arguments[3] );
    }
    var type = arguments[1];
    if( ['fill', 'stroke'].indexOf(type) === -1 ){
      console.warn('shape draw type not found: ', type, ' | ', arguments[3] );
    }
    var color = arguments[2];
    var dimentions = arguments[3];
    var alts = arguments[4];
    var action_name = arguments[5];

    if( alts ){
      alts.forEach(function(alt, i){
        if( alt.props ){
          alts[i] = alt.props;
        }
      });
    }

    var spec = {
      tag: tag,
      props: {
        color: color,
        type: type,
      },
      meta: {
        alts: alts || false,
        action_name: action_name,
      },
      children: children || [],
    };

    if( tag === 'rect' ){
      spec.props.x = dimentions[0];
      spec.props.y = dimentions[1];
      spec.props.dx = dimentions[2];
      spec.props.dy = dimentions[3];
    } else if( tag === 'path' ){
      spec.props.path = dimentions;

      if( spec.props.path[0] && ! spec.props.path[0].positioning ){
        spec.props.path = spec.props.path.map(function(instruction){
          var inst_obj = {
            positioning: 'relative',
          };

          if( instruction.constructor === Array ){
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

            inst_obj.path_section_type = path_section_type;
            inst_obj.coors = instruction;

          } else if( instruction.constructor === String ){
            inst_obj.path_section_type = 'close';
            inst_obj.coors = instruction;
          } else {
            inst_obj.path_section_type = 'moveTo';
            inst_obj.coors = [instruction.x, instruction.y];
          }

          return inst_obj;
        });
      }

    } else if( tag === 'circ' ){
      spec.props.x = dimentions[0];
      spec.props.y = dimentions[1];
      spec.props.radius = dimentions[2];
      spec.props.startAngle = dimentions[3] || 0;
      spec.props.endAngle = dimentions[4] || Math.PI*2;
      spec.props.anticlockwise = dimentions[5] || false;
    }



  }

  return spec;
};
