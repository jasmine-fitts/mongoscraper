# mongoscraper

Mongo-Scrape
HW Week 18

All the News That's Fit to Scrape
Overview
This is a web app that lets users view and leave comments on the latest news. But I'm not going to actually write any articles; instead, I'll flex ymy Mongoose and Cheerio muscles to scrape news from another site.

Before Beginning
Create a GitHub repo for this assignment and clone it to computer. Any name will do -- just make sure it's related to this project in some fashion.

Run npm init. When that's finished, install and save these npm packages:

express

express-handlebars

mongoose

body-parser

cheerio

request

Instructions
Create an app that accomplishes the following:

Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

Headline - the title of the article

Summary - a short summary of the article

URL - the url to the original article

Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

Beyond these requirements, be creative and have fun with this!

Minimum Requirements
Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Hosting on Heroku and adding a README.md are required for this homework. In addition, add this homework to your portfolio, more information can be found below.

Hosting on Heroku
Now that we have a backend to our applications, we use Heroku for hosting. Please note that while Heroku is free, it will request credit card information if you have more than 5 applications at a time or are adding a database.