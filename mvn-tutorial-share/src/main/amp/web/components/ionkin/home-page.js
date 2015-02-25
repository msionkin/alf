YAHOO.util.Event.addListener(window, "load", function() {
YAHOO.example.XHR_JSON = function() {
   var myDataSource,
       myColumnDefs,
       myDataTable;

    //"http://localhost:8080/alfresco/service/deal/all"
    myDataSource = new YAHOO.util.XHRDataSource(Alfresco.constants.PROXY_URI +"deal/all", {
       responseType: YAHOO.util.DataSource.TYPE_JSON,
       responseSchema: {
           resultsList: "docs",
           fields: ["name",
                    "size",
                    "author",
                    "createdDate",
                    "car",
                    "carModel",
                    {key:"cost", parser:"number"},
                    "seller",
                    "customer"]
       }
   });

   myColumnDefs = [
   { key: "name", label:"Doc Name" },
   { key: "size", label: "Doc Size" },
   { key: "author", label: "Author" },
   { key: "createdDate", label: "Created Date" },
       { key: "car", label: "Car" },
       { key: "carModel", label: "Model" },
       { key: "cost", label: "Cost" },
       { key: "seller", label: "Seller username" },
       { key: "customer", label: "Customer username" }
   ];

   myDataTable = new YAHOO.widget.DataTable("deals-table", myColumnDefs, myDataSource);

	    }();
	});

