function main() {
    var doc,
        docsInfo,
        docsInfoJson,
        docs = search.luceneSearch("TYPE:\"ad:autoDealOperation\" and PATH:\"/app:company_home/cm:Test/*\""),
        car = "",
        i = 0,
        sellerName = "",
        customerName = "";

	docsInfoJson = [];
	for (i = 0; i < docs.length; i++) {
	        doc = docs[i];

	       if (doc.assocs["ad:seller"].length != 0) {
	        sellerName = doc.assocs["ad:seller"][0].properties.userName;
	       }
	       if (doc.assocs["ad:customer"].length != 0) {
	        customerName = doc.assocs["ad:customer"][0].properties.userName;
	       }
	        docsInfo = {'name':doc.name, 'size':doc.size, 'author':doc.properties.creator,
	                        'createdDate':doc.properties.created, 'car':doc.properties["ad:car"],
	                        'carModel':doc.properties["ad:carModel"], 'cost':doc.properties["ad:cost"],
	                        'seller':sellerName,
	                        'customer':customerName};
	        docsInfoJson[docsInfoJson.length] = docsInfo;
	    }
    model.docsInfoJson = docsInfoJson;

}

main();