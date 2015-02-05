{"docs" : [
    <#list docsInfoJson as doc>
        {
            "name" : "${doc.name}",
            "size" : ${doc.size},
            "author": "${doc.author}",
            "created date": "${doc.createdDate?datetime}"
        }
        <#if doc_has_next>,</#if>
    </#list>
    ]
}