# Block 1: Javascript Project

## Topics described:

Project structuring examples (for web, for nodejs)

Dependency management: npm, yarn

## Goal:

After this workshop you will be able to create your own simple web application projects.

## Sections:

1. [01-static-assets](01-static-assets/01-static-assets.md)
2. [02-nodejs-base](02-nodejs-base/02-nodejs-base.md)
3. [03-npm-yarn](03-npm-yarn/03-npm-yarn.md)

## Hometasks:

Home task 1 for Week 1:	

Create a web application to generate the QR code from text in url.

An example of working app could be found here:

https://qr-code-lva.herokuapp.com/ 

Requirements and notes:

1. App should have an API endpoint «/api/qr/:text» which will return a json response containing: { base64Image: string, text: string}
2. Main page should be only html markup, no additional calls from client side needed
3. Main page default QR code encoded text should be «Hello»
4. Use GET parameter e.g. ?text  to control the main page QR Code
5. It’s okay for you to support only letters, numbers and space characters in :text and ?text  parameters
6. Use Got or Axios as your REST client
7. Use pug or ejs template engine if using express
8. Main page `/` endpoint internally should get QR Code
image from your API endpoint described in `1.`
9. Deploy your application in Heroku

Example of the working app:

https://qr-code-lva.herokuapp.com/

Links:

https://www.npmjs.com/package/got

https://www.npmjs.com/package/axios

https://expressjs.com/en/guide/using-template-engines.html