---
slug: techniques
order: 2
---

Results on SPOT are based on data from OpenStreetMap. OpenStreetMap (OSM) is a crowdsourced project that creates and provides free geographic data, giving everyone the opportunity to create maps of the world. The OSM database holds detailed information about nearly every square meter of the planet’s surface. It includes data on building types, infrastructure, restaurants, street names, parks and even park benches and millions of other data points, all centrally mapped.
Familiarize yourself with the basic types of OSM data before starting to build queries. 
There are three main types of object in the OSM database: nodes, ways, relations.

**Nodes**: 
![Node](/images/node.png 'Node')

(pic like here https://publish.obsidian.md/dukera-gewel/How+to+Use+Overpass+Turbo)

A node is a specific point on Earth's surface, defined by latitude and longitude, with an ID number and coordinates. Nodes can be used to define standalone point features (park bench, fountain). Nodes are used to shape line features in ways (road, lakes, parks) and nodes can be included as a member of a more complex structure in relations () 

**Ways**: 
![Way](/images/way.png 'Way')

Ways are ordered lists of nodes that form polylines or polygons. Ways are used to represent linear features such as rivers and roads. A way becomes a polygon if the sequence of nodes is closed (the last node is the same as the first node). 

**Relations**: 
![Relation](/images/relation.png 'Relation')

Relations are more complex data structures used to define relationships between two or more data elements (nodes, ways, and other relations). Relations can describe various situations such as: 
Routes: A sequence of ways that create a larger itinerary, like a bus route or a long-distance hiking trail or a major highway. 

**Multipolygons** 
Used to handle complex areas that consist of multiple polygons, including ones with holes. For example, a forest with several clearings can be represented as a multipolygon where the outer ways define the forest boundary, and inner ways define the clearings. 



















