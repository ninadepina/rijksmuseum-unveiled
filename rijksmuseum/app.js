const url = 'https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=nachtwacht'
const data = fetch(url).then(response => response.json())
    .then(data => console.log(data));