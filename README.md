JS-PATH-BUILDER
===============

Creating URI paths in JS.

Examples:
---------

```javascript
const pb = new UriPathBuilder();
pb.setProtocol("https")
    .setHost("example.com")
    .addPathPart("about")
    .addQueryParam("tab", "company")
    .setHash("fisrt")

console.log(pb.build()); // http://example.com/about/?tab=company#fisrt
```

```javascript
const pb = new UriPathBuilder();
pb.setProtocol("ssh")
    .setUserinfo("user")
    .setHost("example.com")
    .setPort("8022")
    .addPathPart("home")
    .addPathPart("user")

console.log(pb.build()); // ssh://user@example.com:8022/home/user/
```