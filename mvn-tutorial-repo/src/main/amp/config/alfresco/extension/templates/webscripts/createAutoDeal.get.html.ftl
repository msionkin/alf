<html>
 <head>
   <title>Upload New Auto Deal</title>
   <link rel="stylesheet" href="${url.context}/css/main.css" TYPE="text/css">
 </head>
 <body>
   <table>
     <tr>
       <td><img src="${url.context}/images/logo/AlfrescoLogo32.png" alt="Alfresco" /></td>
       <td><nobr>Upload New Auto Deal</nobr></td>
     </tr>
     <tr><td><td>Alfresco ${server.edition} v${server.version}
   </table>
   <p>
   <table>
     <form action="${url.service}" method="post" enctype="multipart/form-data" accept-charset="utf-8">
       <tr><td>
       <tr><td>Title:</td><td><input name="title"></td></tr>
       <tr><td>Description:</td><td><input name="desc"></td></tr>
       <tr><td></td></tr>
       <tr><td><input type="submit" name="submit" value="Upload"></td></tr>
     </form>
   </table>
 </body>
</html>