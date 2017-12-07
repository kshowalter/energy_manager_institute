module.exports = function draw_on_canvas(canvas, specs){
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
      } else if( spec.tag === 'group'){
        var x = Infinity;
        var y = Infinity;
        var dx = -Infinity;
        var dy = -Infinity;

        spec.children.forEach(function(child_spec){
          x = child_spec.props.x < x ? child_spec.props.x : x;
          y = child_spec.props.y < y ? child_spec.props.y : y;
          dx = ( child_spec.props.x + child_spec.props.dx ) > dx ? ( child_spec.props.x + child_spec.props.dx ) : dx;
          dy = ( child_spec.props.y + child_spec.props.dy ) > dy ? ( child_spec.props.y + child_spec.props.dy ) : dy;
        });

        draw_on_canvas(canvas, spec.children);

        spec.props = {
          x: x,
          y: y,
          dx: dx,
          dy: dy,
        };
      }





    });
  }

};
