// require module
const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./moduls/replaceTemp');

/////////// File
// //// syncronus coding
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// //////utf-8 is charecter encoding, if its not use get output as buffar.
// console.log(textIn);
// const textOut = `new things you need to know: ${textIn}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written!")

// // asyncronus way of coading
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

///////////Server

// syncronus data reader
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

/////////CREATING SERVER
// making rout
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //   const pathName = req.url;

  // overview page
  if (pathname === '/' || pathname === '/overview') {
    // setting content type
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardHTML = dataObj
      .map((el) => {
        return replaceTemplate(tempCard, el);
      })
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHTML);
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API page
  } else if (pathname === '/api') {
    // setting content type
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // not found page
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end("<h1>page could'n found</h1>");
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
