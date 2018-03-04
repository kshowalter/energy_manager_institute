export default {

  click: function(coor){
    return {
      type: 'click',
      coor: coor,
    };
  },
  update: function(){
    return {
      type: 'update',
    };
  },
  add_shape: function(spec){
    return {
      type: 'add_shape',
      spec: spec
    };
  },

};
