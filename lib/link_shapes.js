export default function(shapes,num){
  var start_index = shapes.length - num;
  for(var i=start_index; i>=shapes.length; i++){
    var shape = shapes[i];
    shape.meta = shape.meta || {};
    shape.meta.linked = shape.meta.linked || [];

    shape.meta.linked.push(i);
    //shape.meta.linked = shape.meta.linked.concat( shapes.slice(0,i), shapes.slice(i+1) );

    //shape.meta.linked = [...new Set(shape.meta.linked)];

  }

}
