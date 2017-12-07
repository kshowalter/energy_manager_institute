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
    if( ['rect'].indexOf(tag) === -1 ){
      console.warn('shape not found: ', tag, ' | ', arguments[3] );
    }
    var type = arguments[1];
    if( ['fill', 'stroke'].indexOf(type) === -1 ){
      console.warn('shape draw type not found: ', type, ' | ', arguments[3] );
    }
    var color = arguments[2];
    var dimentions = arguments[3];
    var alts = arguments[4];

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
      },
      children: children || [],
    };

    if( tag === 'rect' ){
      spec.props.x = dimentions[0];
      spec.props.y = dimentions[1];
      spec.props.dx = dimentions[2];
      spec.props.dy = dimentions[3];
    }


  }

  return spec;
};
