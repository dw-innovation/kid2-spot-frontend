---
slug: architecture
order: 5
---

... let's see ... 

**YAML** 
YAML is a human-readable data serialization format that can be used in conjunction with all programming languages and is often used for configuration files. It focuses on data readability and the simplicity of its syntax. YAML uses indentation to represent hierarchical relationships within data, which makes it particularly suited for configuration where a setting might be nested within a broader category.

**Natural Language API** 
An API that takes a natural language sentence, extracts all entities (and their properties) and relations, outputs a YAML representation of the sentences, finds all corresponding OSM tags and returns a JSON representation (IMR) that can be consumed by the OSM Query API and the frontend. 

**OSM Query API** 
An API that validates the IMR (type and formatting checks as well as logical tests), generates the PostGIS query, runs it against the OSM database and post-processed the result from the database to return map data that can be consumed by the frontend. 

**Bounding Box** 
The bounding box defines the extent of a geographic area. It is represented by two pairs of coordinates 
	The coordinates for the lower-left corner (minimum longitude, minimum latitude) 
	The coordinates for the upper-right corner (maximum longitude, maximum latitude) 