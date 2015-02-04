<%--
* Copyright (C) 2005-2010 Alfresco Software Limited.
*
* This file is part of Alfresco
*
* Alfresco is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* Alfresco is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
--%>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="/WEB-INF/alfresco.tld" prefix="a" %>
<%@ taglib uri="/WEB-INF/repo.tld" prefix="r" %>

<%@ page buffer="32kb" contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<h:panelGrid columns="1" cellpadding="2" style="padding-bottom:4px;"
width="100%" rowClasses="wizardSectionHeading">
<h:outputText value="&nbsp;#{msg.expiration_date_header}" escape="false" />
</h:panelGrid>

<h:panelGrid columns="2" cellpadding="2" width="100%" style="margin-left:8px"
columnClasses=",rightHandColumn">
<h:outputText value="#{msg.expire_date_label}:"/>
<a:inputDatePicker id="expire-date" value="#{DialogManager.bean.expirationDate}"
initialiseIfNull="false" style="margin-right: 7px;" showTime="true" />
</h:panelGrid>
