INSTALLASJON
============
Js Test Driver, Jasmine-Adapter, Jasmine, Sinon
-----------------------------------------------
Alle TDD-relaterte JavaScript-bibliotek som er nødvendige ligger i lib-mappen.

*For reference:*
http://code.google.com/p/js-test-driver/
https://github.com/ibolmo/jasmine-jstd-adapter
http://pivotal.github.com/jasmine
http://sinonjs.org/

h2. JstdUtil
I tillegg kan det være fornuftig å laste ned "jstdutil" - JS Test Driver Util. 
Dette verktøyet lar deg kjøre kommandoene "jstestdriver" og "autotest" fra kommandolinja
Krever Ruby installert.

Sjekk siden: http://cjohansen.no/en/javascript/jstdutil_a_ruby_wrapper_over_jstestdriver
<pre>
sudo gem update --system
sudo gem install gemcutter
sudo gem install jstdutil
</pre>
export JSTESTDRIVER_HOME=(mappe JsTestDriver-jar'en ligger i, ligger i ./lib/js-test-driver)

h2. Node.js
Node må installeres. Dette gjøres enkelt med homebrew på Mac:
brew install node

Eller f.eks for Windows: http://nodejs.org/#download

h2. Now.js
TODO
<pre>
npm install now -g
</pre>

h2. Jasmine-node
TODO
https://github.com/mhevery/jasmine-node

h1. DOKUMENTASJON

h2. JS Test Driver
Hvordan funker det:
* http://code.google.com/p/js-test-driver/wiki/DesignPrinciples
Bruk:
* http://code.google.com/p/js-test-driver/wiki/GettingStarted#Writing_configuration_file

h2. Jasmine
Bruk:
* https://github.com/pivotal/jasmine/wiki
	
h2. Sinon
Bruk:
* http://sinonjs.org/docs/

