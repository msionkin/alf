function main() {
    var doc,
        docsInfo,
        docsInfoJson,
        docs = search.luceneSearch("PATH:\"/app:company_home/cm:Test/*\"");

	docsInfoJson = [];
	for (i = 0; i < docs.length; i++) {
	        doc = docs[i];
	        docsInfo = {'name':doc.name, 'size':doc.size, 'author':doc.properties.creator, 'createdDate':doc.properties.created};
	        docsInfoJson[docsInfoJson.length] = docsInfo;
	    }
    model.docsInfoJson = docsInfoJson;

}

main();