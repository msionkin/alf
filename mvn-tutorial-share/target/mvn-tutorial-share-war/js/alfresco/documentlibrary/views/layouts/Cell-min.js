define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/Cell.html","alfresco/documentlibrary/views/layouts/_MultiItemRendererMixin","alfresco/core/Core"],function(d,c,g,e,b,f){return d([c,g,b,f],{cssRequirements:[{cssFile:"./css/Cell.css"}],templateString:e,postCreate:function a(){if(this.widgets){this.processWidgets(this.widgets,this.containerNode)}}})});