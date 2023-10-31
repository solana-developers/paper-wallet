var qr = require('qr-image')
let fs = require("fs")

const COMPRESS = true

var publicAddress = process.argv[2]
let PK = process.argv[3]
let URL = process.argv[4]

let pkLink
pkLink = URL+"/claim/"+PK
//console.log(pkLink)
var private = qr.image(pkLink, { type: 'png' });
private.pipe(require('fs').createWriteStream('private.png'));

var public = qr.image(URL+"/"+publicAddress, { type: 'svg' });
public.pipe(require('fs').createWriteStream('public.svg'));

console.log(publicAddress)

fs.readFile("template.html", 'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/\*\*PUBLIC\*\*/g,publicAddress.substring(0,9)+"......"+publicAddress.substring(publicAddress.length-8));
  result = result.replace(/\*\*URL\*\*/g,URL);
  result = result.replace(/"\.\//g, "\"file://"+__dirname+"/");

  console.log(result)

  fs.writeFile("generated.html", result, 'utf8', function (err) {
     if (err) return console.log(err);

     fs.appendFile('addresses.txt',publicAddress+"\n", function (err) {
       if (err) throw err;
     });

     var html = fs.readFileSync('./generated.html', 'utf8');
     var conversion = require("phantom-html-to-pdf")();
     console.log("Generating PDF...")
     conversion({
       html: html,
       allowLocalFilesAccess: true,
       phantomPath: require("phantomjs-prebuilt").path,
       settings: {
            javascriptEnabled : true,
            resourceTimeout: 10000
        },
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            margin: {
                top: "0.33in",
                left: "0in",
                right:"0.19in"
            }
        }
     }, function(err, pdf) {
     var output = fs.createWriteStream('./generated.pdf')
     pdf.stream.pipe(output);
     conversion.kill();
     });
  });
});
