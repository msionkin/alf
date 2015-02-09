function main() {
    var doc,
        docsInfo,
        docsInfoJson,
        docs = search.luceneSearch("PATH:\"/app:company_home/cm:Test/*\""),
        car = "";

	docsInfoJson = [];
	for (i = 0; i < docs.length; i++) {
	        doc = docs[i];
	       
	        docsInfo = {'name':doc.name, 'size':doc.size, 'author':doc.properties.creator,
	                        'createdDate':doc.properties.created, 'car':doc.properties["ad:car"],
	                        'carModel':doc.properties["ad:carModel"], 'cost':doc.properties["ad:cost"],
	                        'seller':doc.properties["ad:seller"].properties.userName,
	                        'customer':doc.properties["ad:customer"].properties.userName};
	        docsInfoJson[docsInfoJson.length] = docsInfo;
	    }
    model.docsInfoJson = docsInfoJson;

}

main();