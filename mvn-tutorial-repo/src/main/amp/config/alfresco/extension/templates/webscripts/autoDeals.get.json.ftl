{
"docs" : [
    <#list docsInfoJson as doc>
        {
            "name" : "${doc.name}",
            "size" : ${doc.size},
            "author": "${doc.author}",
            "created date": "${doc.createdDate?datetime}",
            "car": "${doc.car}",
            "carModel": "${doc.carModel}",
            "cost": ${doc.cost},
            "seller": "${doc.seller}",
            "customer": "${doc.customer}"
        }
        <#if doc_has_next>,</#if>
    </#list>
    ]
}