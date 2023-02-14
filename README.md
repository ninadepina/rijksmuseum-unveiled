![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

# 👋🏼 'Dutch Delights: Rijksmuseum Unveiled'
'Dutch Delights: Rijksmuseum Unveiled' is a Single Page Application that let's you explore the Rijksmuseum's collection. You can search for artworks, artists and get more information about them.

<br/>

This application is made with [RijksData](https://data.rijksmuseum.nl/object-metadata/api/), an API from the Rijksmuseum.

---

## ⚡Installation
1. Clone this repository
```
$ git clone https://github.com/ninadepina/web-app-from-scratch-2223.git
```

2. Create your API key
- Go to [Rijksstudio](https://www.rijksmuseum.nl/nl/rijksstudio) and sign up
- Go to advanced settings and request your own personal API key
- Add your API key to the `app.js` file
```javascript
let url = `https://www.rijksmuseum.nl/api/nl/collection?key=[YOUR-API-KEY-HERE]&q=${userInput}`;
```

3. Open the `index.html` file in your browser or use localhost
```
http://localhost:3000/
```