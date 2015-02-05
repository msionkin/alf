define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/Indicators.html","alfresco/core/Core","dojo/_base/array","dojo/_base/lang","dojo/dom-construct"],function(f,h,k,i,c,g,b,d){return f([h,k,c],{i18nRequirements:[{i18nFile:"./i18n/Indicators.properties"}],cssRequirements:[{cssFile:"./css/Indicators.css"}],templateString:i,propertyToRender:null,postMixInProperties:function a(){this.renderedValue="";if(this.currentItem!=null&&this.propertyToRender!=null&&this.currentItem.node.properties[this.propertyToRender]!=null){this.renderedValue=this.getRenderedProperty(this.currentItem.node.properties[this.propertyToRender])}},postCreate:function e(){if(this.currentItem.indicators&&this.currentItem.indicators.length>0){g.forEach(this.currentItem.indicators,b.hitch(this,"addIndicator"))}},addIndicator:function j(l,o){var q=d.create("div",{"class":"status"},this.containerNode);if(l.action){d.create("a",{"class":"indicator-action","data-action":l.action},q)}var m={};if(l.labelParams!=null){for(var p=0;p<l.labelParams.length;p++){var r=l.labelParams[p].replace(/{/g,"").replace(/}/g,"");if(b.exists(r,this.currentItem)){r=b.getObject(r,false,this.currentItem)}m[p.toString()]=r}}var n=this.message(l.label,m);d.create("img",{src:Alfresco.constants.URL_RESCONTEXT+"components/documentlibrary/indicators/"+l.icon,title:n,alt:l.id},q)}})});