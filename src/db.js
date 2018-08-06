
export default {
  status: 'emtpty',
  components: {
    docs: [
      {
        name: 'PowerBox5000',
        type: 'battery',
        load: 0,
        supply: 0,
        unit: 'W',
        energy: 100,
        on: false
      },
      {
        name: 'Air compressor',
        type: 'AC',
        load: 2500,
        unit: 'W',
        on: false
      },
      {
        name: 'Air handeler',
        type: 'AC',
        load: 750,
        unit: 'W',
        on: false
      },
      {
        name: 'Computer',
        type: 'electronic',
        load: 500,
        unit: 'W',
        on: true
      },
      {
        name: 'TV',
        type: 'electronic',
        load: 200,
        unit: 'W',
        on: true
      },
      {
        name: 'Light',
        type: 'light_incandecent',
        output: 60,
        unit: 'W',
        on: true
      },
      {
        name: 'Light',
        type: 'light_florecent',
        output: 60,
        unit: 'W',
        on: true
      },
      {
        name: 'Light',
        type: 'light_led',
        output: 60,
        unit: 'W',
        on: true
      },
      {
        name: 'Clothes dryer',
        type: 'appliance',
        load: 750,
        unit: 'W',
        on: false
      },
      {
        name: 'PV panel',
        type: 'PV',
        supply: 150,
        unit: 'W',
        on: false
      },
      {
        name: 'PV panel',
        type: 'PV',
        supply: 200,
        unit: 'W',
        on: false
      },
      {
        name: 'PV panel',
        type: 'PV',
        supply: 250,
        unit: 'W',
        on: false
      },
      {
        name: 'PV panel',
        type: 'PV',
        supply: 300,
        unit: 'W',
        on: false
      },
    ]
  }





};
