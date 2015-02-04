(function(){var g=YAHOO.util.Dom,m=YAHOO.util.Event,c=YAHOO.util.Element,b=YAHOO.util.KeyListener;Alfresco.module.CreateSite=function(p){var o=Alfresco.util.ComponentManager.get(this.id);if(o!==null){throw new Error("An instance of Alfresco.module.CreateSite already exists.")}Alfresco.module.CreateSite.superclass.constructor.call(this,"Alfresco.module.CreateSite",p,["button","container","connection","selector","json"]);return this};YAHOO.extend(Alfresco.module.CreateSite,Alfresco.component.Base,{show:function f(){if(this.widgets.panel){this._showPanel()}else{Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"modules/create-site",dataObj:{htmlid:this.id},successCallback:{fn:this.onTemplateLoaded,scope:this},execScripts:true,failureMessage:"Could not load create site template"})}},onTemplateLoaded:function j(q){var w=document.createElement("div");w.innerHTML=q.serverResponse.responseText;var r=g.getFirstChild(w);this.widgets.panel=Alfresco.util.createYUIPanel(r);this.widgets.cancelButton=Alfresco.util.createYUIButton(this,"cancel-button",this.onCancelButtonClick);this.widgets.okButton=Alfresco.util.createYUIButton(this,"ok-button",null,{type:"submit"});this.widgets.siteVisibility=g.get(this.id+"-visibility");this.widgets.isPublic=g.get(this.id+"-isPublic");this.widgets.isModerated=g.get(this.id+"-isModerated");this.widgets.isPrivate=g.get(this.id+"-isPrivate");m.addListener(this.widgets.isPublic,"change",this.onVisibilityChange,this.widgets.isPublic,this);m.addListener(this.widgets.isPrivate,"change",this.onVisibilityChange,this.widgets.isPrivate,this);var s=new Alfresco.forms.Form(this.id+"-form");this.widgets.form=s;var t=g.get(this.id+"-title"),v=g.get(this.id+"-shortName");s.addValidation(t,Alfresco.forms.validation.mandatory,null,"keyup",this.msg("validation-hint.mandatory"));s.addValidation(t,Alfresco.forms.validation.length,{max:256,crop:true},"keyup");m.addListener(t,"keyup",function p(){if(!this.shortNameEdited){v.value=this.safeURL(t.value).substring(0,72);s.validate()}},this,true);this.shortNameEdited=false;s.addValidation(v,Alfresco.forms.validation.mandatory,null,"keyup",this.msg("validation-hint.mandatory"));s.addValidation(v,Alfresco.forms.validation.regexMatch,{pattern:/^[ ]*[0-9a-zA-Z\-]+[ ]*$/},"keyup",this.msg("validation-hint.siteName"));s.addValidation(v,Alfresco.forms.validation.length,{max:72,crop:true},"keyup");m.addListener(v,"keyup",function x(){this.shortNameEdited=v.value.length>0},this,true);s.addValidation(this.id+"-description",Alfresco.forms.validation.length,{max:512,crop:true},"keyup");var o=g.get(this.id+"-sitePreset");m.addListener(o,"change",function u(){this.onSitePresetChange(o.options[o.selectedIndex].value)},this,true);if(o.options.length>0){this.onSitePresetChange(o.options[o.selectedIndex].value)}s.setSubmitElements(this.widgets.okButton);s.doBeforeFormSubmit={fn:this.doBeforeFormSubmit,obj:null,scope:this};s.setAJAXSubmit(true,{successCallback:{fn:this.onCreateSiteSuccess,scope:this},failureCallback:{fn:this.onCreateSiteFailure,scope:this}});s.setSubmitAsJSON(true);s.applyTabFix();s.doBeforeAjaxRequest={fn:this.doBeforeAjaxRequest,scope:this};s.init();this._showPanel()},onSitePresetChange:function(o){},doBeforeAjaxRequest:function h(o){return true},doBeforeFormSubmit:function(q,r){var p=g.get(this.id+"-form");p.attributes.action.nodeValue=Alfresco.constants.URL_SERVICECONTEXT+"modules/create-site";this.widgets.cancelButton.set("disabled",true);var o="PUBLIC";if(this.widgets.isPublic.checked){if(this.widgets.isModerated.checked){o="MODERATED"}}else{o="PRIVATE"}this.widgets.siteVisibility.value=o;this.widgets.panel.hide();this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.creating",this.name),spanClass:"wait",displayTime:0})},safeURL:function l(o){o=YAHOO.lang.trim(o.replace(/[^0-9a-zA-Z\-\s]/g,""));o=o.replace(/\s+/g,"-").toLowerCase();return o},onVisibilityChange:function a(p,o){new c(this.widgets.isModerated).set("disabled",o==this.widgets.isPrivate)},onCancelButtonClick:function d(p,o){try{g.get(this.id+"-title").value="";g.get(this.id+"-shortName").value="";g.get(this.id+"-description").value="";g.get(this.id+"-sitePreset").selectedIndex=0;g.get(this.id+"-isPublic").checked="checked";g.get(this.id+"-isModerated").checked="";g.get(this.id+"-isModerated").disabled=false}catch(q){}this.widgets.panel.hide()},onCreateSiteSuccess:function e(p){if(p.json!==undefined&&p.json.success){var q=new Alfresco.service.Preferences(),o=p.config.dataObj.shortName;q.favouriteSite(o,{successCallback:{fn:function r(){document.location.href=Alfresco.constants.URL_PAGECONTEXT+"site/"+o+"/dashboard"}}})}else{this._adjustGUIAfterFailure(p)}},onCreateSiteFailure:function i(o){this._adjustGUIAfterFailure(o)},_adjustGUIAfterFailure:function n(o){this.widgets.feedbackMessage.destroy();this.widgets.cancelButton.set("disabled",false);this.widgets.panel.show();var q=Alfresco.util.message("message.failure",this.name);if(o.serverResponse.status===403){if(o.json.message){q=Alfresco.util.message(o.json.message,this.name)}else{q=Alfresco.util.message("error.noPermissions",this.name)}}else{if(o.json.message){var p=Alfresco.util.message(o.json.message,this.name);q=p?p:q}}Alfresco.util.PopupManager.displayPrompt({title:Alfresco.util.message("message.failure",this.name),text:q})},_showPanel:function k(){this.widgets.form.reset();this.widgets.panel.show();Alfresco.util.caretFix(this.id+"-form");if(!this.widgets.escapeListener){this.widgets.escapeListener=new b(document,{keys:b.KEY.ESCAPE},{fn:function(p,o){this.onCancelButtonClick()},scope:this,correctScope:true});this.widgets.escapeListener.enable()}g.get(this.id+"-title").focus()}})})();Alfresco.module.getCreateSiteInstance=function(){var a="alfresco-createSite-instance";return Alfresco.util.ComponentManager.get(a)||new Alfresco.module.CreateSite(a)};