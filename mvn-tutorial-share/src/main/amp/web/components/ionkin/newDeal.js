YAHOO.namespace("ionkin.container");
YAHOO.util.Event.onDOMReady(function () {
    var dialogData;
    var handleCancel = function() {
		this.cancel();
	};

    var pushDataToRepository = function () {

        var handleSuccess = function() {
         console.log("new deal has been added")
         window.location.reload();
        };

        var handleFailure = function(e) {
     	    alert("Submission failed: " + e.json.message );
        };

        var urlForDeal = Alfresco.constants.PROXY_URI + "deal/create";

        if (YAHOO.ionkin.container.addDealDialog.isThisDealForEditing === true) {
            urlForDeal += "/update";
        }

        dialogData = YAHOO.ionkin.container.addDealDialog.getData();
        if (YAHOO.ionkin.container.addDealDialog.validate()) {
            Alfresco.util.Ajax.jsonPost({
                 url: urlForDeal,
                 dataObj: {
                    dealNameForEditing: YAHOO.ionkin.container.addDealDialog.dealNameForEditing,
                    car : dialogData.car,
                    model: dialogData.model,
                    cost : dialogData.cost,
                    seller: dialogData.seller,
                    customer: dialogData.customer
                 },
                 successCallback: {fn: handleSuccess, scope: YAHOO.ionkin.container.addDealDialog},
                 failureCallback: {fn: handleFailure, scope: YAHOO.ionkin.container.addDealDialog}
            });

            YAHOO.ionkin.container.addDealDialog.hide();
        }
    };

    // Remove progressively enhanced content class, just before creating the module
    YAHOO.util.Dom.removeClass("addDealDialog", "yui-pe-content");

	// Instantiate the Dialog
	YAHOO.ionkin.container.addDealDialog = new YAHOO.widget.Dialog("addDealDialog",
							{ width : "30em",
							  fixedcenter : true,
							  visible : false, 
							  constraintoviewport : true,
							  buttons : [ { text:"Submit", handler: pushDataToRepository},
								          { text:"Cancel", handler: handleCancel } ]
							});

	// Validate the entries in the form
	YAHOO.ionkin.container.addDealDialog.validate = function() {
		dialogData = this.getData();
		if (dialogData.car == "" || dialogData.model == "" || dialogData.cost == "" || dialogData.seller == "" || dialogData.customer == "") {
			alert("Please fill all fields.");
			return false;
		} else {
			return true;
		}
	};

	// Render the Dialog
	YAHOO.ionkin.container.addDealDialog.render();

	YAHOO.util.Event.addListener("addNewDeal",
	                                "click",
	                                function() {
                                        YAHOO.ionkin.container.addDealDialog.isThisDealForEditing = false;
                                        YAHOO.ionkin.container.addDealDialog.show();
                                    },
                                    YAHOO.ionkin.container.addDealDialog,
                                    true);
});

