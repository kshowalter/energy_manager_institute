var path_element_type = {
  m: 'moveTo',
  l: 'lineTo',
  h: 'horizontal',
  v: 'vertical',
  c: 'curve',
  z: 'close',
  a: 'arc',
};


export default function(path_string){
  //var path_parts = path_string.split(' ');
  var letter_regex = /(?=[a-zA-Z])/g;
  var path_parts = path_string.split(letter_regex);
  return path_parts.map(function(part){
    var positioning = /^[A-Z]/.test( part ) ? 'absolute' : 'relative';
    var inst_obj = {
      positioning: positioning,
      path_section_type: path_element_type[ part[0].toLowerCase() ],
      coors: part.slice(1).trim().split(/[\s,]/g).map(Number),
    };
    if( inst_obj.path_section_type === 'vertical' ){
      inst_obj.path_section_type = 'moveto';
      inst_obj.coors = [ 0, inst_obj.coors[0] ];
    }
    if( inst_obj.path_section_type === 'horizontal' ){
      inst_obj.path_section_type = 'moveto';
      inst_obj.coors = [ inst_obj.coors[0], 0 ];
    }
    return inst_obj;

  });

}
