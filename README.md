# TIL (Today I learned)

A MERN web-app code notebook
https://flamboyant-dijkstra-f2f898.netlify.app/

Basically a recreation of [VuePress](https://vuepress.vuejs.org/) entirely in React. 
![](https://github.com/daee-kang/TIL/blob/master/readmestuff/demo.gif)

## what is this??????????

Take notes in markdown, that's it B-) 
Markdown text is saved in a mongodb database and when fetched, is parsed and compiled into html with [marked.js](https://marked.js.org/).
When creating subheaders in markdown, the website will automatically parse and add the subheader as a link to the sidebar and search engine. is cool man

Inspired by : https://github.com/milooy/TIL

Instead of hosting data through saving in the repository, I wanted to have it run through a database for ease. 


## how to run this???????????????????????????????????

The root directory will need a .env file containing: 
- DB = 'ur mongodb url here!!' 
- PORT = SOMEPORTNUMBER 
- CORS_ORIGINS=http://localhost:8080 

both: 
npm start in the root directory -> backend
npm start in the client directory -> frontend

## future stuff to do

Will I put in authentication? probably not
Will I host my backend with serverless? yeaaaaaaaaaaaaa, nawwwwwwwwwwww 
