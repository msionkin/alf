YAHOO.util.Event.addListener(window, "load", function() {
YAHOO.example.XHR_JSON = function() {
   var myDataSource,
       myColumnDefs,
       myDataTable;

   var editFormatButton = function (el, oRecord, oColumn, oData, oDataTable) {
        el.innerHTML = "<button type=\"button\" class=\"yui-dt-button\" value=\"edit\">" + "edit" + "</button>";
   };

   var deleteFormatButton = function (el, oRecord, oColumn, oData, oDataTable) {
            el.innerHTML = "<button type=\"button\" class=\"yui-dt-button\" value=\"delete\">" + "delete" + "</button>";
   };

    //"http://localhost:8080/alfresco/service/deal/all"
    myDataSource = new YAHOO.util.XHRDataSource(Alfresco.constants.PROXY_URI +"deal/all", {
       responseType: YAHOO.util.DataSource.TYPE_JSON,
       responseSchema: {
           resultsList: "docs",
           fields: ["name",
                    "createdDate",
                    "car",
                    "carModel",
                    {key:"cost", parser:"number"},
                    "seller",
                    "customer"]
       }
   });

   myColumnDefs = [
       { key: "name", label:"Auto Deal Name" },
       { key: "createdDate", label: "Created Date" },
       { key: "car", label: "Car" },
       { key: "carModel", label: "Model" },
       { key: "cost", label: "Cost" },
       { key: "seller", label: "Seller username" },
       { key: "customer", label: "Customer username" },
       { label:"Customize deal",
       	     children: [
       	         { key: "edit deal", formatter: editFormatButton},
                 { key: "delete deal", formatter: deleteFormatButton}
       	     ]
       	 }
   ];

   myDataTable = new YAHOO.widget.DataTable("deals-table", myColumnDefs, myDataSource);

   myDataTable.subscribe("buttonClickEvent", function(oArgs){
       oRecord = this.getRecord(oArgs.target);
       if (oArgs.target.value == "edit") {
            var i = 0,
                dealFormElements = YAHOO.ionkin.container.addDealDialog.form.elements;

            for (i = 0; i<dealFormElements.length; ++i) {
                if (dealFormElements[i].name == "car") {
                    dealFormElements[i].value = oRecord._oData.car;
                } else if (dealFormElements[i].name == "model") {
                     dealFormElements[i].value = oRecord._oData.carModel;
                } else if (dealFormElements[i].name == "cost") {
                     dealFormElements[i].value = oRecord._oData.cost;
                } else if (dealFormElements[i].name == "seller") {
                     dealFormElements[i].value = oRecord._oData.seller;
                } else if (dealFormElements[i].name == "customer") {
                     dealFormElements[i].value = oRecord._oData.customer;
                }
            }
            YAHOO.ionkin.container.addDealDialog.show();

       } else if (oArgs.target.value == "delete") {
             Alfresco.util.Ajax.jsonDelete({
                method: Alfresco.util.Ajax.DELETE,
                url: Alfresco.constants.PROXY_URI +"deal/delete",
                dataObj: {
                    dealName: oRecord._oData.name
                }
             });
       }
   });
}();
});

