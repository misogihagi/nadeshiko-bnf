## [なでしこ](https://github.com/kujirahand/nadesiko3)用の自主フォーマットBNFおよびpegjs
自分の頭に思い浮かべているなでしこです。
最初antlr用に書いていたのですが今は放置気味。
その影響でpegjsのパースする部分(bnf.txt)とオブジェクトを返すjavascriptの部分(pegjson.json)が分かれています。

### コマンド
> npm run bnf2peg

bnfからpegjs用のフォーマットに置換されます。

> npm run peg2js

pegjs用のフォーマットからパーサーを生成します。

> npm run bnf2js

上記二つのコマンドを実行します。つまり、bnfからパーサーを生成します。


