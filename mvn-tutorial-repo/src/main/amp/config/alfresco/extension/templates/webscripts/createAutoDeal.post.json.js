function main() {
    var car = "",
        model = "",
        cost = 0,
        sellerUserName = "",
        seller = null,
        customerUserName = "",
        customer = null,
        date = new Date(),
        contentType = "ad:autoDealOperation",
        testFolder = companyhome.childByNamePath("Test");

    if (testFolder == null) {
        testFolder = companyhome.createFolder("Test");
    }

    car = json.get("car");
    model = json.get("model");
    cost = json.get("cost");
    sellerUserName = json.get("seller");
    customerUserName = json.get("customer");

    if (car == "" || model == "" || cost == 0 || sellerUserName == "" || customerUserName == "")
    {
      status.code = 400;
      status.message = "Unknown data";
      status.redirect = true;
    }
    else {
      var myNode = testFolder.createNode(car + " " +
                                        model + " " +
                                        date.getDate() + "." +
                                        (date.getMonth() + 1) + "." +
                                        date.getFullYear(), contentType);

      myNode.properties["ad:car"] = car;
      myNode.properties["ad:carModel"] = model;
      myNode.properties["ad:cost"] = cost;
      myNode.save();

      seller = people.getPerson(sellerUserName);
      if (seller == null) {
        status.code = 400;
        status.message = "Unknown seller username";
        status.redirect = true;
      } else {
        myNode.createAssociation(seller,"ad:seller")
      }

      customer = people.getPerson(customerUserName);
      if (customer == null) {
        status.code = 400;
        status.message = "Unknown customer username";
        status.redirect = true;
      } else {
        myNode.createAssociation(customer,"ad:customer")
      }
    }
     

}

main();