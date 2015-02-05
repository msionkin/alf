define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/DropAndPreview.html","alfresco/core/Core","dojo/_base/lang","dojo/_base/array","dijit/registry","dojo/dnd/Source","dojo/dnd/Target","dojo/dom-construct","dojo/dom-class","dojo/aspect","alfresco/creation/WidgetDragWrapper","dojo/on"],function(u,j,g,v,k,w,d,e,n,t,c,h,o,r,i){return u([j,g,k],{cssRequirements:[{cssFile:"./css/DropAndPreview.css"}],i18nRequirements:[{i18nFile:"./i18n/DropAndPreview.properties"}],templateString:v,previewTarget:null,postCreate:function q(){this.previewTarget=new n(this.previewNode,{accept:["widget"],creator:w.hitch(this,"creator"),withHandles:true});o.after(this.previewTarget,"onMouseDown",w.hitch(this,"onWidgetSelected"),true);o.after(this.previewTarget,"insertNodes",w.hitch(this,"publishAvailableFields"),true);this.alfSubscribe("ALF_UPDATE_RENDERED_WIDGET",w.hitch(this,"updateItem"));this.alfSubscribe("ALF_REQUEST_AVAILABLE_FORM_FIELDS",w.hitch(this,"publishAvailableFields"));i(this.previewNode,"onWidgetDelete",w.hitch(this,"deleteItem"))},getAvailableFields:function m(){var A=[];for(var y in this.previewTarget.map){var z=this.previewTarget.map[y];var B=w.getObject("data.data.defaultConfig.name",false,z),x=w.getObject("data.data.defaultConfig.fieldId",false,z);A.push({label:B,value:x})}return A},getWidgetDefinitions:function l(){var x=[];for(var y in this.previewTarget.map){var z=this.previewTarget.map[y];x.push({name:z.data.data.module,config:z.data.data.defaultConfig})}return x},publishAvailableFields:function p(){var x={};x.options=this.getAvailableFields();this.alfLog("log","Publishing available fields:",x,this);this.alfPublish("ALF_FORM_FIELDS_UPDATE",x)},deleteItem:function f(x){this.alfLog("log","Delete widget request detected",x);if(x.target!=null&&x.target.id!=null&&this.previewTarget.getItem(x.target.id)!=null&&x.widgetToDelete!=null){x.widgetToDelete.destroyRecursive(false);this.previewTarget.delItem(x.target.id);if(this.previewTarget.getAllNodes().length==0){h.remove(this.previewNode,"containsItems")}this.alfPublish("ALF_CLEAR_CONFIGURE_WIDGET",{});this.publishAvailableFields()}},updateItem:function s(A){this.alfLog("log","Update item request",A);var z=w.clone(A.originalConfig);for(var y in A.updatedConfig){w.setObject(y,A.updatedConfig[y],z.data.defaultConfig)}for(var x=0;x<z.data.configWidgets.length;x++){z.data.configWidgets[x].config.value=A.updatedConfig[z.data.configWidgets[x].config.name]}this.alfSetData(z.data.defaultConfig.fieldId+".name",A.updatedConfig.name+"");d.forEach(this.previewTarget.getSelectedNodes(),function(C,B){var D=e.byNode(C);if(D){D.destroyRecursive(true)}},this);this.previewTarget.insertNodes(false,[z],true,A.node);this.previewTarget.deleteSelectedNodes();this.publishAvailableFields()},creator:function a(B,D){this.alfLog("log","Creating",B,D);var A=c.create("div");if(B.data.module!=null&&B.data.module!=""){var C=w.clone(B);var x=(C.data.defaultConfig!=null)?C.data.defaultConfig:{};if(x.fieldId===undefined){x.fieldId=this.generateUuid()}var z=[{name:B.data.module,config:x}];var y=new r({pubSubScope:this.pubSubScope,widgets:z},A);this.alfSetData(x.fieldId+".name",C.data.defaultConfig.name+"")}h.add(this.previewNode,"containsItems");return{node:y.domNode,data:C,type:["widget"]}},onWidgetSelected:function b(z){var A=this.previewTarget.getSelectedNodes();if(A.length>0&&A[0]!=null){var x=this.previewTarget.getItem(A[0].id);this.alfLog("log","Widget selected",x);var y={selectedNode:A[0],selectedItem:x.data};this.alfPublish("ALF_CONFIGURE_WIDGET",y)}}})});