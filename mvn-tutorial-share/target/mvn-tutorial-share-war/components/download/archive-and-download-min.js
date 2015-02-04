(function(){var i=YAHOO.util.Dom,e=YAHOO.util.Element,d=YAHOO.util.KeyListener,o=YAHOO.util.Event;var h=Alfresco.util.encodeHTML;Alfresco.getArchiveAndDownloadInstance=function(){var s="Alfresco.ArchiveAndDownload";var r=Alfresco.util.ComponentManager.findFirst(s);return r};Alfresco.ArchiveAndDownload=function(r){Alfresco.ArchiveAndDownload.superclass.constructor.call(this,"Alfresco.ArchiveAndDownload",r,["button","container"]);return this};YAHOO.extend(Alfresco.ArchiveAndDownload,Alfresco.component.Base,{panel:null,_currentArchiveNodeURL:"",_currentArchiveName:"",onReady:function g(){i.removeClass(this.id+"-dialog","hidden");this.panel=Alfresco.util.createYUIPanel(this.id+"-dialog");this.panel.hideEvent.subscribe(this.onCancelButtonClick,null,this);this.widgets.cancelOkButton=Alfresco.util.createYUIButton(this,"cancelOk-button",this.onCancelButtonClick);this.widgets.escapeListener=new d(document,{keys:d.KEY.ESCAPE},{fn:this.onCancelButtonClick,scope:this,correctScope:true})},updateProgress:function c(t){var s=t.done.replace(/,/g,"");var u=t.total.replace(/,/g,"");var r=(s/u);var v=(-300+(r*300));i.setStyle(this.id+"-aggregate-progress-span","left",v+"px");i.get(this.id+"-file-count-span").innerHTML=this.msg("file.status",t.filesAdded,t.totalFiles)},archiveProgressSuccess:function q(r){if(r.json){if(r.json.status=="PENDING"){var s=this;this._getProgressTimeout=window.setTimeout(function(){s.getArchivingProgress()},250)}else{if(r.json.status=="IN_PROGRESS"){this.updateProgress(r.json);var s=this;this._getProgressTimeout=window.setTimeout(function(){s.getArchivingProgress()},250)}else{if(r.json.status=="DONE"){this.updateProgress(r.json);this.handleArchiveComplete()}else{if(r.json.status=="MAX_CONTENT_SIZE_EXCEEDED"){Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.maxContentSizeExceeded",Alfresco.util.formatFileSize(r.json.done),Alfresco.util.formatFileSize(r.json.total,2))});this.panel.hide()}else{if(r.json.status=="CANCELLED"){}else{Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.unknown.progress")});this.panel.hide()}}}}}}},archiveProgressFailure:function k(r){var v=this,s=6,u=5000,t=r.config.failureCount||0;if(t<s){Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.archive.progress.failed")});this._getProgressTimeout=window.setTimeout(function(){v.getArchivingProgress(++t)},u)}else{this.panel.hide();Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.download.failed")})}},deleteDownload:function b(){Alfresco.util.Ajax.jsonDelete({url:Alfresco.constants.PROXY_URI+"api/internal/downloads/"+this._currentArchiveNodeURL})},getArchivingProgress:function m(r){if(this._currentArchiveNodeURL!=null&&this._currentArchiveNodeURL!=""){Alfresco.util.Ajax.jsonGet({url:Alfresco.constants.PROXY_URI+"api/internal/downloads/"+this._currentArchiveNodeURL+"/status",responseContentType:"application/json",successCallback:{fn:this.archiveProgressSuccess,scope:this},failureCallback:{fn:this.archiveProgressFailure,scope:this},failureCount:r})}},archiveInitReqSuccess:function p(r){if(r.json&&r.json.nodeRef){var s=Alfresco.util.NodeRef(r.json.nodeRef);this._currentArchiveNodeURL=s.storeType+"/"+s.storeId+"/"+s.id;this.getArchivingProgress()}},archiveInitReqFailure:function f(r){Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.archive.request.failed")});this.panel.hide()},requestArchive:function j(r){Alfresco.util.Ajax.jsonPost({url:Alfresco.constants.PROXY_URI+"api/internal/downloads",responseContentType:"application/json",dataObj:r,successCallback:{fn:this.archiveInitReqSuccess,scope:this},failureCallback:{fn:this.archiveInitReqFailure,scope:this}})},handleArchiveComplete:function j(){this.widgets.cancelOkButton.set("disabled",false);this.panel.hide();var s=document.createElement("form");s.method="GET";s.action=Alfresco.constants.PROXY_URI+"api/node/content/"+this._currentArchiveNodeURL+"/"+this._currentArchiveName;document.body.appendChild(s);var t=s.ownerDocument;var r=t.createElement("iframe");r.style.display="none";YAHOO.util.Dom.generateId(r,"downloadArchive");r.name=r.id;document.body.appendChild(r);window.frames[r.name].name=r.name;s.target=r.name;s.submit()},show:function l(r){if(r.nodesToArchive){this._resetGUI();this.widgets.escapeListener.enable();this.panel.setFirstLastFocusable();this.panel.show();if(r.archiveName&&r.archiveName!=""){this._currentArchiveName=r.archiveName+".zip"}else{this._currentArchiveName="Archive.zip"}this.requestArchive(r.nodesToArchive)}else{Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.invalid.arguments")})}},_resetGUI:function a(){this.widgets.cancelOkButton.set("disabled",false);this._currentArchiveNodeURL="";i.setStyle(this.id+"-aggregate-progress-span","left","-300px");i.get(this.id+"-file-count-span").innerHTML=""},onCancelButtonClick:function n(){this.deleteDownload();window.clearTimeout(this._getProgressTimeout);this.panel.hide();this.widgets.escapeListener.disable()}})})();