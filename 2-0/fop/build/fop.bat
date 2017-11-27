@ECHO OFF

rem %~dp0 is the expanded pathname of the current script under NT
set LOCAL_FOP_HOME=
if "%OS%"=="Windows_NT" set LOCAL_FOP_HOME=%~dp0

set LIBDIR=%LOCAL_FOP_HOME%lib
set LOCALCLASSPATH=%LOCAL_FOP_HOME%build\fop.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xml-apis.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xercesImpl.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xalan.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\batik.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\avalon-framework.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\jimi.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\jai_core.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\jai_codec.jar
java -cp "%LOCALCLASSPATH%" org.apache.fop.apps.Fop %1 %2 %3 %4 %5 %6 %7 %8