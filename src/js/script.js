/** TODO **

Code Organization
1. [ALL] Revise folder structure: separate files into logical directories (html, css, js, json, assets)
2. [HTML] Develop html class naming system (BEM, etc)
3. [JS] Move js scripts from html file to separate js files
4. [ALL] Create a file for code snippets (currently commented in html)

Logic and perfomance optimization
5. [JS] Implement scripts to dynamically update content in the <head> tag: 
   - <title>[company_name] - Lediga tjänster</title>
   - <meta property="og:title" content="[company_fullname]"> (and similar meta tags)
6. [JS] Implement scripts for dynamically generating repetitive html elements (text, cards, lists, etc.)
7. [JS] Library review and optimization:
   - refactor jquery code into vanilla js or modern libraries
   - minify js files
   - consider using defer/async for script loading
   - optimize api requests
8. [CSS] Library review and optimization:
   - custom css/scss or consider lightweight modern libraries
   - minify css files
   - remove unused css
   - move inline styles to external css files where possible

9. [All] Adittional perfomance and validity checks
    - use tools for speed analysis
    - check code validty with W3C tool
    - convert images to webp, apply lazy loading
    - consider using bandler to create single optimized build file (Vite)

10. Think about other topics
*/


const global = {
  page_lang: 'en'
}

// Fetch local json (english or swedish) 
async function fetchLocalJson() {
  const res = await fetch(`./src/data/translation/${global.page_lang}.json`);
  const data = await res.json();
  console.log(data);
  populateEl(data);
}

function populateEl(obj) {
   const header = document.createElement("header");
   header.textContent = obj.lang_herobtn_standard;
   document.querySelector('.test').appendChild(header);
}

fetchLocalJson();


// class Component {
//    #children = [];
//    #node = null;
//    constructor({tag = 'div', className = '', text = ''}, ...children) {
//       const node = document.createElement(tag);
//       node.className = className;
//       node.textContent = text;
//       this.#node = node;

//       if (children) {
//          this.appendChildren(children);
//       }
//    }
// }

// const newEl = new Component({
//    tag: 'header',
//    className: 'newElTest',
//    text: 'content'
// })


