var car = "";
var model = "";
var cost = 0;
var seller = "";
var customer = "";
var timestamp = new Date().getTime();
var contentType = "whitepaper";

for each (field in formdata.fields)
{
  if (field.name == "car")
  {
    car = field.value;
  }
  else if (field.name == "model")
  {
    model = field.value;
  }
  else if (field.name == "cost")
  {
      cost = field.value;
  }
  else if (field.name == "seller")
  {
      seller = field.value;
  }
  else if (field.name == "customer")
  {
    customer = field.filename;
  }
}

if (car == "" || model == "" || cost == 0 || seller == "" || customer == "")
{
  status.code = 400;
  status.message = "Unknown data";
  status.redirect = true;
}
else
{
  var whitepaperNode = space.createNode(car + model + timestamp, "ad:" + contentType);

  whitepaperNode.properties["ad:car"] = car;
  whitepaperNode.properties["ad:carModel"] = model;
  whitepaperNode.properties["ad:cost"] = cost;
  whitepaperNode.properties["ad:seller"] = seller;
  whitepaperNode.properties["ad:customer"] = customer;

  whitepaperNode.content = "This is a sample " + contentType + " document called " + car + model;
   whitepaperNode.save();

}