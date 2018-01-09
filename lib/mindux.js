import action_dispatcher from './action_dispatcher';

var default_update = function(){
  console.log('No update function set.');
};

export default function(init_state, reducer, action_makers, update=default_update){
  var store = {
    state: init_state,
    update: update,
    subscribe: function(callback){
      this.update = callback;
    },
    reducer: reducer,
    dispatch: function(action){
      this.state = this.reducer(this.state, action);
      this.update(this.state);
    },
  };
  store.actions = action_dispatcher(store, action_makers);

  return store;

}
