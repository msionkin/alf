define(["dojo/_base/declare","alfresco/core/Core","doh/runner","dijit/registry","dojo/_base/array","dojo/domReady!"],function(c,d,b,a,e){return c(d,{testObjects:null,constructor:function(){var f=this;this.pageRequests=[];this.alfSubscribe("ALF_NAVIGATE_TO_PAGE",function(g){f.alfLog("log","Received page request",g);f.pageRequests.push(g.url)});this.keyboardNavResults=[];this.alfSubscribe("KEYBOARD_CLICK",function(g){f.alfLog("log","Received keyboard selection",g);f.keyboardNavResults.push(g.item)})},findTestObjects:function(f){this.testObjects={};var g=this;e.forEach(f,function(h,i){g.testObjects[h]=a.byId(h);b.assertNotEqual(null,g.testObjects[h],"Could not find '"+h+"'")})}})});