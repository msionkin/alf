define(["dojo/_base/declare","alfresco/tests/CommonTestService","doh/runner","dojo/robot","dojo/keys","dijit/registry","dojo/query","dojo/dom-attr","dojo/dom-style","dojo/_base/array","alfresco/menus/AlfMenuGroup","dojo/domReady!"],function(c,b,g,j,k,a,i,h,d,f,e){return c(b,{constructor:function(){g.register("Menu tests",[{name:"Test setup",timeout:2000,runTest:this.testSetup,scope:this},{name:"Test Breadcrumb Trail",timeout:40000,runTest:this.testBreadCrumbTrail,scope:this},{name:"Test Breadcrumbs",timeout:40000,runTest:this.testBreadCrumbs,scope:this},{name:"Test Pre-Filtered Actions",timeout:40000,runTest:this.testPreFilteredActions,scope:this},{name:"Test Post-Filtered Actions",timeout:40000,runTest:this.testPostFilteredActions,scope:this},{name:"Test Pre-Filtered Content Creation",timeout:40000,runTest:this.testPreFilteredContentCreation,scope:this},{name:"Test Post-Filtered Content Creation",timeout:40000,runTest:this.testPostFilteredContentCreation,scope:this},{name:"Test Create Templated Content",timeout:40000,runTest:this.testCreateTemplatedContentWidget,scope:this}]);g.run()},testSetup:function(l){this.scope.findTestObjects(["MENU1","MENU1_ITEM1","MENU1_ITEM2","MENU1_ITEM3","MENU1_ITEM4","MENU2","MENU2_ITEM1","MENU2_ITEM2","MENU2_ITEM3","MENU2_ITEM4","MENU2_ITEM5","BREADCRUMB_TRAIL_1","BREADCRUMB_TRAIL_2"])},testPreFilteredActions:function(l){var m=new l.Deferred();this.scope.keyboardNavResults=[];j.mouseMoveAt(this.scope.testObjects.MENU1.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU1_ITEM1.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU1.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU1_ITEM2.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU1.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU1_ITEM3.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU1.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU1_ITEM4.domNode,250);j.mouseClick({left:true},250);var n=this;j.sequence(m.getTestCallback(function(){var o=["ACTION_1","ACTION_2","ACTION_3","ACTION_4"];l.assertEqual(o.length,n.scope.keyboardNavResults.length,"The number of recorded mouse selections did not match expectations");f.forEach(o,function(q,p){l.assertEqual(q,n.scope.keyboardNavResults[p],"Unexpected mouse selection logged")});l.is(true,true)}),900);return m},testPostFilteredActions:function(p){this.scope.keyboardNavResults=[];this.scope.alfPublish("ALF_FILTER_SELECTED_FILE_ACTIONS",{allAspects:["cm:author","cm:titled","exif:exif"],commonAspects:["cm:author","cm:titled"],userAccess:{CancelCheckout:false,ChangePermissions:true,CreateChildren:true,Delete:true,Write:true}});var o=d.get(this.scope.testObjects.MENU1_ITEM1.domNode,"display"),n=d.get(this.scope.testObjects.MENU1_ITEM2.domNode,"display"),m=d.get(this.scope.testObjects.MENU1_ITEM3.domNode,"display"),l=d.get(this.scope.testObjects.MENU1_ITEM4.domNode,"display");p.assertEqual("none",o,"The first action item has not been hidden");p.assertEqual("none",n,"The second action item has not been hidden");p.assertEqual("none",m,"The third action item has not been hidden");p.assertNotEqual("none",l,"The fourth action item has been incorrectly hidden")},testPreFilteredContentCreation:function(l){var m=new l.Deferred();this.scope.keyboardNavResults=[];j.mouseMoveAt(this.scope.testObjects.MENU2.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU2_ITEM1.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU2.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU2_ITEM2.domNode,250);j.mouseClick({left:true},250);var n=this;j.sequence(m.getTestCallback(function(){var o=["ACTION_5","ACTION_6"];l.assertEqual(o.length,n.scope.keyboardNavResults.length,"The number of recorded mouse selections did not match expectations");f.forEach(o,function(q,p){l.assertEqual(q,n.scope.keyboardNavResults[p],"Unexpected mouse selection logged")})}),900);return m},testPostFilteredContentCreation:function(n){this.scope.keyboardNavResults=[];this.scope.alfPublish("ALF_DOCLIST_USER_ACCESS_CHANGED",{userAccess:{CancelCheckout:false,ChangePermissions:true,CreateChildren:true,Delete:true,Write:true}});var m=d.get(this.scope.testObjects.MENU2_ITEM1.domNode,"display"),l=d.get(this.scope.testObjects.MENU2_ITEM2.domNode,"display");n.assertEqual("none",m,"The first content creation item has not been hidden");n.assertNotEqual("none",l,"The second content creation item has been incorrectly hidden")},testCreateTemplatedContentWidget:function(l){var m=new l.Deferred();this.scope.keyboardNavResults=[];j.mouseMoveAt(this.scope.testObjects.MENU2.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU2_ITEM3.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU2_ITEM4.domNode,250);j.mouseClick({left:true},250);j.mouseMoveAt(this.scope.testObjects.MENU2_ITEM5.domNode,250);j.mouseClick({left:true},250);var n=this;j.sequence(m.getTestCallback(function(){n.scope.testObjects.MENU2_ITEM3_POPUP=n.scope.testObjects.MENU2_ITEM3.popup;l.assertNotEqual(null,n.scope.testObjects.MENU2_ITEM3_POPUP,"No popup for failed to load templates");n.scope.testObjects.MENU2_ITEM4_POPUP=n.scope.testObjects.MENU2_ITEM4.popup;l.assertNotEqual(null,n.scope.testObjects.MENU2_ITEM4_POPUP,"No popup for no templates");n.scope.testObjects.MENU2_ITEM5_POPUP=n.scope.testObjects.MENU2_ITEM5.popup;l.assertNotEqual(null,n.scope.testObjects.MENU2_ITEM5_POPUP,"No popup for templates");var q=n.scope.testObjects.MENU2_ITEM3_POPUP.getChildren();l.assertEqual(1,q.length,"Expecting an automatically added group as the only child");var t=q[0].getChildren();l.assertEqual(1,t.length,"Expecting the single 'fail' menu item");var p=n.scope.testObjects.MENU2_ITEM4_POPUP.getChildren();l.assertEqual(1,p.length,"Expecting an automatically added group as the only child");var s=p[0].getChildren();l.assertEqual(1,s.length,"Expecting the single 'no templates' menu item");var o=n.scope.testObjects.MENU2_ITEM5_POPUP.getChildren();l.assertEqual(1,o.length,"Expecting an automatically added group as the only child");var r=o[0].getChildren();l.assertEqual(2,r.length,"Expecting two templates menu items")}),900);return m},testBreadCrumbTrail:function(m){this.scope.keyboardNavResults=[];this.scope.alfPublish("ALF_DOCLIST_FILTER_CHANGED",{filterId:"path",filterData:"/Folder 1"});m.assertEqual(1,this.scope.testObjects.BREADCRUMB_TRAIL_1.domNode.childNodes.length,"Expected only one child node of first breadcrumb trail");m.assertEqual("Folder 1",this.scope.testObjects.BREADCRUMB_TRAIL_1.domNode.firstChild.innerHTML,"Unexpected innerHTML of first child of first breadcrumb trail");m.assertEqual(3,this.scope.testObjects.BREADCRUMB_TRAIL_2.domNode.childNodes.length,"Expected 3 child nodes of second breadcrumb trail");m.assertEqual("Home",this.scope.testObjects.BREADCRUMB_TRAIL_2.domNode.firstChild.innerHTML,"Unexpected innerHTML of first child of second breadcrumb trail");m.assertEqual("Folder 1",this.scope.testObjects.BREADCRUMB_TRAIL_2.domNode.childNodes[2].innerHTML,"Unexpected innerHTML of second child of second breadcrumb trail");this.scope.alfPublish("ALF_DOCLIST_FILTER_CHANGED",{filterId:"path",filterData:"/Folder 1/Folder2"});m.assertEqual(3,this.scope.testObjects.BREADCRUMB_TRAIL_1.domNode.childNodes.length,"Expected 3 child nodes of first breadcrumb trail");m.assertEqual(5,this.scope.testObjects.BREADCRUMB_TRAIL_2.domNode.childNodes.length,"Expected 5 child nodes of second breadcrumb trail");this.scope.alfPublish("ALF_DOCLIST_SHOW_PATH",{selected:false});var l=d.get(this.scope.testObjects.BREADCRUMB_TRAIL_1.domNode,"display");m.assertEqual("none",l,"The breadcrumb was not hidden");this.scope.alfPublish("ALF_CURRENT_NODEREF_CHANGED",{node:{parent:{nodeRef:"PRETEND_NODE"}}});this.scope.alfPublish("ALF_DOCLIST_SHOW_PATH",{selected:true});var l=d.get(this.scope.testObjects.BREADCRUMB_TRAIL_1.domNode,"display");m.assertNotEqual("none",l,"The breadcrumb is still hidden")},testBreadCrumbs:function(l){var o=new l.Deferred();this.scope.pageRequests=[];this.scope.filterChangeRequests=[];this.scope.alfSubscribe("ALF_DOCLIST_FILTER_CHANGED",function(q){p.scope.alfLog("log","Received filter change request",q);p.scope.filterChangeRequests.push(q.filterData)});var n=this.scope.testObjects.BREADCRUMB_TRAIL_2.domNode.childNodes[2],m=this.scope.testObjects.BREADCRUMB_TRAIL_2.domNode.childNodes[4];j.mouseMoveAt(m,250);j.mouseClick({left:true},250);j.mouseMoveAt(n,250);j.mouseClick({left:true},250);var p=this;j.sequence(o.getTestCallback(function(){var q=["folder-details?nodeRef=PRETEND_NODE"];l.assertEqual(q.length,p.scope.pageRequests.length,"One page request was expected");f.forEach(q,function(s,r){l.assertEqual(s,p.scope.pageRequests[r],"Unexpected page: "+p.scope.pageRequests[r])});q=["/Folder 1"];l.assertEqual(q.length,p.scope.filterChangeRequests.length,"One filter change request was expected");f.forEach(q,function(s,r){l.assertEqual(s,p.scope.filterChangeRequests[r],"Unexpected filter: "+p.scope.filterChangeRequests[r])})}),900);return o}})});