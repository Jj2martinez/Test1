/* @flow */

// This is used by the HtmlWebpackPlugin to generate an html page that we will
// use as a fallback for our service worker when the user is offline.  It will
// embed all the required asset paths needed to bootstrap the application
// in an offline session.
//
// You must keep this in sync in terms of structure etc with the output generated
// by the reactApplication middleware.
// @see src/server/middleware/reactApplication/generateHTML.js

import { get, clientConfigScript } from '../../../config';

const htmlAttributes = attrs => Object.keys(attrs)
  .map(attrName => `${attrName}="${attrs[attrName]}"`)
  .join(' ');

const metaTags = metas =>
  metas.map(metaItem => `<meta ${htmlAttributes(metaItem)}>`).join(' ');

const linkTags = links =>
  links.map(linkItem => `<link ${htmlAttributes(linkItem)}>`).join(' ');

const scriptTags = scripts =>
  scripts
    .map(scriptItem => `<script ${htmlAttributes(scriptItem)}></script>`)
    .join(' ');

const scriptTag = url => `<script type="text/javascript" src="${url}"></script>`;

// $FlowFixMe - for some reason flow type syntax is failing here.
export default function generate(templateParams) { // eslint-disable-line no-unused-vars
  return `
    <!DOCTYPE html>
    <html ${htmlAttributes(get('htmlPage', 'htmlAttributes'))}>
      <head>
        <title>${get('htmlPage', 'defaultTitle')}</title>
        ${metaTags(get('htmlPage', 'meta'))}
        ${linkTags(get('htmlPage', 'links'))}
      </head>
      <body>
        <div id='app'></div>
        <script type="text/javascript">
          ${
            // Binds our shared configuration object to the window object so
            // that our browser executing app can gain access to these values.
            clientConfigScript()
          }
        </script>
        ${
          // Enable the polyfill io script?
          // This can't be configured within a react-helmet component as we
          // may need the polyfill's before our client bundle gets parsed.
          get('polyfillIO', 'enabled')
            ? scriptTag(get('polyfillIO', 'url'))
            : ''
        }
        ${scriptTags(get('htmlPage', 'scripts'))}
      </body>
    </html>`;
}
