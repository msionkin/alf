define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/Title.html","dojo/_base/lang","alfresco/core/Core"],function(e,f,i,g,b,c){return e([f,i,c],{cssRequirements:[{cssFile:"./css/Title.css"}],templateString:g,label:null,targetUrl:null,postMixInProperties:function h(){if(this.label){this.label=this.encodeHTML(this.label!=null?this.label:"")}},postCreate:function d(){this.textNode.innerHTML=this.label;if(this.targetUrl){this.textNode.href=Alfresco.constants.URL_PAGECONTEXT+this.targetUrl}this.alfSubscribe("ALF_UPDATE_PAGE_TITLE",b.hitch(this,"updatePageTitle"))},updatePageTitle:function a(j){if(j&&j.title){this.textNode.innerHTML=j.title;document.title="Alfresco \u00bb "+j.title}}})});