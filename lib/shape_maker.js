module.exports = function(type, color, shape, dimentions, alts){
  var spec = {
    tag: shape,
    props: {
      color: color,
      type: type,
    },
    meta: {
      alts: alts || []
    },
  };

  if( shape === 'rect' ){
    spec.props.x = dimentions[0];
    spec.props.y = dimentions[1];
    spec.props.dx = dimentions[2];
    spec.props.dy = dimentions[3];
  }

  return spec;
};
