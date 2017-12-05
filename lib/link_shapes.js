export default function(shapes){

  shapes.forEach(function(shape, i){
    shape.meta = shape.meta || {};
    shape.meta.linked = shape.meta.linked || [];

    shape.meta.linked = shape.meta.linked.concat( shapes.slice(0,i), shapes.slice(i+1) );

    shape.meta.linked = [...new Set(shape.meta.linked)];

  });

}
