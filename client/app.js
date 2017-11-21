/**
* this is the app
* @file_overview this the starting point for the application.
* @author keith showalter {@link https://github.com/kshowalter}
* @version 0.1.0
*/
console.log('/\\');
import 'normalize.css';
import $ from 'simpledom';
import f from 'functions';
import hash_router from 'hash_router';
import Specdom  from 'specdom';
import print_specs from '../lib/print_specs';
import settings from './settings';

var page_file_list = require.context('../page/', true, /.*\.md$/).keys();



// Load page content
function requireAll(context) {
  var files = [];
  context.keys().forEach(function(file_path){
    var file_name = file_path.split(/\/|\./).slice(-2)[0];
    var page_id;
    if( location.length > 0 ){
      page_id = location.join('/') + '/' + file_name;
    } else {
      page_id = file_name;
    }
    files.push({
      page_id: page_id,
      file_name: file_name,
      file_location: file_path.split(/\/|\./).slice(2,-2),
      content: context(file_path),
    });
  });
  return files;
}


var modules_md = requireAll(require.context('../page/', true, /\.md$/));
var pages_md = {};
modules_md.forEach(function(imported_module){
  var page_id = imported_module.page_id;
  var page_specs = imported_module.content;
  var page_name = imported_module.file_name;
  var file_location = imported_module.file_location;
  //var title = markdown_specs.children[0].children[0].text;
  page_specs.props.id = 'page';
  var title = f.pretty_name(page_name);
  if( page_specs &&
      page_specs.children &&
      page_specs.children[0] &&
      page_specs.children[0].children[0].tag === 'h1'
  ){
    title = page_specs.children[0].children[0].children[0];
  }
  pages_md[page_id] = {
    location: file_location,
    name: page_name,
    title: title,
    specs: page_specs
  };
});

var pages_js = {};
requireAll(require.context('./page/', true, /\.js$/)).forEach(imported_module => {
  pages_js[imported_module.file_name] = Object.assign(imported_module, {
    content: imported_module.content.default
  });
});
var pages_controls = {};
requireAll(require.context('./control/', true, /\.js$/)).forEach(imported_module => {
  pages_controls[imported_module.file_name] = Object.assign(imported_module, {
    content: imported_module.content.default
  });
});

console.log('pages_js', pages_js);

pages_md['input'] = {
  specs: pages_js.input.content()

};

console.log('pages_md', pages_md);

var global = window || global;

global.logger = console.log;
global.f = f;
global.$ = $;
global.settings = settings;
sessionStorage.load_times = sessionStorage.load_times || '';
global.measurments = {};

var content_anchor = $('#content');
var specdom = Specdom(content_anchor);

var router = hash_router(function(selection){
  console.log('selection: ', selection);

  if( ! selection ){
    router('About');
  } else {
    var selected_page_id = selection.join('/');
    var selected_page_name = selection[selection.length-1];
    var selected_location = selection.slice(0,selection.length-1).join(' / ');
    if( ! selected_location ){
      selected_location = '/';
    }
    console.log('ROUTING...');
    var page = pages_md[selected_page_id];
    var page_specs;
    if( ! page ){
      page_specs = pages_md[404].specs;
    } else {
      page_specs = page.specs;
    }

    var titlebar_content = {
      tag: 'div',
      props: {
        id: 'titlebar_content'
      },
      children: [
        ///*
        {
          tag: 'span',
          props: {
            id: 'site_title',
            class: 'terminal'
          },
          text: 'Modern Energy Generation Designer :'
        }
      ]
    };


    var menu_specs = {
      tag: 'span',
      props: {
        id: 'menu'
      },
      children: []
    };
    titlebar_content.children.push(menu_specs);

    menu_specs.children.push({
      tag: 'span',
      text: '[',
      props: {
        class: 'terminal titlebar_link',
      }
    });

    if( pages_md['menu'] ){
      pages_md['menu'].specs.children[0].children.forEach(function(li_spec){
        var name = li_spec.children[0].children[0];
        var prety_name = f.pretty_name(name);
        var href = li_spec.children[0].props.href
        //console.log(page_id === selected_page_id, page_id , selected_page_id );
        var selected = href.slice(2) === selected_page_id;
        //console.log('selected', page_id, selected_page_id, selected);
        menu_specs.children.push({
          tag: selected ? 'span' : 'a',
          text: prety_name.trim(),
          props: {
            class: selected ? 'terminal titlebar_link titlebar_link_selected' : 'terminal titlebar_link',
            href: href
          }
        });
      });
    }

    menu_specs.children.push({
      tag: 'span',
      text: ']',
      props: {
        class: 'terminal titlebar_link',
      }
    });


    var specs = {
      tag: 'div',
      children: [
        {
          tag: 'div',
          props: {
            id: 'titlebar'
          },
          children: [titlebar_content]
        },
        {
          tag: 'div',
          props: {
            class: 'transition'
          }
        },
        page_specs
      ]
    };
    console.log('SPECS', specs);
    //rint_specs( specs, console.log, 's| ');
    var status = specdom.load(specs);
    if( status ){
      //resize_sections();

    }

    if( page_specs.meta.backgroundImage ){
      document.body.style.backgroundImage = 'url("assets/'+page_specs.meta.backgroundImage+'")';
    } else {
      document.body.style.backgroundImage = '';
    }
    if( page_specs.meta['background-color'] ){
      document.body.style['background-color'] = page_specs.meta['background-color'];
    } else {
      document.body.style['background-color'] = null;
    }



  }
});
