const assert = require('assert');
const fs = require('fs');
const parser = require('../nakoparser');
describe('�p�[�X�ł��Ă��邩�ǂ����̃e�X�g', ()=> {
  fs.readdir(__dirname, (err, filenames) => {
    filenames.filter(f => f.slice(-3) === 'txt').forEach(f => {
      const text = fs.readFileSync(__dirname + '/' + f, 'utf-8')
      it(f, () => {
        parser.parse(text)
      })
    })
    run()
  })
})