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
    var name = file_path.split(/\/|\./).slice(-2)[0];
    var id;
    if( location.length > 0 ){
      id = location.join('/') + '/' + name;
    } else {
      id = name;
    }
    files.push({
      id: id,
      title: f.pretty_name(name),
      name: name,
      location: file_path.split(/\/|\./).slice(2,-2),
      content: context(file_path),
    });
  });
  return files;
}


var modules_md = requireAll(require.context('../page/', true, /\.md$/));
var pages = {};
modules_md.forEach(function(imported_module){
  var page_specs = imported_module.content;
  var name = imported_module.name;
  page_specs.props.id = 'page';
  var title = f.pretty_name(name);
  if( page_specs &&
      page_specs.children &&
      page_specs.children[0] &&
      page_specs.children[0].children[0].tag === 'h1'
  ){
    title = page_specs.children[0].children[0].children[0];
  } else {
    title = imported_module.title;
  }
  pages[imported_module.id] = pages[imported_module.id] || {};
  pages[imported_module.id] = Object.assign(pages[imported_module.id], imported_module, {
    title: title,
    page_specs: page_specs
  });
});

var pages_js = {};
requireAll(require.context('./page/', true, /\.js$/)).forEach(imported_module => {
  pages[imported_module.id] = pages[imported_module.id] || {};
  pages[imported_module.id] = Object.assign(pages[imported_module.id], imported_module, {
    page_function: imported_module.content.default
  });
});
var pages_controls = {};
requireAll(require.context('./control/', true, /\.js$/)).forEach(imported_module => {
  pages[imported_module.id] = pages[imported_module.id] || {};
  pages[imported_module.id] = Object.assign(pages[imported_module.id], {
    control: imported_module.content.default
  });
});

console.log('pages', pages);

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
    //var selected_page_name = selection[selection.length-1];
    var selected_location = selection.slice(0,selection.length-1).join(' / ');
    if( ! selected_location ){
      selected_location = '/';
    }
    console.log('ROUTING...');
    var page = pages[selected_page_id];
    var page_specs;
    if( ! page ){
      page_specs = pages[404].page_specs;
    } else {
      if( page.page_specs ){
        page_specs = page.page_specs;
      } else if( page.page_function ) {
        page_specs = page.page_function();
      } else {
        page_specs = pages[404].page_specs;
      }
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

    if( pages['menu'] ){
      pages['menu'].page_specs.children[0].children.forEach(function(li_spec){
        var name = li_spec.children[0].children[0];
        var prety_name = f.pretty_name(name);
        var href = li_spec.children[0].props.href;
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
    console.log('status', status);
    if( status ){
      //console.log('page loaded', selected_page_id);
      var control = pages[selected_page_id].control;
      //console.log('control', control);
      if( control ){
        control();
      }
      /*
      */
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
