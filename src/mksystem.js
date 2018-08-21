export default function(db){
  var system = {
    time: 0,
    components: [],
    structure: {},
    environment: {
      time: 0,
      sun: 0,
      heat: 0,
    },
    energy_loads: 0,
    energy_supply: 0,
    energy_balance : 0,

    grid: {
      name: 'Utility',
      type: 'grid',
      load: 0,
      supply: 0,
      on: true
    }



  };

  // system.components.push({
  //   name: 'Utility',
  //   type: 'grid',
  //   load: 0,
  //   supply: 0,
  //   on: true
  // });


  return system;
}
