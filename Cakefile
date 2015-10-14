coffee = require 'coffee-script'
fs = require 'fs'

task 'build', 'Build project from src/ into lib/ and test/', ->
  source = fs.readFileSync 'src/youku.coffee', 'utf8'
  fs.writeFileSync 'lib/youku.js', coffee.compile source
  console.log 'youku.coffee compiled to JS...'

  source = fs.readFileSync 'src/test.coffee', 'utf8'
  fs.writeFileSync 'test/test.js', coffee.compile source
  console.log 'test.coffee compiled to JS...'
