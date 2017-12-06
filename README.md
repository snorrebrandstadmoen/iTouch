BAKGRUNN
============
https://open.bekk.no/erfaringer-fra-testdrevet-javascript

https://www.youtube.com/embed/kXEiXN3ezFI?rel=0&hd=1&iv_load_policy=3&modestbranding=0&showinfo=0&vq=hd720

INSTALLASJON
============

1. npm install
2. node app.js
3. localhost:8080

Js Test Driver, Jasmine-Adapter, Jasmine, Sinon
-----------------------------------------------
Alle TDD-relaterte JavaScript-bibliotek som er nødvendige ligger i lib-mappen.

*For reference:*

* http://code.google.com/p/js-test-driver/
* https://github.com/ibolmo/jasmine-jstd-adapter
* http://pivotal.github.com/jasmine
* http://sinonjs.org/

JstdUtil
-------------
I tillegg kan det være fornuftig å laste ned "jstdutil" - JS Test Driver Util. 
Dette verktøyet lar deg kjøre kommandoene "jstestdriver" og "autotest" fra kommandolinja
Krever Ruby installert.

Sjekk siden: http://cjohansen.no/en/javascript/jstdutil_a_ruby_wrapper_over_jstestdriver
<pre>
sudo gem update --system
sudo gem install gemcutter
sudo gem install jstdutil

export JSTESTDRIVER_HOME=(mappe JsTestDriver-jar'en ligger i, ligger i ./lib/js-test-driver)
</pre>

Node.js
-------------
Node må installeres. Dette gjøres enkelt med homebrew på Mac:
brew install node

Eller f.eks for Windows: http://nodejs.org/#download

Now.js
-------------
TODO
<pre>
npm install now -g
</pre>

Jasmine-node
-------------
TODO
 - https://github.com/mhevery/jasmine-node

DOKUMENTASJON
=============

JS Test Driver
--------------
Hvordan funker det:
  
* http://code.google.com/p/js-test-driver/wiki/DesignPrinciples

Bruk:
  
* http://code.google.com/p/js-test-driver/wiki/GettingStarted#Writing_configuration_file

Jasmine
-------------
Bruk:
  
* https://github.com/pivotal/jasmine/wiki
	
Sinon
-------------
Bruk:
  
* http://sinonjs.org/docs/

