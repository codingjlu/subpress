# Subpress

Static and dynamic subdomains for Express.



## Installation

```sh
npm i subpress
```



## Usage

```js
const subpress = require("subpress");
const express = require("express");
const hello = require("./hello");

const app = express();
app.use(subpress("hello"), hello);

app.listen(3000, function() {
    console.log("Express running with Subpress on port 3000!");
});
```

Contents of `hello.js`:

```js
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.send("Hello from the 'hello' subdomain!");
});

module.exports = router;
```

Now visit `hello.yourwebsite.tld` and you should see "Hello from the 'hello' subdomain!"

In the first argument on the `subpress` function, you can also pass an array instead of a single subdomain, still using one handler, e.g.:

```js
app.use(subpress(["help", "contact", "merch"], handler));
```

Now the same handler (router) handles all three of the provided subdomains, i.e. `help.yourwebsite.tld`, `contant.yourwebsite.tld`, and `merch.yourwebsite.tld`.



_**Note:** If you are testing this in `localhost`, `test.localhost` will NOT be treated as a subdomain, as it probably matches the URL RegExp in Express (`test` would be the website name and `localhost` the domain extension). For it to be a subdomain, you would need to visit `test.test.localhost` for it to be treated as `localhost`._

**Dynamic/wildcard usage:**

```js
app.use(subpress("*"), require("./dynamicRouter"));
```

In `dynamicRouter.js`:

```js
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.send(`Hello from the dynamic '${req.subpress.subdomain}' subdomain!`);
});

module.exports = router;
```

And that's it!



**Sub-sub-subdomains and the such:**

```js
app.use(subpress("hello.world.goodbye.world", handler)); // Go to http://hello.world.goodbye.world.yourdomain.tld
```





## License

Copyright © 2021 codingjlu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
