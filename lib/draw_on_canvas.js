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
        var min_x = Infinity;
        var min_y = Infinity;
        var max_x = -Infinity;
        var max_y = -Infinity;

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
              ctx.lineTo( x , y );
            } else if( path_section_type === 'quadraticCurveTo' ) {
              var cp1x = x + instruction[0];
              var cp1y = y + instruction[1];
              x = x + instruction[2];
              y = y + instruction[3];
              ctx.quadraticCurveTo(cp1x, cp1y, x, y);
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
              ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            }
          } else if( instruction.constructor === String ){
            ctx.closePath();
          } else {
            var ax = x + instruction.x;
            var ay = y + instruction.y;
            min_x = ax < min_x ? ax : min_x;
            min_y = ay < min_y ? ay : min_y;
            max_x = ax > max_x ? ax : max_x;
            max_y = ay > max_y ? ay : max_y;
            x = x + instruction.x;
            y = y + instruction.y;
            ctx.moveTo( instruction.x, instruction.y );
          }
        });

        spec.props.x = min_x;
        spec.props.y = min_y;
        spec.props.dx = max_x - min_x;
        spec.props.dy = max_y - min_y;

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
