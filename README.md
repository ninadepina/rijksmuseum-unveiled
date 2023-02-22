![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# 👋🏼 'Dutch Delights: Rijksmuseum Unveiled'
'Dutch Delights: Rijksmuseum Unveiled' is a Single Page Application that let's you explore the Rijksmuseum's collection. You can search for artworks, artists and get more information about them.

| [🛠️ Technologies used](https://github.com/ninadepina/web-app-from-scratch-2223#%EF%B8%8F-technologies-used) | [👩🏼‍💻 How to use](https://github.com/ninadepina/web-app-from-scratch-2223#-how-to-use) | [👁️ Demo](https://github.com/ninadepina/web-app-from-scratch-2223#%EF%B8%8F-demo) | [📄 License](https://github.com/ninadepina/web-app-from-scratch-2223#-license) | [✅ Checklist/wishlist](https://github.com/ninadepina/web-app-from-scratch-2223#-checklistwishlist) |
|---|---|---|---|---|

![bannerRijksUnveiled](https://user-images.githubusercontent.com/89778503/220186555-1a8edc48-35d1-4e9d-ae70-03c9e75730eb.png)

---

## 🛠️ Technologies used
- HTML5
- CSS3
- JavaScript
- Rijksmuseum API [(RijksData)](https://data.rijksmuseum.nl/object-metadata/api/)

---

## 👩🏼‍💻 How to use
1. Clone this repository
```
$ git clone https://github.com/ninadepina/web-app-from-scratch-2223.git
```

2. Create your API key
- Go to [Rijksstudio](https://www.rijksmuseum.nl/nl/rijksstudio) and sign up
- Go to advanced settings and request your own personal API key
- Add your API key to the `fetchData.js` file
```javascript
const url = `https://www.rijksmuseum.nl/api/nl/collection?key=[YOUR-API-KEY-HERE]&q=${userInput}`;
```

3. Open the `index.html` file in your browser or use localhost
```
http://localhost:3000/
```

---

## 👁️ Demo
To see a live demo of this project, visit [Dutch Delights: Rijksmuseum Unveiled](https://ninadepina-wafs-rijks.vercel.app/)

---

## 📄 License
This project is licensed under the MIT License - see the `LICENSE` file for more details

---

## ✅ Checklist/wishlist
- [x] Fetching and displaying data from API
- [x] Search functionality
- [x] Filter functionality
- [x] Loading state
- [x] Error state
- [x] Generate random artwork
- [x] Skeleton loader
- [x] Detail page (with routing)
- [x] Search suggestions
- [x] Loader on first load
- [ ] Responsive design
