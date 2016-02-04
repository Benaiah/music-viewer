echo "BABELIZE SERVER CODE"
babel ./src/index.es --out-file ./index.js

echo "BABELIZE CLIENT CODE"
babel ./app/src -d ./app/assets/

echo "WEBPACK"
webpack ./app/assets/app.js ./app/assets/bundle.js

echo "STYLUS"
stylus ./app/stylus --out ./app/assets
