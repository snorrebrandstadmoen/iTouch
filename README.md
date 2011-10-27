__INSTALLASJON__

*Js Test Driver, Jasmine-Adapter, Jasmine, Sinon*
Alle TDD-relaterte JavaScript-bibliotek som er nødvendige ligger i lib-mappen.

For reference:
http://code.google.com/p/js-test-driver/
https://github.com/ibolmo/jasmine-jstd-adapter
http://pivotal.github.com/jasmine
http://sinonjs.org/

*JstdUtil*
I tillegg kan det være fornuftig å laste ned "jstdutil" - JS Test Driver Util. 
Dette verktøyet lar deg kjøre kommandoene "jstestdriver" og "autotest" fra kommandolinja
Krever Ruby installert.

1. ** JS Test Driver Util jstdutil **
Sjekk siden: http://cjohansen.no/en/javascript/jstdutil_a_ruby_wrapper_over_jstestdriver

sudo gem update --system
sudo gem install gemcutter
sudo gem install jstdutil

export JSTESTDRIVER_HOME=(mappe JsTestDriver-jar'en ligger i, ligger i ./lib/js-test-driver)

*Node.js*
Node må installeres. Dette gjøres enkelt med homebrew på Mac:
brew install node

Eller f.eks for Windows: http://nodejs.org/#download

*Now.js*
TODO
npm install now -g

*Jasmine-node*
TODO
https://github.com/mhevery/jasmine-node


__DOKUMENTASJON__
*JS Test Driver*
Hvordan funker det: 
	http://code.google.com/p/js-test-driver/wiki/DesignPrinciples
Bruk:
	http://code.google.com/p/js-test-driver/wiki/GettingStarted#Writing_configuration_file

*Jasmine*
Bruk:
	https://github.com/pivotal/jasmine/wiki
	
*Sinon*
Bruk:
	http://sinonjs.org/docs/

