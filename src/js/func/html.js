const isDefined = x => typeof x !== "undefined";
const datafy = x => Object.keys( x || {} ).reduce( ( ret, key ) => `${ret} data-${key}="${x[ key ]}"`, "" );
const breakUp = xs => xs.filter( isDefined ).join( "<br />" );

export const sub = ( ...x ) => `<span class="sub-heading">${breakUp( x )}</span>`;
export const b = ( ...x ) => `<span class="bold">${breakUp( x )}</span>`;
export const box = ( ...x ) => `<div class="box">${breakUp( x )}</div>`;
box.big = ( ...x ) => `<div class="box big-box">${breakUp( x )}</div>`;

export const section = ( ...x ) => `<section>${breakUp( x )}</section>`;
export const div = ( ...x ) => `<div>${breakUp( x )}</div>`;
div.withClass = ( className, ...x ) => `<div class="${className}">${breakUp( x )}</div>`;
export const article = ( head, body ) => `<article><header>${head}</header>${body}</article>`;

export const ul = ( inline, x ) => `<ul class="${inline ? "inline" : ""}">${x.join( "" )}</ul>`;
export const li = x => `<li>${x}</li>`;

export const label = ( t, c ) => `<label>${t}${c}</label>`;
export const button = ( op, data, content ) => `<button data-handler="${op}" ${data ? datafy( data ) : ""}>${content}</button>`;
export const option = ( value, text ) => `<option value="${value}">${text || value}</option>`;
export const options = opts => `<option></option>${opts.map( o => option( o ) )}`;
export const select = ( op, data, opts ) => `<select data-handler="${op}" ${datafy( data )}>${options( opts )}</select>`;
