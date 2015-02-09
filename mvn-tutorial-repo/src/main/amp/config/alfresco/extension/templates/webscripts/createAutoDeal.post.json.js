function main() {
    var car = "";
    var model = "";
    var cost = 0;
    var sellerUserName = "";
    var seller = null;
    var customerUserName = "";
    var customer = null;
    var timestamp = new Date().getTime();
    var contentType = "cm:content";
    var testFolder = companyhome.childByNamePath("Test");

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
      var myNode = testFolder.createNode(car + model + timestamp, contentType);

      myNode.properties["ad:car"] = car;
      myNode.properties["ad:carModel"] = model;
      myNode.properties["ad:cost"] = cost;

      seller = people.getPerson(sellerUserName);
      if (seller == null) {
        status.code = 400;
        status.message = "Unknown seller username";
        status.redirect = true;
      } else {
        myNode.properties["ad:seller"] = seller;
      }

      customer = people.getPerson(customerUserName);
      if (customer == null) {
        status.code = 400;
        status.message = "Unknown customer username";
        status.redirect = true;
      } else {
        myNode.properties["ad:customer"] = customer;
      }

      myNode.content = "This is a sample " + contentType + " document called " + car + model;
      myNode.save();
    }
     

}

main();