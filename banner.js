const { readFileSync, writeFileSync } = require('fs');

var code = '#!/usr/bin/env node\n';
code += readFileSync('dist/main.js').toString('utf-8');
writeFileSync('dist/main.js', code, 'utf-8');
