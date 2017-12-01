module.exports = function(type, color, shape, dimentions){
  var spec = {
    tag: shape,
    props: {
      color: color,
      type: type,
    },
  };

  if( shape === 'rect' ){
    spec.props.x = dimentions[0];
    spec.props.y = dimentions[1];
    spec.props.rx = dimentions[2];
    spec.props.ry = dimentions[3];
  }

  return spec;
};
