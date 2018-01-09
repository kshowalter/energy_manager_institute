module.exports = function(canvas, actions){

  canvas.addEventListener('mousedown', function(e) {
    var element = canvas;
    var offsetX = 0;
    var offsetY = 0;
    var mx;
    var my;
    // Compute the total offset
    if (element.offsetParent !== undefined) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }
    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    var coor = {x: mx, y: my};

    actions.click(coor);

  }, true);


};
