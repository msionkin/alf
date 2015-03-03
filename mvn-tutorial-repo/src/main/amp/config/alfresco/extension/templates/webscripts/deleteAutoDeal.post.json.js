function mainDelete() {
    var dealName = json.get("dealName"),
        deals = search.luceneSearch("TYPE:\"ad:autoDealOperation\" AND @cm\\:name:\"" + dealName + "\"");
    if (deals.length != 0) {
        var dealForDelete = deals[0],
            folder = dealForDelete.parent;

        folder.removeNode(dealForDelete);
    }
}

mainDelete();