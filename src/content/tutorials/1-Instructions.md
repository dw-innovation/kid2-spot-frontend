---
slug: instructions
order: 1
---

SPOT is an AI-powered tool designed to help journalists and the OSINT community in finding the locations they are searching for. Identifying the exact location is essential for verifying where an image or video was taken and for gathering information to cross-reference eyewitness and official reports. 

**Why SPOT**
The tool allows users to find geospatial patterns by using natural language prompts on OpenStreetMap. This involves describing distinctive geospatial elements visible in the image, such as landmarks, infrastructure or buildings, and instructing SPOT to search for locations where these related elements are located.

**How to get started**
1. Sign in to SPOT 
2. Write your prompt 

You can sign in using your GitHub or Google account, or enter your existing credentials if you already have an account. https://www.findthatspot.io/

**How to prompt in SPOT**

A good prompt in SPOT is a clear sentence that contains a location like a country or city, visual clues like buildings or infrastructure and their distances to each other in units like measurements like meters or kilometers. This information helps the system provide the most accurate results for your search. It supports multiple languages, but English is the most effective.

For example:**"Show me all shopping malls near a traffic light with a park within 300 meters in Nairobi"**

**Results**

SPOT will display matching results within your search area based on your prompt. If you've defined multiple geospatial elements with specific distances between them, SPOT will highlight the results with individual colored circles. Simply click on a circle on the map to view the location on Google, Bing, Yandex and if available, even in Google Street View directly in SPOT.

You can refine your prompt at any time in the field box **Your search** or zoom in on the right to adjust the search area. If you like to adjust the distances between the elements, open the **Search Parameters**. 

You can also do a cluster search and find grouped features like "4 wind turbines within 400 meters of a highway". In case you are not sure about the exact distances, no worries, "next to" and "near" will also work, or you can leave it to the model to select the distance value.

**Let's do it together:**
1. Enter the prompt "Find me a church and a mall in Berlin" and click Search. You will see many results.
2. Refine the prompt "Find me a church 20 meters next from a mall in Berlin" and you will get just one result. 

**Keep in mind** 
The results in SPOT are based on data from OpenStreetMap, a crowdsourced mapping platform. If a church you know is 20 meters from a mall in Berlin and it doesn't appear in SPOT, it could be because the information hasn't been added to OpenStreetMap yet. You can add missing spots on OSM of course. 

**Tips**

Information on location might be in the metadata of an image or video. Learn how to open and read metadata [Here](https://www.howtoverify.info/Image/Where/Metadata). A reverse image search can also help to identify the location or specific object in the visual. Learn what a reverse image search is and how to perform one on an [image](https://www.howtoverify.info/Image/Where/Geolocation/Object_identification/RIS_(Image)) or [video](https://www.howtoverify.info/Video/Where/Metadata/InVid). 
If none of this helps to narrow down the location, then geolocation requires a more [methodical approach](https://www.howtoverify.info/Image/Where/Geolocation). 