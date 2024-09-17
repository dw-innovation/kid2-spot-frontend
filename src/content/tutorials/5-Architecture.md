---
slug: architecture
order: 5
---
**How the system works**

The tool is based on a machine learning model (Llama3) trained on a dataset of artificially generated sentences. These sentences are created by randomly selecting areas, objects from a fixed database, spatial terms (such as “nearby”), and distance values. A large language model then converts this information into natural language sentences.

When the tool is in use, the user's input sentence is analysed by the model to extract key information, such as area specifications, object references, and spatial relationships. The object references are matched to the underlying object database, which assigns the corresponding OSM tags that best fit the description.

All the extracted information—about search areas, objects, and their spatial relations—is then transformed into a search query, and the relevant results from the OSM database are displayed on the map.

Guidelines for effective use:

The tool performs best when the user input closely resembles the sentences in the training dataset. If you notice that the system does not understand your query, consider the following points:

**Be specific about object references** Vague descriptions (like “something like a shop”) may not work well, as the objects need to match a fixed database to find the correct OSM tags. Try to be as specific as possible.

**Avoid complex phrasing** Phrases such as “a shop that sells…” or “down the street” might make sense to a human but can be difficult to translate into an OSM query. Instead, use more direct language regarding object descriptions and distances.

**Use full sentences** While the system is designed to understand short, straightforward queries and tolerate minor typos, using overly abbreviated language may cause issues. Stick to complete sentences where possible.

**More behind the scenes** on [GitHub](https://github.com/dw-innovation/kid2-spot)

**YAML** 
is a human-readable data serialization format that can be used in conjunction with all programming languages and is often used for configuration files. It focuses on data readability and the simplicity of its syntax. YAML uses indentation to represent hierarchical relationships within data, which makes it particularly suited for configuration where a setting might be nested within a broader category.

**Natural Language API** 
that takes a natural language sentence, extracts all entities (and their properties) and relations, outputs a YAML representation of the sentences, finds all corresponding OSM tags and returns a JSON representation (IMR) that can be consumed by the OSM Query API and the frontend. 

**OSM Query API** 
that validates the IMR (type and formatting checks as well as logical tests), generates the PostGIS query, runs it against the OSM database and post-processed the result from the database to return map data that can be consumed by the frontend.  