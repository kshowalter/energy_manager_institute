export default function(){
  var spec = {
    tag: 'div',
    props: {
      class: 'section level_2',
    },
    children: [
      {
        tag: 'select',
        children: [
          {
            tag: 'option',
            props: {
              value: 'opt1'
            },
            text: 'opt1',
          },
          {
            tag: 'option',
            props: {
              value: 'opt1'
            },
            text: 'opt2',
          },
          {
            tag: 'option',
            props: {
              value: 'opt1'
            },
            text: 'opt3',
          }
        ]
      }
    ]
  };

  return spec;
}
