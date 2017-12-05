module.exports = function(canvas, specs){
  var ctx = canvas.getContext('2d');
  if( specs.constructor === Array ){
    specs.forEach(function(spec){
      if( spec.tag  === 'rect' ){
        if( spec.props.type === 'fill'){
          if( spec.props.color ){
            ctx.fillStyle = spec.props.color;
          }
          ctx.fillRect(spec.props.x, spec.props.y, spec.props.dx, spec.props.dy);
        } else if( spec.props.type === 'stroke'){
          if( spec.props.color ){
            ctx.strokeStyle = spec.props.color;
          }
          ctx.strokeRect(spec.props.x, spec.props.y, spec.props.dx, spec.props.dy);
        } else if( spec.props.type === 'clear'){
          ctx.clearRect(spec.props.x, spec.props.y, spec.props.dx, spec.props.dy);
        }
      }
    });
  }

};
