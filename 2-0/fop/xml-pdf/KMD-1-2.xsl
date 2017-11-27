<?xml version="1.0" encoding="windows-1251"?>
<xsl:stylesheet version ="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"	xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xalan="http://xml.apache.org/xalan" xmlns:counter="bitel.billing.server.util.exslt.Counter">
<xsl:decimal-format name="weight"/>
	<xsl:template match="�����">
		<fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
			<fo:layout-master-set>
				<fo:simple-page-master master-name="page_1" page-height="297mm" page-width="210mm" margin-top="5mm" margin-bottom="5mm" margin-left="20mm" margin-right="5mm">
					<fo:region-start extent="0mm"/>
					<fo:region-before extent="30mm"/>
					<fo:region-body margin-top="24mm" margin-bottom="55mm" margin-left="0mm" margin-right="5mm"/>
					<fo:region-after region-name="stamp_1" extent="55mm"/>
				</fo:simple-page-master>
				<fo:simple-page-master master-name="page_2" page-height="297mm" page-width="210mm" margin-top="5mm" margin-bottom="5mm" margin-left="20mm" margin-right="5mm">
					<fo:region-start extent="0mm"/>
					<fo:region-before extent="30mm"/>
					<fo:region-body margin-top="24mm" margin-bottom="55mm" margin-left="0mm" margin-right="5mm"/>
					<fo:region-after region-name="stamp_2" extent="55mm"/>
				</fo:simple-page-master>
				<fo:page-sequence-master master-name="content">
				 	<fo:single-page-master-reference master-reference="page_1"/>
      				<fo:repeatable-page-master-reference master-reference="page_2"/>
				</fo:page-sequence-master>
			</fo:layout-master-set>
			
			<fo:page-sequence master-reference="content" initial-page-number="1">
				<fo:static-content flow-name="stamp_standard">
					<fo:table>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="70mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="20mm"/>
						<fo:table-body>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" number-columns-spanned="4" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="18pt" text-align="center">
										<xsl:value-of select="normalize-space(@�����)"/>-<xsl:value-of select="normalize-space(��������/@������)"/>-<xsl:value-of select="normalize-space(��������/@��������)"/>.<fo:page-number/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-columns-spanned="4" border-right-width="0.25mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="3" number-columns-spanned="4" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="10pt" text-align="center">
										<xsl:value-of select="@�����"/>
									</fo:block>
									<fo:block font-family="gost_bi" font-style="italic" font-size="10pt" text-align="center">
										<xsl:value-of select="@���"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm" border-width="0.5mm">
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid"  border-left-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										���.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										���.��.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										����
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										N ���.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										����.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										����
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										����������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@��������������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_dev.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="3" border-bottom-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="10pt" text-align="center">
										<xsl:value-of select="@������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										����
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										������
									</fo:block>
									</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@��������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_check.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid"  number-rows-spanned="2" >
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										�
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" >
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<xsl:value-of select="normalize-space(��������/@��������)"/>.<fo:page-number/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										���
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@���"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_check.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��. ������.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@��������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_check.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-rows-spanned="3"  border-top-width="0.5mm" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<!--����� ������ (�����������)-->
										<!----><xsl:value-of select="��������/@��������"/><!---->
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-rows-spanned="3" number-columns-spanned="3">
									<fo:block font-family="gost_bi" font-style="italic" font-size="18pt" text-align="center">
										<!----><fo:external-graphic height="10mm" src="file:\\tsms\2-0\fop\img\logo.jpg"/><!---->
										<!--<xsl:value-of select="@�����������"/>-->
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										�. �����.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_check.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:static-content>

				<fo:static-content flow-name="stamp_1">
					<fo:table>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="20mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="70mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="20mm"/>
						<fo:table-body>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="3" number-columns-spanned="4" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="18pt" text-align="center">
										<xsl:value-of select="normalize-space(@�����)"/>-<xsl:value-of select="normalize-space(��������/@������)"/>-<xsl:value-of select="normalize-space(��������/@�����)"/>-<fo:page-number/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-columns-spanned="4" border-right-width="0.25mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-columns-spanned="4" border-right-width="0.25mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" number-columns-spanned="4" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="10pt" text-align="center">
										<xsl:value-of select="@�����"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-columns-spanned="4" border-right-width="0.25mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm" border-width="0.5mm">
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid"  border-left-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										���.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										���.��.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										�������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										����
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="3" border-bottom-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="10pt" text-align="center">
										<xsl:value-of select="@������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										����
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										������
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��. ������.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@��������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_main_dr.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid"  number-rows-spanned="2" >
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										�
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" >
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<xsl:value-of select="normalize-space(��������/@�����)"/>-<fo:page-number/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<fo:page-number-citation ref-id="theEnd"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										���. ��<xsl:value-of select="@���������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@�������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_chief_office.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										����. ������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<!--<xsl:value-of select="@����������"/>-->
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_dev.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-rows-spanned="3"  border-top-width="0.5mm" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<xsl:value-of select="��������/@��������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-rows-spanned="3" number-columns-spanned="3">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="14mm" src="file:\\tsms\2-0\fop\img\logo.jpg"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@����"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_checked.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@�������������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_dev.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:static-content>
				
				<fo:static-content flow-name="stamp_2">
					<fo:table>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="20mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="10mm"/>
						<fo:table-column column-width="70mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="15mm"/>
						<fo:table-column column-width="20mm"/>
						<fo:table-body>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-top-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="3" number-columns-spanned="4" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="18pt" text-align="center">
										<xsl:value-of select="normalize-space(@�����)"/>-<xsl:value-of select="normalize-space(��������/@������)"/>-<xsl:value-of select="normalize-space(��������/@�����)"/>-<fo:page-number/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-columns-spanned="4" border-right-width="0.25mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-columns-spanned="4" border-right-width="0.25mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" number-columns-spanned="4" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="10pt" text-align="center">
										<xsl:value-of select="@�����"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-columns-spanned="4" border-right-width="0.25mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm" border-width="0.5mm">
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid"  border-left-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										���.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										���.��.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										�������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center">
										����
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="3" border-bottom-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="10pt" text-align="center">
										<xsl:value-of select="@������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										����
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="center" start-indent="1mm">
										������
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��. ������.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@��������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_main_dr.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid"  number-rows-spanned="2" >
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										�
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" >
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<xsl:value-of select="normalize-space(��������/@�����)"/>-<fo:page-number/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" number-rows-spanned="2" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<fo:page-number-citation ref-id="theEnd"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										���. ��<xsl:value-of select="@���������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@�������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_chief_office.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										����. ������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<!--<xsl:value-of select="@����������"/>-->
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_dev.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-rows-spanned="3"  border-top-width="0.5mm" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										<xsl:value-of select="��������/@��������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-rows-spanned="3" number-columns-spanned="3">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="14mm" src="file:\\tsms\2-0\fop\img\logo.jpg"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@����"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_checked.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="5mm">
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" number-columns-spanned="2" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="8pt" text-align="left" start-indent="0.5mm">
										<xsl:value-of select="@�������������"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="7pt" text-align="center">
										 <fo:external-graphic height="4mm" width="8mm" src="file:\\tsms\2-0\fop\img\sign_dev.jpg"/>
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:static-content>
				
				<fo:static-content flow-name="xsl-region-start">
					<fo:block-container border-width="0.5mm" border-style="solid" position="absolute" top="0mm" left="0mm" width="185mm" height="287mm"/>
					<fo:table>
						<fo:table-column column-width="18mm"/>
						<fo:table-column column-width="55mm"/>
						<fo:table-column column-width="12mm"/>
						<fo:table-column column-width="25mm"/>
						<fo:table-column column-width="25mm"/>
						<fo:table-column column-width="20mm"/>
						<fo:table-column column-width="30mm"/>
						<fo:table-body>
							<fo:table-row height="14mm">
								<fo:table-cell display-align="center" number-columns-spanned="7" border-style="solid" border-width="0.5mm" border-left-width="0.25mm" border-right-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="16pt" text-align="center">
										<xsl:value-of select="��������/@��������"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row height="10mm">
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-top-width="0.25mm" border-left-width="0.25mm">
									<fo:block  font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center">
										�����
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-top-width="0.25mm">
									<fo:block  font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center">
										��������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-top-width="0.25mm">
									<fo:block  font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										���.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-top-width="0.25mm">
									<fo:block  font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										��� ��.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-top-width="0.25mm">
									<fo:block  font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" start-indent="1mm">
										��� ���.
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-top-width="0.25mm">
									<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center">
										������
									</fo:block>
								</fo:table-cell>
								<fo:table-cell display-align="center" border-width="0.5mm" border-style="solid" border-top-width="0.25mm" border-right-width="0.25mm">
									<fo:block  font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center">
										����������
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:static-content>

				<fo:flow flow-name="xsl-region-body">
					<fo:table>
						<fo:table-column column-width="18mm"/>
						<fo:table-column column-width="55mm"/>
						<fo:table-column column-width="12mm"/>
						<fo:table-column column-width="25mm"/>
						<fo:table-column column-width="25mm"/>
						<fo:table-column column-width="20mm"/>
						<fo:table-column column-width="30mm"/>
						<fo:table-body>
							<xsl:for-each select="���������">
								<xsl:for-each select="�����">
									<fo:table-row height="8mm">
										<fo:table-cell border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
											<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" space-before="2.6mm">
												<xsl:value-of select="@�����"/>
											</fo:block>
										</fo:table-cell>
										<fo:table-cell border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
											<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="left" space-before="2.6mm" start-indent="1mm">
												<xsl:value-of select="@��������"/>
											</fo:block>
										</fo:table-cell>
										<fo:table-cell border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
											<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" space-before="2.6mm" start-indent="1mm">
												<xsl:value-of select="@����������"/>
											</fo:block>
										</fo:table-cell>
										<fo:table-cell border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
											<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="right" space-before="2.6mm" end-indent="1mm">
												<xsl:value-of select="format-number(@���*0.001, '#####0.0#')"/>
											</fo:block>
										</fo:table-cell>
										<fo:table-cell border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
											<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="right" space-before="2.6mm" end-indent="1mm">
												<xsl:value-of select="format-number(@���*@����������*0.001, '#####0.0#')"/>
											</fo:block>
										</fo:table-cell>
										<fo:table-cell border-width="0.25mm" border-style="solid" border-right-width="0.5mm">
											<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" space-before="2.6mm">
											<xsl:value-of select="normalize-space(������/@�����)"/>-<xsl:value-of select="normalize-space(������/@����)"/>
											</fo:block>
										</fo:table-cell>
										<fo:table-cell border-width="0.25mm" border-style="solid">
											<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="left" space-before="2.6mm">
												<xsl:value-of select="@����������"/>
											</fo:block>
										</fo:table-cell>
									</fo:table-row>
								</xsl:for-each>
								
								<fo:table-row height="8mm">
									<fo:table-cell border-width="0.5mm" border-style="solid" border-right-width="0.5mm" border-left-width="0.25mm" number-columns-spanned="4">
										<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" space-before="2.6mm">
											�����:
										</fo:block>
									</fo:table-cell>
									<fo:table-cell border-width="0.5mm" border-style="solid" border-right-width="0.5mm">
										<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="right" space-before="2.6mm" end-indent="1mm">
											<xsl:value-of select="format-number(����/@����*0.001, '#####0.0#')"/>
										</fo:block>
									</fo:table-cell>
									<fo:table-cell border-width="0.5mm" border-style="solid" border-right-width="0.25mm" number-columns-spanned="2">
										<fo:block font-family="gost_bi" font-style="italic" font-size="12pt" text-align="center" space-before="2.6mm">
										</fo:block>
									</fo:table-cell>
								</fo:table-row>
								
							</xsl:for-each>
						</fo:table-body>
					</fo:table>					
					<fo:block  id="theEnd"></fo:block>
				</fo:flow>

				</fo:page-sequence>	
		</fo:root>
	</xsl:template>	
</xsl:stylesheet>
