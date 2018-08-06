import f from 'functions';

export default function(title, menu, selected){

  var titlebar_content = {
    tag: 'div',
    props: {
      id: 'titlebar_content'
    },
    children: [
      {
        tag: selected === 'default' ? 'span' : 'a',
        props: {
          id: 'site_title',
          class: selected === 'default' ? 'site_title_selected' : '',
          href: '/',
        },
        text: title
      }
    ]
  };

  if( menu && menu.length !== 0 ){

    var menu_specs = {
      tag: 'div',
      props: {
        id: 'menu'
      },
      children: []
    };

    titlebar_content.children.push(menu_specs);

    menu_specs.children.push({
      tag: 'li',
      text: '[',
      props: {
        class: 'menu_bracket',
      }
    });

    menu.forEach(function(name){
      var prety_name = f.pretty_name(name).trim();
      var href = '#/'+name;
      menu_specs.children.push({
        tag: 'li',
        props: {
          class: 'titlebar_option',
        },
        children: [{
          tag: name === selected ? 'span' : 'a',
          text: prety_name,
          props: {
            class: name === selected ? 'titlebar_link titlebar_link_selected' : 'titlebar_link',
            href: href
          }
        }]
      });
    });

    menu_specs.children.push({
      tag: 'li',
      text: ']',
      props: {
        class: 'menu_bracket',
      }
    });

  }


  return titlebar_content;
}
