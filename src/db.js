
export default {
  status: '',
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
        name: 'Incandecent Light',
        type: 'light',
        output: 60,
        unit: 'W',
        eff: 1,
        on: true
      },
      {
        name: 'Florecent Light',
        type: 'light',
        output: 60,
        unit: 'W',
        eff: 0.3,
        on: true
      },
      {
        name: 'Led Light',
        type: 'light',
        output: 60,
        unit: 'W',
        eff: 0.1,
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
        type: 'photovoltaic_panel',
        supply: 150,
        unit: 'W',
        on: false
      },
      {
        type: 'photovoltaic_panel',
        supply: 200,
        unit: 'W',
        on: false
      },
      {
        type: 'photovoltaic_panel',
        supply: 250,
        unit: 'W',
        on: false
      },
      {
        type: 'photovoltaic_panel',
        supply: 300,
        unit: 'W',
        on: false
      },
    ]
  }





};
