(function(){var b=YAHOO.util.Dom,A=YAHOO.util.Selector,H=YAHOO.util.Event;var x=Alfresco.util.encodeHTML,E=Alfresco.util.hasEventInterest,q=Alfresco.util.combinePaths;Alfresco.RuleConfig=function v(I){Alfresco.RuleConfig.superclass.constructor.call(this,"Alfresco.RuleConfig",I,["button"]);this._configDefs={};this._datePickerConfigDefMap={};YAHOO.Bubbling.on("mandatoryControlValueUpdated",this.onDatePickerMandatoryControlValueUpdated,this);return this};var r=Alfresco.RuleConfig;YAHOO.lang.augmentObject(r,{MODE_TEXT:"text",MODE_EDIT:"edit"});YAHOO.extend(Alfresco.RuleConfig,Alfresco.component.Base,{options:{siteId:"",rootNode:null,mode:r.MODE_EDIT,ruleConfigType:null,ruleConfigDefinitionKey:"name",menuMap:[],ruleConfigDefinitions:[],customisationsMap:[],constraints:{},constraintsFilter:{},form:null},_configDefs:null,_datePickerConfigDefMap:null,onReady:function G(){var J=b.get(this.id+"-"+this.options.ruleConfigType+"-checkbox");if(J){H.addListener(J,"click",function(M,L){var K=b.get(this.id+"-configs");if(L.checked){b.removeClass(K,"hidden");this._toggleDisableOnElements(A.query("[param]",K),false);this._toggleDisableOnElements(A.query("select.config-name",K),false)}else{b.addClass(K,"hidden");this._toggleDisableOnElements(A.query("[param]",K),true);this._toggleDisableOnElements(A.query("select.config-name",K),true)}this._updateSubmitElements()},J,this)}var I=b.get(this.id+"-"+this.options.ruleConfigType+"-menubutton");if(I){this.widgets.relationButton=new YAHOO.widget.Button(I,{type:"menu",menu:this.id+"-"+this.options.ruleConfigType+"-menubuttonselect",menualignment:["tr","br"]})}this.widgets.configTemplateEl=b.get(this.id+"-configTemplate");this.widgets.selectTemplateEl=this._createSelectMenu();YAHOO.Bubbling.fire("ruleConfigReady",{eventGroup:this})},getRuleConfigs:function j(){var O=[];if(!b.hasClass(this.id+"-configs","hidden")){var L=A.query("li.config",this.id+"-body"),M,N,J;for(var K=0,I=L.length;K<I;K++){M=L[K];N=this._getSelectedConfigDef(M);if(N){J={};if(M.getAttribute("paramid")){J.id=M.getAttribute("paramid")}J[this.options.ruleConfigDefinitionKey]=N.name;J.parameterValues=this._getParameters(N);O.push(J)}}}return O},displayRuleConfigs:function c(N){b.removeClass(this.id+"-body",r.MODE_EDIT);b.removeClass(this.id+"-body",r.MODE_TEXT);b.addClass(this.id+"-body",this.options.mode);b.get(this.id+"-configs").innerHTML="";var L=b.get(this.id+"-"+this.options.ruleConfigType+"-checkbox");if(L&&this.options.mode==r.MODE_EDIT){b.removeClass(L,"hidden");L.checked=N.length>0}if(!N||N.length==0){if(this.options.mode==r.MODE_TEXT){b.addClass(this.id+"-body","hidden")}else{N.push({});b.addClass(this.id+"-configs","hidden")}}else{b.removeClass(this.id+"-body","hidden");b.removeClass(this.id+"-configs","hidden")}var M,K;for(var J=0,I=N.length;J<I;J++){M=N[J];this._createConfigUI(M,null,null)}this._refreshRemoveButtonState()},onAddExtraParameterIconClick:function w(J,I){this._addExtraParameter(I.paramDef,I.addButton,I.configDef,I.ruleConfig,I.paramRenderer,value)},onDeleteExtraParameterIconClick:function k(J,I){I.parentNode.removeChild(I)},onConfigNameSelectChange:function F(J,I){this._createConfigParameterUI({},I)},onAddConfigButtonClick:function g(I,J){this._createConfigUI({},null,J);this._refreshRemoveButtonState()},onRemoveConfigButtonClick:function l(I,J){J.parentNode.removeChild(J);this._refreshRemoveButtonState();this._updateSubmitElements()},onDatePickerMandatoryControlValueUpdated:function o(J,I){var K=this._datePickerConfigDefMap[I[1].id];if(K){this._updateSubmitElements(K)}},_addExtraParameter:function p(R,P,I,L,J,Q){var M=document.createElement("span");P.parentNode.insertBefore(M,P);if(this.options.mode==r.MODE_TEXT&&R._type!="hidden"){P.parentNode.insertBefore(document.createTextNode(", "),M)}var O=J[this.options.mode],K=O.call(this,M,I,R,L,Q);b.addClass(K,"param");if(this.options.mode==r.MODE_EDIT&&R._type!="hidden"){var N=document.createElement("span");N.setAttribute("title",this.msg("button.deleteExtraParameter",R.displayLabel?R.displayLabel:R.name));b.addClass(N,"delete-extra-parameter-button");N.innerHTML="-";b.setStyle(N,"width","10px");b.setStyle(N,"height","10px");H.addListener(N,"click",this.onDeleteExtraParameterIconClick,M,this);M.appendChild(N)}this._updateSubmitElements(I)},_toggleDisableOnElements:function z(L,I){for(var K=0,J=L.length;K<J;K++){if(I){L[K].setAttribute("disabled",true)}else{L[K].removeAttribute("disabled")}}},_createSelectMenu:function e(S){var U={};var N=Alfresco.util.deepCopy(this.options.menuMap),ab,aa,Y,L,ad,M,ac;for(var I=1;I<=2;I++){for(var X=0,Q=N.length;X<Q;X++){ab=N[X];for(var R=0,Z=ab.length;R<Z;R++){aa=ab[R];for(var J in aa){if(aa.hasOwnProperty(J)){Y=aa[J];L=false;for(var P in Y){if(J!="_menuItems"&&Y.hasOwnProperty(P)&&Y[P].indexOf("*")>-1){L=true;break}}if((I==1&&!L)||(I==2&&L)){if(!aa._menuItems){aa._menuItems=[]}ad=this._getConfigItems(J,Y,S);for(var W=0,V=ad.length;W<V;W++){M=ad[W];ac=M.type+"_"+M.id;if(!U[ac]){aa._menuItems.push(M);U[ac]=true}if(!this._configDefs[ac]){this._configDefs[ac]=M.descriptor}}}}}}}}var T=document.createElement("select"),K,O;T.setAttribute("name","-");b.addClass(T,"config-name");for(X=0,Q=N.length;X<Q;X++){ab=N[X];K=null;for(R=0,Z=ab.length;R<Z;R++){aa=ab[R];ad=aa._menuItems;for(W=0,V=ad.length;W<V;W++){if(!K){K=document.createElement("optgroup");T.appendChild(K)}M=ad[W];O=document.createElement("option");O.setAttribute("value",M.id);O.appendChild(document.createTextNode(M.label));O.setAttribute("rel",M.type);K.appendChild(O)}}}return T},_getConfigItems:function n(O,M,N){var L=[],K;if(O==this.options.ruleConfigType){for(var J=0,I=this.options.ruleConfigDefinitions.length;J<I;J++){K=this.options.ruleConfigDefinitions[J];if(Alfresco.util.objectMatchesPattern(K,M)){L.push({id:K.name,type:this.options.ruleConfigType,label:K.displayLabel||K.name,descriptor:K})}}}else{if(O=="item"){L.push({id:M.id,type:"item",label:this.msg("menu.item."+M.id),descriptor:M})}}return L},_getConstraintValues:function C(N,O){var K=this.options.constraints[N.constraint],M;if(N._constraintFilter){M=Alfresco.util.findValueByDotNotation(this.options.constraintsFilter[N.constraint],N._constraintFilter)}if(!K){K=[]}else{if(M){var I=[];for(var L=0,J=K.length;L<J;L++){if(Alfresco.util.arrayContains(M,K[L].value)){I.push(K[L])}}K=I}}return K},_createConfigUI:function s(L,I,K){var J=this._createConfigNameUI(L,I?I:this.widgets.selectTemplateEl.cloneNode(true),K);this._createConfigParameterUI(L,J);return J},_createConfigNameUI:function t(N,P,J){var O=this.widgets.configTemplateEl.cloneNode(true);Alfresco.util.generateDomId(O);if(J){J.parentNode.insertBefore(O,J.nextSibling)}else{b.get(this.id+"-configs").appendChild(O)}if(!P.getAttribute("id")){Alfresco.util.generateDomId(P)}H.addListener(P,"change",this.onConfigNameSelectChange,O,this);var K=A.query("div.name",O)[0];K.appendChild(P);if(N.id){O.setAttribute("paramid",N.id)}Alfresco.util.setSelectedIndex(P,N[this.options.ruleConfigDefinitionKey]);if(this.options.mode==r.MODE_EDIT){var L=A.query("div.actions .add-config",O,true);var Q=new YAHOO.widget.Button(L,{type:"push"});Q.on("click",this.onAddConfigButtonClick,O,this);Q.addClass("add-config");var R=A.query("div.actions .remove-config",O,true);var M=new YAHOO.widget.Button(R,{type:"push",disabled:true});M.on("click",this.onRemoveConfigButtonClick,O,this);M.addClass("remove-config")}else{if(this.options.mode==r.MODE_TEXT){b.addClass(A.query("div.actions",O,true),"hidden");var I=document.createElement("span");b.addClass(P,"hidden");I.appendChild(document.createTextNode(P.options[P.selectedIndex].text));K.appendChild(I);if(this._getCustomisedMessage(this._getSelectedConfigDef(O),N)){b.addClass(A.query("div.name",O,true),"hidden");b.addClass(A.query("div.parameters",O,true),"hidden")}}}return O},_createConfigParameterUI:function D(N,J){J.removeAttribute("id");var K=A.query("div.parameters",J)[0];var S=this._getSelectedConfigDef(J);if(S){S=Alfresco.util.deepCopy(S);S._id=Alfresco.util.generateDomId(J);var W=A.query("select",J)[0],Q=W.options[W.selectedIndex],V=this._getConfigCustomisation(Q.getAttribute("rel"),S),P=V?V[this.options.mode]:null;if(!P||!(V.manual&&V.manual[this.options.mode])){K.innerHTML=""}if(P){S=P.call(this,S,N,J,K)}if(S&&S.parameterDefinitions){var L,Z,Y;for(var ab=0,T=S.parameterDefinitions.length;ab<T;ab++){L=S.parameterDefinitions[ab];if(L._type=="hidden"&&this.options.mode==r.MODE_TEXT){continue}Z=this._getParamRenderer(L.type);var R=Z[this.options.mode];Y=N.parameterValues?N.parameterValues[L.name]:null;if(!Z||!R){var M=document.createElement("span");b.addClass(M,"error");M.innerHTML=this.msg("label.noRendererForType",L.type);K.appendChild(M);continue}var ac=document.createElement("span");b.addClass(ac,"menutype_"+Q.getAttribute("rel"));b.addClass(ac,"menuname_"+Q.value);b.addClass(ac,"paramtype_"+L.type.replace(":","_"));b.addClass(ac,"paramname_"+L.name);K.appendChild(ac);if(Z.manual&&Z.manual[this.options.mode]){R.call(this,ac,S,L,N,Y)}else{var I;if(L.constraint&&this.options.mode==r.MODE_EDIT){var ae=this._getConstraintValues(L,N);I=this._createSelect(ac,S,L,ae,Y)}else{I=R.call(this,ac,S,L,N,YAHOO.lang.isArray(Y)&&Y.length>0?Y[0]:Y);var X=document.createElement("span");ac.appendChild(X);var aa=YAHOO.lang.isArray(Y)?Y.length:-1;for(var ad=1;ad<aa;ad++){this._addExtraParameter(L,X,S,N,Z,Y[ad])}if(L.isMultiValued&&this.options.mode==r.MODE_EDIT&&L._type!="hidden"){X.setAttribute("title",this.msg("button.addExtraParameter",L.displayLabel?L.displayLabel:L.name));b.addClass(X,"add-extra-parameter-button");X.innerHTML="+";b.setStyle(X,"width","10px");b.setStyle(X,"height","10px");H.addListener(X,"click",this.onAddExtraParameterIconClick,{paramRenderer:Z,paramDef:L,configDef:S,ruleConfig:N,addButton:X},this)}b.addClass(I,"param")}if(L._type!="hidden"){if(L.displayLabel){this._createLabel(L.displayLabel+(L._hideColon?"":":"),I,L._displayLabelToRight)}if(L._unit){var O=document.createElement("span");b.addClass(O,"unit");O.appendChild(document.createTextNode(L._unit));I.parentNode.appendChild(O)}}}}}if(this.options.mode==r.MODE_TEXT){var U=S._customMessageKey?this.msg(S._customMessageKey):undefined;if(U==S._customMessageKey){U=this._getCustomisedMessage(S,N)}if(U){this._renderByCustomisedMessage(J,U)}}}this._updateSubmitElements(S)},_getCustomisedMessage:function a(K){var I="customise."+K.name+"."+this.options.mode,J=this.msg(I);return J!=I?J:null},_renderByCustomisedMessage:function u(O,M){var P=document.createElement("div"),R,N,K,I,Q,L;b.addClass(P,"parameters");O.insertBefore(P,A.query("div.parameters",O,true));if(M){M=M.replace(/''/g,"'")}while(M){R=M.indexOf("{");N=M.indexOf("}");if(R>-1&&N>-1){K=M.substring(0,M.indexOf("{"));I=M.substring(M.indexOf("{")+1,M.indexOf("}"));M=M.substring(M.indexOf("}")+1)}else{K=M;I=null;M=null}if(K){P.appendChild(document.createTextNode(K))}if(I){if(I.indexOf("param.")==0){L=I.substring(I.indexOf(".")+1);Q=A.query("div.parameters span.paramname_"+L+" span",O,true);if(Q){var J=document.createElement("span");J.setAttribute("class",Q.parentNode.getAttribute("class"));b.removeClass(Q,"param");b.addClass(Q,"custom-param");J.appendChild(Q);P.appendChild(J)}}else{if(I==("name")){P.appendChild(A.query("div.name span",O,true))}}}}},_getSelectedConfigDef:function f(J){var L=A.query("select",J)[0];if(L.selectedIndex>-1){var I=L.options[L.selectedIndex];var K=this._configDefs[I.getAttribute("rel")+"_"+I.value];if(K){K._id=J.getAttribute("id");return K}}return null},_getConfigCustomisation:function B(L,I){var O,P,Q,K;for(var N=1;N<=2;N++){for(var M=0,J=this.options.customisationsMap.length;M<J;M++){O=this.options.customisationsMap[M];if(O.hasOwnProperty(L)){P=O[L];if(YAHOO.lang.isArray(P)){Q=P[0];K=this._hasWildcard(P);if((N==1&&!K)||(N==2&&K)){if(Alfresco.util.objectMatchesPattern(I,Q)){return this.customisations[P[1]]}}}}}}return null},_getParamRenderer:function i(I){return this.renderers[I]},_refreshRemoveButtonState:function d(){var L=A.query("li div.actions .remove-config",this.id+"-configs");for(var J=0,I=L.length,K;J<I;J++){K=L[J].getAttribute("id");if(K){YAHOO.widget.Button.getButton(K).set("disabled",J==0&&L.length==1)}}},_hasWildcard:function m(J){for(var I in J){if(J.hasOwnProperty(I)&&J[I]=="*"){return true}}return false},customisations:{},renderers:{"d:any":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:text":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:mltext":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:content":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:int":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[Alfresco.forms.validation.number],K)}},"d:long":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[Alfresco.forms.validation.number],K)}},"d:float":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:double":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:date":{text:function(M,L,I,J,K){return this._createDateSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createDatePicker(M,L,I,[],K,false)}},"d:datetime":{text:function(M,L,I,J,K){return this._createDateSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createDatePicker(M,L,I,[],K,true)}},"d:boolean":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K?this.msg("label.yes"):this.msg("label.no"))},edit:function(M,L,I,J,K){return this._createCheckbox(M,L,I,null,K)}},"d:qname":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:noderef":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[Alfresco.forms.validation.nodeRef],K)}},"d:childassocref":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[Alfresco.forms.validation.nodeRef],K)}},"d:path":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:category":{manual:{edit:true},text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){}},"d:locale":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}},"d:version":{text:function(M,L,I,J,K){return this._createValueSpan(M,L,I,J,K)},edit:function(M,L,I,J,K){return this._createInputText(M,L,I,[],K)}}},_createInputText:function(M,L,J,I,K){if(J._type=="hidden"){return this._createInputOfType(M,L,J,I,K,"hidden")}else{return this._createInputOfType(M,L,J,I,K,"text")}},_createInputOfType:function(M,I,Q,K,P,N){var J=document.createElement("input");J.setAttribute("type",N);J.setAttribute("name","-");J.setAttribute("title",Q.displayLabel?Q.displayLabel:Q.name);J.setAttribute("param",Q.name);J.setAttribute("value",(P!=undefined&&P!=null)?P:"");M.appendChild(J);if(Q.isMandatory){this._addValidation(J,Alfresco.forms.validation.mandatory,I)}for(var L=0,O=K?K.length:0;L<O;L++){this._addValidation(J,K[L],I)}return J},_createLabel:function(L,K,I){if(L&&K){var M=K.getAttribute("id")?K.getAttribute("id"):Alfresco.util.generateDomId(K),J=document.createElement("label");J.setAttribute("for",M);J.appendChild(document.createTextNode(L));if(I){K.parentNode.appendChild(J)}else{K.parentNode.insertBefore(J,K)}return J}},_createSelect:function(O,I,R,K,Q){if(R._type=="hidden"){return this._createInputOfType(O,I,R,[],Q,"hidden")}else{var J=document.createElement("select");YAHOO.util.Dom.addClass(J,"suppress-validation");J.setAttribute("name","-");J.setAttribute("title",R.displayLabel?R.displayLabel:R.name);J.setAttribute("param",R.name);if(R.isMultiValued){J.setAttribute("multiple","true");J.setAttribute("size","3")}if(O){O.appendChild(J)}if(!R.isMandatory||!K||K.length==0){J.appendChild(document.createElement("option"))}if(R.isMandatory){this._addValidation(J,Alfresco.forms.validation.mandatory,I,"change")}if(K){var P,N;for(var M=0,L=K.length;M<L;M++){P=K[M];N=document.createElement("option");N.setAttribute("value",P.value);N.appendChild(document.createTextNode(P.displayLabel?P.displayLabel:P.value));if(P.value==Q){N.setAttribute("selected","true")}J.appendChild(N)}}return J}},_createCheckbox:function(N,M,J,L,K){if(J._type=="hidden"){return this._createInputOfType(N,M,J,[],K,"hidden")}else{var I=document.createElement("input");I.type="checkbox";I.value="";I.setAttribute("name","-");I.setAttribute("title",J.displayLabel?J.displayLabel:J.name);I.setAttribute("param",J.name);if(N){N.appendChild(I)}I.checked=YAHOO.lang.isBoolean(K)?K:false;return I}},_createDatePicker:function(O,I,V,L,U,Y){if(V._type=="hidden"){return this._createInputOfType(O,I,V,[],"hidden")}else{var K=this._createInputOfType(O,I,V,[],U,"hidden"),J=K.getAttribute("id")?K.getAttribute("id"):Alfresco.util.generateDomId(K);O.appendChild(K);var N=document.createElement("span");b.setStyle(N,"position","relative");var R=document.createElement("div"),Q=Alfresco.util.generateDomId(R);b.addClass(R,"datepicker");var W=document.createElement("a");Alfresco.util.setDomId(W,Q+"-icon");var T=document.createElement("img");T.setAttribute("src",Alfresco.constants.URL_RESCONTEXT+"components/form/images/calendar.png");b.addClass(T,"datepicker-icon");W.appendChild(T);var M=document.createElement("input");M.setAttribute("name","-");M.setAttribute("title",V.displayLabel?V.displayLabel:V.name);M.setAttribute("type","text");b.addClass(M,"datepicker-date");Alfresco.util.setDomId(M,Q+"-date");O.appendChild(M);if(Y){var P=document.createElement("input");P.setAttribute("name","-");P.setAttribute("type","text");b.addClass(P,"datepicker-time");Alfresco.util.setDomId(P,Q+"-time");O.appendChild(P)}O.appendChild(W);O.appendChild(N);N.appendChild(R);var X={showTime:Y,mandatory:V.isMandatory,currentValue:(U&&U!="")?U:null};var S=new Alfresco.DatePicker(Q,J).setOptions(X).setMessages({"form.control.date-picker.choose":"","form.control.date-picker.entry.date.format":this.msg("form.control.date-picker.entry.date.format"),"form.control.date-picker.display.date.format":this.msg("form.control.date-picker.display.date.format"),"form.control.date-picker.entry.time.format":this.msg("form.control.date-picker.entry.time.format"),"form.control.date-picker.display.time.format":this.msg("form.control.date-picker.display.time.format")});this._datePickerConfigDefMap[S.id]=I;return K}},_createButton:function(O,N,K,M,L){var I=document.createElement("button");Alfresco.util.generateDomId(I);O.appendChild(I);var J=new YAHOO.widget.Button(I,{type:"button",label:K._buttonLabel});J.on("click",L,{configDef:N,ruleConfig:M,paramDef:K,containerEl:O},this);return J},_createValueSpan:function h(O,I,R,K,Q,N){var J=document.createElement("span");if(Q&&R._type!="hidden"){if(R.constraint){var S=this._getConstraintValues(R,K);for(var M=0,P=S.length;M<P;M++){if(S[M].value==Q){Q=S[M].displayLabel?S[M].displayLabel:Q;break}}}if(R.type="d:noderef"&&R._type=="path"){return this._createPathSpan(O,I,R,this.id+"-"+I._id+"-"+R.name,Q)}else{if(R.type="d:noderef"&&R._type=="category"){return this._createCategorySpan(O,I,R,this.id+"-"+I._id+"-"+R.name,Q)}}if(N){var L=this.msg(N,Q);Q=L!=N?L:Q}J.appendChild(document.createTextNode(Q))}O.appendChild(J);return J},_createDateSpan:function y(M,L,I,J,K,N){K=Alfresco.util.formatDate(Alfresco.util.fromISO8601(K));return this._createValueSpan(M,L,I,J,K,N)},_createCategorySpan:function(M,L,J,N,K){var I=K?Alfresco.constants.PROXY_URI+"api/forms/picker/items":null;return this._createResolvableValueSpan(M,N,Alfresco.util.Ajax.POST,I,{items:[K]},function(O){var P=O.data.items[0];return x(P.name)})},_createPathSpan:function(M,L,J,N,K){var I=document.createElement("span");Alfresco.util.setDomId(I,N);M.appendChild(I);new Alfresco.Location(I).setOptions({siteId:this.options.siteId,rootNode:this.options.rootNode}).displayByNodeRef(K);return I},_createResolvableValueSpan:function(N,P,O,L,J,M){var I=document.createElement("span");Alfresco.util.setDomId(I,P);if(L){I.innerHTML=this.msg("message.loading");var K={method:O,url:L,successCallback:{fn:function(Q,R){R.pathEl.innerHTML=R.displayValueHandler.call(this,Q.json)},obj:{pathEl:I,displayValueHandler:M},scope:this},failureCallback:{fn:function(Q,R){R.pathEl.innerHTML=this.msg("message.failure")},obj:{pathEl:I,displayValueHandler:M},scope:this}};if(J){K.dataObj=J}Alfresco.util.Ajax.jsonRequest(K)}else{I.innerHTML=this.msg("label.none")}N.appendChild(I);return I},_addValidation:function(K,J,M,L,I){var N=J==Alfresco.forms.validation.mandatory||I;if(K&&J&&this.options.form){var P=K.getAttribute("id")?K.getAttribute("id"):Alfresco.util.generateDomId(K),O={configDef:M,me:this,handler:J};this.options.form.addValidation(P,function(W,R,V,U,Q,T){var S=R.handler(W,R,V,U,Q,T);if(!S){YAHOO.util.Dom.addClass(R.configDef._id,"invalid")}else{if(S&&YAHOO.util.Dom.hasClass(R.configDef._id,"invalid")){if(R.me._validateConfigDef(R.configDef)){YAHOO.util.Dom.removeClass(R.configDef._id,"invalid")}}}return S},O,L?L:"keyup",null,{validationType:N?"mandatory":"invalid"});if(!M._validations){M._validations=[]}M._validations.push({fieldId:P,args:O,handler:J})}},_updateSubmitElements:function(I){if(this.options.form){if(I){if(this._validateConfigDef(I)){b.removeClass(I._id,"invalid")}else{b.addClass(I._id,"invalid")}}this.options.form.validate()}},_validateConfigDef:function(M){if(YAHOO.lang.isArray(M._validations)){for(var K=0,J=M._validations.length,I;K<J;K++){I=M._validations[K];var L=b.get(I.fieldId);if(!L.disabled&&!I.handler(L,I.args,"keyup",this,true,null)){return false}}}return true},_getParameters:function(I){var J=A.query("[param]",I._id),N={},K,R,L,T,M;for(var Q=0,S=J.length;Q<S;Q++){K=J[Q];R=K.getAttribute("param");T=this._getParamDef(I,R);L=this._getValue(K,T);if(T){if(T.isMultiValued&&L&&!YAHOO.lang.isArray(L)){L=[L]}if(YAHOO.lang.isArray(L)){for(var O=0,P=L.length;O<P;O++){L[O]=this._convertType(L[O],T.type)}}else{L=this._convertType(L,T.type)}M=N[R];if(YAHOO.lang.isArray(M)){if(YAHOO.lang.isArray(L)){L=M.concat(L)}else{if(L!=null){L=M.push(L)}}}if(R&&L!=undefined&&L!=null){N[R]=L}}}return N},_convertType:function(J,I){if(J){if(Alfresco.util.arrayContains(["d:int","d:long"],I)){return parseInt(J)}else{if(Alfresco.util.arrayContains(["d:float","d:double"],I)){return parseFloat(J)}else{if(Alfresco.util.arrayContains(["d:boolean"],I)){if(J.toLowerCase()=="true"){return true}else{if(J.toLowerCase()=="false"){return false}}}}}}return J},_getValue:function(M){var L=M.tagName.toLowerCase();if(L=="select"){if(M.getAttribute("multiple")!="true"){return M.options[M.selectedIndex].value}else{var J=[];for(var K=0,I=M.options.length;K<I;K++){if(M.options[K].selected){J.push(M.options[K].value)}}return J}}else{if(L=="input"&&(M.type=="checkbox"||M.type=="radio")){if(!M.value||M.value.length==0){return M.checked?"true":"false"}}}return M.value&&M.value.length>0?M.value:null},_getParamDef:function(L,M){if(L.parameterDefinitions){for(var K=0,I=L.parameterDefinitions.length,J;K<I;K++){J=L.parameterDefinitions[K];if(J.name==M){return J}}}if(L.adHocPropertiesAllowed==true){return{}}return null},_setHiddenParameter:function(I,M,P,O){var J=A.query("[param="+P+"]",I._id),U=this._getParamDef(I,P);if(U.isMultiValued&&YAHOO.lang.isArray(O)){for(var R=J.length,K=O.length,T;R>K;R--){T=J.pop();T.parentNode.removeChild(T)}for(var S=0,L=O.length,N,Q=J.length;S<L;S++){if(S>=Q){N=this._getParamRenderer(U.type)[this.options.mode].call(this,J[0].parentNode,I,U,M,O[S]);b.addClass(N,"param")}else{J[S].value=O[S]}}}else{J[0].value=O}},_hideParameters:function(L){if(L){for(var K=0,I=L.length,J;K<I;K++){J=L[K];J._type="hidden"}}},_setParameter:function(J,I,K){if(!J.parameterValues){J.parameterValues={}}J.parameterValues[I]=K}})})();