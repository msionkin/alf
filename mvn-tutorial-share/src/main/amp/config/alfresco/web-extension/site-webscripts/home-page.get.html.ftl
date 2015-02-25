<@markup id="css" >
   <!--CSS file (default YUI Sam Skin) -->
   <link type="text/css" rel="stylesheet" href="http://yui.yahooapis.com/2.9.0/build/datatable/assets/skins/sam/datatable.css">
</@>

<@markup id="js">
   <@script type="text/javascript" src="${url.context}/res/components/ionkin/home-page.js"/>
   <@script type="text/javascript" src="${url.context}/res/components/ionkin/newDeal.js"/>
</@>

<@markup id="html">
   <div id="deals-table"></div>
   <p><input type="button" id="addNewDeal" value="Add"></p>

   <div id="addDealDialog" class="yui-pe-content">
   	    <div class="hd">Please enter your information</div>
   	    <div class="bd">
   	        <form method="POST" id="addDealDialogForm">
   	            <label for="car">Car:</label><input type="textbox" name="car" />
   	            <div class="clear"></div>
   	            <label for="model">Model:</label><input type="textbox" name="model" />
   	            <div class="clear"></div>
   	            <label for="cost">Cost:</label><input type="textbox" name="cost" />
                <div class="clear"></div>
                <label for="seller">Seller username:</label><input type="textbox" name="seller" />
                <div class="clear"></div>
                <label for="customer">Customer username:</label><input type="textbox" name="customer" />
                <div class="clear"></div>
   	        </form>
   	    </div>
   	</div>
</@>