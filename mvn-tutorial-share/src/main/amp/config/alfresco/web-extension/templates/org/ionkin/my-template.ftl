<#include "../alfresco/include/alfresco-template.ftl" />
<#include "../alfresco/include/documentlibrary.inc.ftl" />
<@templateHeader>
   <@markup id="location-hash">
   <@documentLibraryJS />
   </@>
   <@markup id="resizer">
   <script type="text/javascript">//<![CDATA[
      new Alfresco.widget.Resizer("Repository");
   //]]></script>
   </@>
   <@script type="text/javascript" src="${url.context}/res/modules/documentlibrary/doclib-actions.js"></@script>
</@>

<@templateBody>
   <@markup id="alf-hd">
   <div id="alf-hd">
      <@region scope="global" id="share-header" chromeless="true"/>
   </div>
   </@>
   <@markup id="bd">
   <div id="bd">
      <@region id="actions-common" scope="template" />

      <div class="yui-t1" id="alfresco-repository">
         <div id="yui-main">
            <div class="yui-b" id="alf-content">
               <@region id="documentlist_v2" scope="template" />
            </div>
         </div>
      </div>

      <@region id="file-upload" scope="template" />
   </div>
   <@region id="doclib-custom" scope="template"/>
   </@>
</@>

<@templateFooter>
   <@markup id="alf-ft">
   <div id="alf-ft">
      <@region id="footer" scope="global" />
   </div>
   </@>
</@>