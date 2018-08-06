export default function(){
  var system = {
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
  system.components.push({
    name: 'PowerBox5000',
    type: 'battery',
    load: 0,
    supply: 0,
    energy: 100,
    on: false
  });


  system.components.push({
    name: 'Air compressor',
    load: 2500,
    on: false
  });
  system.components.push({
    name: 'Air handeler',
    load: 750,
    on: false
  });
  system.components.push({
    name: 'Computer',
    load: 500,
    on: true
  });
  system.components.push({
    name: 'TV',
    load: 200,
    on: true
  });
  system.components.push({
    name: 'Light',
    load: 20,
    on: true
  });
  system.components.push({
    name: 'Light',
    load: 20,
    on: true
  });
  system.components.push({
    name: 'Clothes dryer',
    load: 750,
    on: false
  });


  system.components.push({
    name: 'PV panel',
    supply: 200,
    on: false
  });
  system.components.push({
    name: 'PV panel',
    supply: 200,
    on: false
  });
  system.components.push({
    name: 'PV panel',
    supply: 200,
    on: false
  });
  system.components.push({
    name: 'PV panel',
    supply: 200,
    on: false
  });



  return system;
}
