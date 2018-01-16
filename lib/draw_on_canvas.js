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

      } else if( spec.tag === 'circ'){
        if( spec.props.type === 'fill'){
          if( spec.props.color ){
            ctx.fillStyle = spec.props.color;
          }
          ctx.beginPath();
          ctx.arc(spec.props.x, spec.props.y, spec.props.radius, spec.props.startAngle, spec.props.endAngle, spec.props.anticlockwise);
          ctx.fill();
        } else if( spec.props.type === 'stroke'){
          if( spec.props.color ){
            ctx.strokeStyle = spec.props.color;
          }
          ctx.beginPath();
          ctx.arc(spec.props.x, spec.props.y, spec.props.radius, spec.props.startAngle, spec.props.endAngle, spec.props.anticlockwise);
          ctx.stroke();
        }
      } else if( spec.tag === 'path'){
        ctx.beginPath();
        var x = 0;
        var y = 0;
        var x_end = 0;
        var y_end = 0;
        spec.props.path.forEach(function(instruction){
          var coors = instruction.coors;

          if( coors.constructor === Array ){
            if( instruction.positioning === 'relative'){
              x_end += coors.slice(-2)[0];
              y_end += coors.slice(-2)[1];
            } else {
              x_end = coors.slice(-2)[0];
              y_end = coors.slice(-2)[1];
            }
          }

          if( instruction.path_section_type === 'lineTo' ){
            ctx.lineTo( x_end , y_end );
          } else if( instruction.path_section_type === 'quadraticCurveTo' ) {
            var cp1x = x + coors[0];
            var cp1y = y + coors[1];
            ctx.quadraticCurveTo(cp1x, cp1y, x_end, y_end);
          } else if( instruction.path_section_type === 'bezierCurveTo' ) {
            var cp1x = x + coors[0];
            var cp1y = y + coors[1];
            var cp2x = x + coors[2];
            var cp2y = y + coors[3];
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x_end, y_end);
          } else if( instruction.path_section_type === 'moveTo' ){
            ctx.moveTo( x_end, y_end );
          } else if( instruction.path_section_type === 'close' ){
            ctx.closePath();
          }

          x = x_end;
          y = y_end;
        });

        if( spec.props.type === 'fill'){
          if( spec.props.color ){
            ctx.fillStyle = spec.props.color;
          }
          ctx.fill();
        } else if( spec.props.type === 'stroke'){
          if( spec.props.color ){
            ctx.strokeStyle = spec.props.color;
          }
          ctx.stroke();
        }
      } else if( spec.tag === 'group'){
        draw_on_canvas(canvas, spec.children);
      }
    });
  }

};
