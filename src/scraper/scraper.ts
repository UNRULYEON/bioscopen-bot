// import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

// const url = 'https://www.google.com';

// try {
//   const res = await fetch(url);
//   const html = await res.text();

//   const doc = new DOMParser().parseFromString(html, 'text/html');

//   if (!doc) throw new Error('Failed to parse the document');

//   const title = doc.querySelector('title')?.textContent;

//   console.log(title);
// } catch (error) {
//   console.error(error);
// }
