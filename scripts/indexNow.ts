import { convertXML } from 'simple-xml-to-json';
import { readFileSync } from 'fs';
import { resolve } from 'path';

console.info(
  'This script will submit the sitemap to indexnow.org, which is a service that helps you get your website indexed faster.'
);

console.info(
  "Don't forget to build the project before running this script because it needs the sitemap.xml file."
);

const INDEX_NOW_API_KEY = '65f212fb83c04d6ea83d1d4eaee7c104';

const xml = readFileSync(
  resolve(__dirname, '../.next/server/app/sitemap.xml.body'),
  'utf8'
);

const json = convertXML(xml);

const urlList = json.urlset.children.map(
  (c: any) => c.url.children[0].loc.content
);

/**
 * https://www.bing.com/indexnow/getstarted
 */
const submitToIndexNow = async () =>
  await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host: 'www.letscozinha.com.br',
      key: INDEX_NOW_API_KEY,
      keyLocation: `https://www.letscozinha.com.br/${INDEX_NOW_API_KEY}.txt`,
      urlList,
    }),
  }).then((res) => {
    console.log(`Status: ${res.status}`);
    return res.text();
  });

submitToIndexNow().then(console.log);
