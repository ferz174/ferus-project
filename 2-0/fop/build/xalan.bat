@ECHO OFF

set LIBDIR=lib
set LOCALCLASSPATH=build/fop.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xml-apis.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xercesImpl.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%LIBDIR%\xalan.jar
java -cp %LOCALCLASSPATH% org.apache.xalan.xslt.Process %1 %2 %3 %4 %5 %6 %7 %8