define(["dojo/_base/declare","alfresco/tests/CommonTestService","doh/runner","dojo/robot","dojo/keys","dijit/registry","dojo/query","dojo/dom-attr","dojo/dom-style","dojo/_base/array","alfresco/menus/AlfMenuGroup","dojo/domReady!"],function(c,b,g,j,k,a,i,h,d,f,e){return c(b,{constructor:function(){g.register("Menu tests",[{name:"Test setup",timeout:2000,runTest:this.testSetup,scope:this},{name:"Test Localization",timeout:2000,runTest:this.testLocalization,scope:this},{name:"Test Rendering",timeout:2000,runTest:this.testRendering,scope:this},{name:"Test Grouping",timeout:2000,runTest:this.testGrouping,scope:this},{name:"Test Group Navigation",timeout:40000,runTest:this.testGroupNavigation,scope:this},{name:"Test Cascade Kevboard Navigation",timeout:40000,runTest:this.testCascadeKeyboardNavigation,scope:this},{name:"Test Actions",timeout:40000,runTest:this.testActions,scope:this}]);g.run()},testSetup:function(l){this.scope.findTestObjects(["DROP_DOWN_MENU_1","DROP_DOWN_MENU_2","DROP_DOWN_MENU_3","DROP_DOWN_MENU_4","DROP_DOWN_1_GROUP_1","DROP_DOWN_1_GROUP_2","DROP_DOWN_1_GROUP_3","DROP_DOWN_4_GROUP_1","MENU_ITEM_1","MENU_ITEM_2","MENU_ITEM_3","MENU_ITEM_4","MENU_ITEM_5","MENU_ITEM_6","MENU_ITEM_7","MENU_ITEM_8","MENU_ITEM_9","MENU_ITEM_10","MENU_BAR_ITEM_1","DROP_DOWN_MENU_5","CASCADING_MENU_1","CASCADE_MENU_ITEM_1","CASCADE_MENU_ITEM_2","CASCADE_MENU_ITEM_3","CASCADE_SUB_MENU_1","CASCADE_MENU_ITEM_4","CASCADE_MENU_ITEM_5"])},testLocalization:function(l){l.assertEqual("Groups With Labels",this.scope.testObjects.DROP_DOWN_MENU_1.label,"Drop down menu label not localized correctly");l.assertEqual("Group 1 (Drop Down 1)",this.scope.testObjects.DROP_DOWN_1_GROUP_1.label,"Drop down menu GROUP label not localized correctly");l.assertEqual("Menu Item 1",this.scope.testObjects.MENU_ITEM_1.label,"Drop down menu ITEM label not localized correctly")},testRendering:function(m){var n=this.scope.testObjects.DROP_DOWN_MENU_4;m.assertTrue(n.domNode.firstChild.nodeName.toUpperCase()=="SPAN","First child of AlfMenuBarPopup is not a span element");m.assertTrue(h.get(n.domNode.firstChild,"class")=="alf-configure-icon","First child of AlfMenuBarPopup does not have class 'alf-configure-icon' as expected");m.assertTrue(n.domNode.children[1].nodeName.toUpperCase()=="SPAN","Second child of AlfMenuBarPopup is not a span element");m.assertTrue(h.get(n.domNode.children[1],"class")=="alf-menu-bar-label-node alf-menu-bar-popup-label-node","Second child of AlfMenuBarPopup does not have class 'alf-menu-bar-popup-label-node' as expected");m.assertEqual(1,n.popup.getChildren().length,"The AlfMenuBarPopup popup does not have a single child as expected");var l=n.popup.getChildren()[0];m.assertTrue(l.isInstanceOf(e),"The AlfMenuBarPopup's popup is NOT a menu group");m.assertEqual(2,l.getChildren().length,"The menu group does not have 2 children as expected");m.assertEqual(1,i(".dijitIcon.dijitMenuItemIcon.alf-edit-icon",l.domNode).length,"The right number of edit icon menu items was not found");m.assertEqual(1,i(".dijitIcon.dijitMenuItemIcon.alf-edit-icon",l.domNode).length,"The right number of cog icon menu items was not found");m.assertEqual(1,i(".alf-menu-item-wrapper-row").length==1,"The right number of wrapped menu items was NOT found")},testGrouping:function(m){var l=d.get(this.scope.testObjects.DROP_DOWN_1_GROUP_3._groupTitleNode,"display");m.assertEqual("none",l,"Group heading with no label is displayed");var n=this.scope.testObjects.MENU_ITEM_7.getParent();m.assertNotEqual(null,n,"The ungrouped menu item has no parent");m.assertTrue(n.isInstanceOf(e),"The ungrouped menu item has a parent that is NOT a menu group")},testGroupNavigation:function(l){var m=new l.Deferred();this.scope.keyboardNavResults=[];this.scope.pageRequests=[];j.keyPress(k.TAB,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.ENTER,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.UP_ARROW,200);j.keyPress(k.ENTER,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.ENTER,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.UP_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);var n=this;j.sequence(m.getTestCallback(function(){var o=["MENU_ITEM_1","MENU_ITEM_2","MENU_ITEM_3","MENU_ITEM_2","MENU_ITEM_5","MENU_ITEM_6","MENU_ITEM_1","MENU_ITEM_6"];l.assertEqual(o.length,n.scope.keyboardNavResults.length,"The number of recorded keyboard selections did not match expectations");f.forEach(o,function(r,q){l.assertEqual(r,n.scope.keyboardNavResults[q],"Unexpected keyboard selection logged")});var p=["MENU_BAR_ITEM_1","MENU_ITEM_7","MENU_ITEM_8"];l.assertEqual(p.length,n.scope.pageRequests.length,"The number of recorded page requests did not match expectations");f.forEach(p,function(r,q){l.assertEqual(r,n.scope.pageRequests[q],"Unexpected page request logged")})}),900);return m},testCascadeKeyboardNavigation:function(l){var m=new l.Deferred();this.scope.keyboardNavResults=[];this.scope.pageRequests=[];j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.LEFT_ARROW,200);j.keyPress(k.UP_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.LEFT_ARROW,200);j.keyPress(k.LEFT_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.SPACE,200);j.keyPress(k.RIGHT_ARROW,200);j.keyPress(k.DOWN_ARROW,200);j.keyPress(k.SPACE,200);var n=this;j.sequence(m.getTestCallback(function(){var o=["CASCADE_MENU_ITEM_2","CASCADE_MENU_ITEM_5","CASCADE_MENU_ITEM_3","MENU_ITEM_9","CASCADE_MENU_ITEM_1","MENU_ITEM_1"];l.assertEqual(o.length,n.scope.keyboardNavResults.length,"The number of recorded keyboard selections did not match expectations");f.forEach(o,function(q,p){l.assertEqual(q,n.scope.keyboardNavResults[p],"Unexpected keyboard selection logged")})}),900);return m},testActions:function(l){var m=new l.Deferred();this.scope.keyboardNavResults=[];this.scope.pageRequests=[];j.mouseMoveAt(this.scope.testObjects.DROP_DOWN_MENU_1.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.MENU_ITEM_5.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.DROP_DOWN_MENU_2.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.MENU_ITEM_7.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.MENU_BAR_ITEM_1.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.DROP_DOWN_MENU_5.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.CASCADING_MENU_1.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.CASCADE_SUB_MENU_1.domNode,500);j.mouseClick({left:true},500);j.mouseMoveAt(this.scope.testObjects.CASCADE_MENU_ITEM_4.domNode,500);j.mouseClick({left:true},500);var n=this;j.sequence(m.getTestCallback(function(){var o=["MENU_ITEM_5","CASCADE_MENU_ITEM_4"],p=["MENU_ITEM_7","MENU_BAR_ITEM_1"];l.assertEqual(o.length,n.scope.keyboardNavResults.length,"The number of recorded mouse selections did not match expectations");f.forEach(o,function(r,q){l.assertEqual(r,n.scope.keyboardNavResults[q],"Unexpected mouse selection logged")});l.assertEqual(p.length,n.scope.pageRequests.length,"The number of recorded page requests did not match expectations");f.forEach(p,function(r,q){l.assertEqual(r,n.scope.pageRequests[q],"Unexpected page request logged")});l.is(true,true)}),900);return m}})});