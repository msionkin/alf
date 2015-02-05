define(["dojo/_base/declare","alfresco/core/Core","alfresco/documentlibrary/_AlfDocumentListTopicMixin","dojo/_base/lang"],function(e,b,c,a){return e([b,c],{i18nScope:"Alfresco.DocListToolbar",i18nRequirements:[{i18nFile:"../../../WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/documentlibrary/toolbar.get.properties"}],constructor:function h(j){a.mixin(this,j);this.alfSubscribe("ALF_CURRENT_NODEREF_CHANGED",a.hitch(this,"handleCurrentNodeChange"));this.alfSubscribe("ALF_SHOW_UPLOADER",a.hitch(this,"showUploader"));this.alfSubscribe("ALF_CREATE_NEW_FOLDER",a.hitch(this,"createNewFolder"))},_currentNode:null,handleCurrentNodeChange:function d(j){if(j&&j.node){this.alfLog("log","Updating current nodeRef to: ",j.node);this._currentNode=j.node}else{this.alfLog("error","A request was made to update the current NodeRef, but no 'node' property was provided in the payload: ",j)}},showUploader:function g(k){var j={destination:this._currentNode.parent.nodeRef,filter:[],mode:3,thumbnails:"doclib",onFileUploadComplete:{fn:this.uploadComplete,scope:this}};Alfresco.util.ComponentManager.findFirst("Alfresco.DNDUpload").show(j)},uploadComplete:function f(j){},createNewFolder:function i(p){var j=this._currentNode.parent.nodeRef;var l=function q(r,s){Dom.get(s.id+"-dialogTitle").innerHTML=this.message("label.new-folder.title");Dom.get(s.id+"-dialogHeader").innerHTML=this.message("label.new-folder.header")};var o=YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT+"components/form?itemKind={itemKind}&itemId={itemId}&destination={destination}&mode={mode}&submitType={submitType}&formId={formId}&showCancelButton=true",{itemKind:"type",itemId:"cm:folder",destination:j,mode:"create",submitType:"json",formId:"doclib-common"});var m=new Alfresco.module.SimpleDialog(this.id+"-createFolder");m.setOptions({width:"33em",templateUrl:o,actionUrl:null,destroyOnHide:true,doBeforeDialogShow:{fn:l,scope:this},onSuccess:{fn:function n(s){var t;var u=s.config.dataObj.prop_cm_name;var r=s.json.persistedObject;YAHOO.Bubbling.fire("folderCreated",{name:u,parentNodeRef:j});this.alfPublish(this.reloadDataTopic,{});Alfresco.util.PopupManager.displayMessage({text:this.message("message.new-folder.success",{"0":u})})},scope:this},onFailure:{fn:function k(r){if(r){var s=r.config.dataObj.prop_cm_name;Alfresco.util.PopupManager.displayMessage({text:this.message("message.new-folder.failure",{"0":s})})}else{Alfresco.util.PopupManager.displayMessage({text:this.message("message.failure")})}},scope:this}}).show()}})});