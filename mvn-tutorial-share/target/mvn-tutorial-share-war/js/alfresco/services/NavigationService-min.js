define(["dojo/_base/declare","alfresco/core/Core","alfresco/services/_NavigationServiceTopicMixin","dojo/hash","dojo/_base/array","dojo/_base/lang"],function(e,c,i,d,h,b){return e([c,i],{subscriptions:null,constructor:function f(k){b.mixin(this,k);this.alfSubscribe(this.navigateToPageTopic,b.hitch(this,"navigateToPage"));this.alfSubscribe(this.reloadPageTopic,b.hitch(this,"reloadPage"));if(this.subscriptions!=null){h.forEach(this.subscriptions,b.hitch(this,"setupNavigationSubscriptions"))}},setupNavigationSubscriptions:function a(l,k){if(l!=null&&l.topic!=null&&l.url!=null){this.alfSubscribe(l.topic,b.hitch(this,"navigateToPage",l))}else{this.alfLog("warn","A NavigationService subscription was requested, but the subscription was missing one of the required attributes of 'topic' or 'url'",l,this)}},navigateToPage:function j(l){if(typeof l.url=="undefined"||l.url==null||l.url==""){this.alfLog("error","A page navigation request was made without a target URL defined as a 'url' attribute",l)}else{this.alfLog("log","Page navigation request received:",l);var k;if(typeof l.type=="undefined"||l.type==null||l.type==""||l.type==this.sharePageRelativePath){k=Alfresco.constants.URL_PAGECONTEXT+l.url}else{if(l.type==this.contextRelativePath){k=Alfresco.contants.URL_CONTEXT+l.url}else{if(l.type==this.fullPath){k=l.url}}}if(l.type==this.hashPath){d(l.url)}else{if(typeof l.target=="undefined"||l.target==null||l.target==""||l.target==this.currentTarget){window.location=k}else{if(l.target==this.newTarget){window.open(k)}}}}},reloadPage:function g(k){this.alfLog("log","Page reload request received:",k);window.location.reload(true)}})});