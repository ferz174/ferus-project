@ECHO OFF

rem %~dp0 is the expanded pathname of the current script under NT
set LOCAL_FOP_HOME=
if "%OS%"=="Windows_NT" set LOCAL_FOP_HOME=%~dp0

set FONTDIR=%LOCAL_FOP_HOME%conf\fonts
set LIBDIR=%LOCAL_FOP_HOME%lib
set LOCALCLASSPATH=%LOCAL_FOP_HOME%build\fop.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\avalon-framework.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xml-apis.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xercesImpl.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xalan.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\commons-logging.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\commons-io.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\serializer.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xmlgraphics-commons.jar
java -cp "%LOCALCLASSPATH%" org.apache.fop.fonts.apps.TTFReader %FONTDIR%\%1.ttf %FONTDIR%\%1.xml