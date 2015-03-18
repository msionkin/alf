function createAutoDealFromWorkflow() {
    var car = "",
        model = "",
        cost = 0,
        sellerUserName = "",
        seller = null,
        customerUserName = "",
        customer = null,
        date = new Date(),
        contentType = "ad:autoDealOperation",
        testFolder = companyhome.childByNamePath("Test"),
        myNode = null,
        dealName = "";

    function generateDealName() {
        return car + " " +
               model + " " +
               date.getDate() + "." +
               (date.getMonth() + 1) + "." +
               date.getFullYear();
    }

    if (testFolder == null) {
        testFolder = companyhome.createFolder("Test");
    }

    car = adwf_carSelection;
    model = adwf_modelSelection;
    cost = adwf_carCost;
    sellerUserName = adwf_sellerUsername;
    customerUserName = initiator.properties.userName;

    if (car == "" || model == "" || cost == 0 || sellerUserName == "" || customerUserName == "")
    {
      throw "Unknown data";
    } else {
        dealName = generateDealName();
        myNode = testFolder.createNode(dealName, contentType)
        myNode.properties["ad:car"] = car;
        myNode.properties["ad:carModel"] = model;
        myNode.properties["ad:cost"] = cost;
        myNode.save()

        seller = people.getPerson(sellerUserName);
        if (seller == null) {
            throw  "Unknown seller username";
        } else {
            myNode.createAssociation(seller,"ad:seller")
        }

        customer = people.getPerson(customerUserName);
        if (customer == null){
           throw "Unknown customer username";
        }  else {
            myNode.createAssociation(customer,"ad:customer")
        }
    }
}