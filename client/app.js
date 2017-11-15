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

import input_page from './input';

import settings from './settings';

var page_file_list = require.context("../page/", true, /.*\.md$/).keys();

var pages = {};

/*
page_file_list.forEach(function(file_path){
  var page_name = file_path.split(/\/|\./).slice(-2)[0];
  console.log('P', page_name, file_path);
  pages[page_name] = require(file_path);
});
*/

var print_specs = function print_specs(specs, logger, indent_string){
  var desc;
  if( specs.constructor === String ){
    desc = indent_string + '  ' + specs;
  } else {
    desc = indent_string + '<' + specs.tag;
    if( specs.props && ( specs.props.class || specs.props.id ) ){
      desc += ': ';
      if( specs.props.class ){
        desc += '.'+specs.props.class;
      }
      if( specs.props.id ){
        desc += '#'+specs.props.id;
      }
    }
    if( specs.text ){
      desc += ' | ' + specs.text;
    }
  }
  logger( desc );
  indent_string += '  ';
  if( specs.children ){
    specs.children.forEach(function(child_specs){
      print_specs(child_specs, logger, indent_string)
    })
  }
}


// Load page content
function requireAll(r) {
  r.keys().forEach(function(file_path){
    var page_name = file_path.split(/\/|\./).slice(-2)[0];
    var location = file_path.split(/\/|\./).slice(2,-2);

    //console.log('NAME', page_id, page_name);
    //pages[page_name] = r(file_path);

    var page_specs = r(file_path);

    //var title = markdown_specs.children[0].children[0].text;
    page_specs.props.id = 'page';

    var title = f.pretty_name(page_name);
    if( page_specs &&
        page_specs.children &&
        page_specs.children[0] &&
        page_specs.children[0].children[0].tag === 'h1'
      ){
      title = page_specs.children[0].children[0].children[0];
      //delete(page_specs.children[0].children[0]);
    }

    var page_id;
    if( location.length > 0 ){
      page_id = location.join('/') + '/' + page_name;
    } else {
      page_id = page_name;
    }

    pages[page_id] = {
      location: location,
      name: page_name,
      title: title,
      specs: page_specs
    };
  });
}
requireAll(require.context('../page/', true, /\.md$/));

pages['input'] = {
  specs: input_page()

};

//var about = require('markdown_parser!../page/about.md');
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
    var selected_page_name = selection[selection.length-1];
    var selected_location = selection.slice(0,selection.length-1).join(' / ');
    if( ! selected_location ){
      selected_location = '/';
    }
    console.log('ROUTING...');
    var page = pages[selected_page_id];
    var page_specs;
    if( ! page ){
      page_specs = pages[404].specs;
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

    if( pages['menu'] ){
      pages['menu'].specs.children[0].children.forEach(function(li_spec){
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
