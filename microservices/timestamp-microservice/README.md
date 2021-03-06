# API Project: Timestamp Microservice
## Result: [click to view](https://boilerplate-project-timestamp.alanapapa.repl.co)
***

## User stories :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)`. Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2019-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2019 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

## Example usage:
* https://timestamp-microservice-lm.glitch.me/api/timestamp/2019-12-11
* https://timestamp-microservice-lm.glitch.me/api/timestamp/1576022400000
* https://timestamp-microservice-lm.glitch.me/api/timestamp/ok

## Example output:
* {"unix":1576022400000, "utc":Wed, 11 Dec 2019 00:00:00 GMT"}