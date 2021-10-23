module.exports = function(subdomain, handler) {
	if(subdomain === "")
		return console.warn("Argument 'subdomain' is an empty string; returning.");
	return function(req, res, next) {
		req.subpress = {};
		if(req.subdomains.length) {
			const currentSubdomain = req.subdomains[req.subdomains.length - 1];
			switch(typeof subdomain) {
				case "string":
					let compareTo = subdomain.includes(".") ? req.subdomains.join(".") : currentSubdomain;
					if(subdomain === compareTo) {
						req.subpress.subdomain = compareTo;
					} else if(subdomain === "*") {
						req.subpress.subdomain = compareTo;
					} else
						return next();
					break;
				case "object":
					compareTo = currentSubdomain;
					for (let i in subdomain) {
						if(subdomain[i].includes(".")) {
							compareTo = req.subdomains.join(".");
							break;
						}
					}
					if(subdomain.includes(compareTo)) {
						req.subpress.subdomain = currentSubdomain;
					} else
						return next();
					break;
				default:
					console.warn(`Type of argument expexted to be 'string' or 'object', but recieved '${typeof subdomain}' instead. Using main handler...`);
					return next();
					break;
			}
			handler(...arguments);
		} else
			next();
	};
};
