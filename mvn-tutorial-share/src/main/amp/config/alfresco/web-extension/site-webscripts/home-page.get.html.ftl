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
   	            <table>
   	                <tr>
   	                    <td><label for="car">Car:</label></td><td><input type="textbox" name="car" /></td>
   	                </tr>
   	                <tr>
                   	    <td><label for="model">Model:</label></td><td><input type="textbox" name="model" /></td>
                    </tr>
   	                <tr>
                   	    <td><label for="cost">Cost:</label></td><td><input type="textbox" name="cost" /></td>
                   	</tr>
                    <tr>
                       <td><label for="seller">Seller username:</label></td><td><input type="textbox" name="seller" /></td>
                    </tr>
                    <tr>
                       <td><label for="customer">Customer username:</label></td><td><input type="textbox" name="customer" /></td>
                    </tr>
                </table>
   	        </form>
   	    </div>
   	</div>
</@>