define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","alfresco/services/_PreviewServiceTopicMixin","dojo/request/xhr","dojo/_base/lang"],function(g,c,d,a,i,b){return g([c,d,a],{constructor:function j(k){b.mixin(this,k);this.alfSubscribe(this.requestDependenciesTopic,b.hitch(this,"generateDependencies"))},generateDependencies:function f(m){if(m!=null&&m.model!=null){var k=dojoJson.parse(m.model);var l={jsonContent:k,widgets:m.model};this.serviceXhr({url:Alfresco.constants.URL_SERVICECONTEXT+"/service/surf/dojo/xhr/dependencies",method:"POST",query:query,successCallback:this.generateDependenciesSuccess,failureCallback:this.generateDependenciesFailure,callbackScope:this})}else{this.alfLog("error","A request was made to generate the dependencies for a model, but no 'model' attribute was provided in the request",m)}},generateDependenciesSuccess:function e(l,k){this.alfPublish(this.requestDependenciesSuccessTopic,{response:l,originalRequestConfig:k})},generateDependenciesFailure:function h(l,k){this.availablePagesLoadFailure(this.requestDependenciesFailureTopic,{response:l,originalRequestConfig:k})}})});