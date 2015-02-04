define(["dojo/_base/declare","alfresco/tests/CommonTestService","doh/runner","dojo/robot","dojo/keys","dijit/registry","dojo/query","dojo/dom-attr","dojo/dom-style","dojo/_base/array","dojo/date/stamp","alfresco/menus/AlfMenuGroup","dojo/domReady!"],function(d,c,h,k,l,b,j,i,e,g,a,f){return d(c,{constructor:function(){var m=this;this.statusUpdatesPosted=[];this.alfSubscribe("ALF_UPDATE_USER_STATUS",function(n){m.statusUpdatesPosted.push(n)});h.register("Header tests",[{name:"Test setup",timeout:2000,runTest:this.testSetup,scope:this},{name:"Test Rendering",timeout:2000,runTest:this.testRendering,scope:this},{name:"Test UserStatus Accessibility",timeout:20000,runTest:this.testUserStatusAccessibility,scope:this},{name:"Test SearchBox Accessibility",timeout:20000,runTest:this.testSearchBoxAccessibility,scope:this},{name:"Test Events",timeout:20000,runTest:this.testEvents,scope:this},{name:"Test Mouse Navigation",timeout:20000,runTest:this.testMouseCapabilities,scope:this},{name:"Test Clear User Status",timeout:20000,runTest:this.testUserStatusClick,scope:this},{name:"Test Reset User Status",timeout:20000,runTest:this.testUserStatusBlurNoUpdate,scope:this},{name:"Test Preserve Partial Status",timeout:20000,runTest:this.testUserStatusBlurPartialUpdate,scope:this}]);h.run()},testSetup:function(m){this.scope.findTestObjects(["HEADER","LEFT_MENU","MENU_1","DROP_DOWN_1_GROUP_1","BEFORE_USER_STATUS","USER_STATUS","DROP_DOWN_1_GROUP_2","AFTER_USER_STATUS","RIGHT_MENU","SEARCH_BOX"]);this.scope.testObjects.SEARCH_BOX_MENU=this.scope.testObjects.SEARCH_BOX._searchMenu.getChildren()[0];m.assertNotEqual(null,this.scope.testObjects.SEARCH_BOX_MENU,"Could not find search box menu");this.scope.testObjects.ADVANCED_SEARCH_MENU_ITEM=this.scope.testObjects.SEARCH_BOX_MENU.getChildren()[0].popup.getChildren()[0].getChildren()[0];m.assertNotEqual(null,this.scope.testObjects.ADVANCED_SEARCH_MENU_ITEM,"Could not find search box advanced menu item")},testRendering:function(m){m.assertEqual(1,j(".alf-menu-arrow",this.scope.testObjects.LEFT_MENU.domNode).length,"The correct number of arrow classes was not found")},testUserStatusAccessibility:function(n){var p=new n.Deferred();this.scope.keyboardNavResults=[];this.scope.statusUpdatesPosted=[];var m="Status Update 1";k.keyPress(l.TAB,200);k.keyPress(l.DOWN_ARROW,200);k.keyPress(l.SPACE,200);k.keyPress(l.DOWN_ARROW,200);k.keyPress(l.DOWN_ARROW,200);k.keyPress(l.SPACE,200);k.keyPress(l.UP_ARROW,200);for(var o=0;o<22;o++){k.keyPress(l.DELETE,50)}k.typeKeys(m,500,2000);k.keyPress(l.ENTER,200);k.keyPress(l.UP_ARROW,200);k.keyPress(l.SPACE,200);var q=this;k.sequence(p.getTestCallback(function(){var r=["BEFORE_USER_STATUS","AFTER_USER_STATUS","BEFORE_USER_STATUS"];n.assertEqual(r.length,q.scope.keyboardNavResults.length,"The number of recorded keyboard selections did not match expectations");g.forEach(r,function(t,s){n.assertEqual(t,q.scope.keyboardNavResults[s],"Unexpected keyboard selection logged")});n.assertEqual(1,q.scope.statusUpdatesPosted.length,"The number of status updates was not as expected");n.assertEqual(m,q.scope.statusUpdatesPosted[0].status,"The status update was not posted correctly")}),900);return p},testSearchBoxAccessibility:function(n){var o=new n.Deferred();this.scope.pageRequests=[];var m="SearchThis";k.keyPress(l.TAB,200);k.keyPress(l.TAB,200);k.keyPress(l.TAB,200);k.keyPress(l.TAB,200);k.typeKeys(m,500,2000);k.keyPress(l.ENTER,200);k.keyPress(l.TAB,200,{shift:true});k.keyPress(l.DOWN_ARROW,200);k.keyPress(l.SPACE,200);var p=this;k.sequence(o.getTestCallback(function(){var q=["search?t="+m,"advsearch"];n.assertEqual(q.length,p.scope.pageRequests.length,"The number of recorded page requests did not match expectations");g.forEach(q,function(s,r){n.assertEqual(s,p.scope.pageRequests[r],"Unexpected page request logged")})}),900);return o},testEvents:function(m){var n="Received Status";this.scope.alfPublish("ALF_USER_STATUS_UPDATED",{userStatus:n,userStatusTime:a.toISOString(new Date())});m.assertEqual(n,this.scope.testObjects.USER_STATUS.userStatus,"The user status was not updated correctly")},testMouseCapabilities:function(n){var p=new n.Deferred();this.scope.pageRequests=[];this.scope.statusUpdatesPosted=[];var m="SearchThat",o="another Status";k.mouseMoveAt(this.scope.testObjects.MENU_1.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.DROP_DOWN_1_GROUP_1.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.USER_STATUS._userStatusWidget.domNode,500);k.mouseClick({left:true},500);k.typeKeys(o,500,2000);k.mouseMoveAt(this.scope.testObjects.USER_STATUS._postButtonNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.SEARCH_BOX._searchTextNode,500);k.mouseClick({left:true},500);k.typeKeys(m,500,2000);k.keyPress(l.ENTER,200);k.mouseMoveAt(this.scope.testObjects.SEARCH_BOX_MENU.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.ADVANCED_SEARCH_MENU_ITEM.domNode,500);k.mouseClick({left:true},500);var q=this;k.sequence(p.getTestCallback(function(){n.assertEqual(1,q.scope.statusUpdatesPosted.length,"The number of status updates was not as expected");n.assertEqual(o,q.scope.statusUpdatesPosted[0].status,"The status update was not posted correctly");var r=["search?t="+m,"advsearch"];n.assertEqual(r.length,q.scope.pageRequests.length,"The number of recorded page requests did not match expectations");g.forEach(r,function(t,s){n.assertEqual(t,q.scope.pageRequests[s],"Unexpected page request logged")})}),900);return p},testUserStatusClick:function(m){var o=new m.Deferred();var n="Status to clear";this.scope.alfPublish("ALF_USER_STATUS_UPDATED",{userStatus:n,userStatusTime:a.toISOString(new Date())});k.mouseMoveAt(this.scope.testObjects.MENU_1.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.DROP_DOWN_1_GROUP_1.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.USER_STATUS._userStatusWidget.domNode,500);k.mouseClick({left:true},500);var p=this;k.sequence(o.getTestCallback(function(){var q=p.scope.testObjects.USER_STATUS._userStatusWidget.attr("value");m.assertEqual("",q,"The previous status was not cleared")}),900);return o},testUserStatusBlurNoUpdate:function(m){var o=new m.Deferred();var n="Control Status";this.scope.alfPublish("ALF_USER_STATUS_UPDATED",{userStatus:n,userStatusTime:a.toISOString(new Date())});k.mouseMoveAt(this.scope.testObjects.USER_STATUS._userStatusWidget.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.SEARCH_BOX.domNode,500);var p=this;k.sequence(o.getTestCallback(function(){var q=p.scope.testObjects.USER_STATUS._userStatusWidget.attr("value");m.assertEqual(n,q,"The previous status was not reset")}),900);return o},testUserStatusBlurPartialUpdate:function(m){var o=new m.Deferred();var n="Partial Stat";k.mouseMoveAt(this.scope.testObjects.MENU_1.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.USER_STATUS._postButtonNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.USER_STATUS._userStatusWidget.domNode,500);k.mouseClick({left:true},500);k.typeKeys(n,500,2000);k.mouseMoveAt(this.scope.testObjects.SEARCH_BOX.domNode,500);var p=this;k.sequence(o.getTestCallback(function(){var q=p.scope.testObjects.USER_STATUS._userStatusWidget.attr("value");m.assertEqual(n,q,"The previous status was not reset")}),900);return o}})});