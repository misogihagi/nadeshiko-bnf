var __varslist = this.__varslist = [{}, {}, {}];
var __vars = this.__varslist[2];
var __self = this;
var __module = {};
this.__varslist[0]["!PluginSystem:初期化"]=function (sys) {
      sys.__v0['ナデシコバージョン'] = '3.0.69'
      // システム関数を探す
      sys.__getSysValue = function (name, def) {
        if (sys.__v0[name] === undefined) {return def}
        return sys.__v0[name]
      }
      // 全ての関数・変数を見つけて返す
      sys.__findVar = function (nameStr, def) {
        if (typeof nameStr === 'function') {return nameStr}
        for (let i = sys.__varslist.length - 1; i >= 0; i--) {
          let scope = sys.__varslist[i]
          if (scope[nameStr]) {return scope[nameStr]}
        }
        return def
      }
      // システム関数を実行する(エイリアスを実装するのに使う)
      sys.__exec = function (func, params) {
        const f = sys.__findVar(func)
        if (!f) {throw new Error('システム関数でエイリアスの指定ミス:' + func)}
        return f.apply(this, params)
      }
      // システム変数の値を変更する
      sys.__setVar = function (name, value) {
        sys.__v0[name] = value
      }
      // 前回設定したタイマーが実行中ならクリア
      if (sys.__timeout) {
        for (const t of sys.__timeout) { clearTimeout(t) }
      }
      sys.__timeout = []
      if (sys.__interval) {
        for (const t of sys.__interval) { clearInterval(t) }
      }
      sys.__interval = []
    };
this.__varslist[0]["!PluginNode:初期化"]=function (sys) {
      const path = require('path')
      sys.__getBinPath = (tool) => {
        let fpath = tool
        if (process.platform === 'win32')
          {if (!fileExists(tool)) {
            const nodeDir = path.dirname(process.argv[0])
            const root = path.resolve(path.join(nodeDir, '..'))
            fpath = path.join(root, 'bin', tool + '.exe')
            if (fileExists(fpath)) {return `"${fpath}"`}
            return tool
          }}

        return fpath
      }
      sys.__getBokanPath = () => {
        let nakofile
        const cmd = path.basename(process.argv[1])
        if (cmd.indexOf('cnako3') < 0)
          {nakofile = process.argv[1]}
         else
          {nakofile = process.argv[2]}

        return path.dirname(path.resolve(nakofile))
      }
      sys.__v0['コマンドライン'] = process.argv
      sys.__v0['ナデシコランタイムパス'] = process.argv[0]
      sys.__v0['ナデシコランタイム'] = path.basename(process.argv[0])
      sys.__v0['母艦パス'] = sys.__getBokanPath()
      sys.__v0['AJAX:ONERROR'] = null
    };
this.__varslist[0]["開"]=function (s) {
      return fs.readFileSync(s, 'utf-8')
    };
this.__varslist[0]["正規表現置換"]=function (s, a, b) {
      let re
      let f = a.match(/^\/(.+)\/([a-zA-Z]*)/)
      if (f === null)
        {re = new RegExp(a, 'g')}
       else
        {re = new RegExp(f[1], f[2])}

      return String(s).replace(re, b)
    };
this.__varslist[0]["JSONデコード"]=function (s) {
      return JSON.parse(s)
    };
this.__varslist[0]["正規表現マッチ"]=function (a, b, sys) {
      let re
      let f = b.match(/^\/(.+)\/([a-zA-Z]*)$/)
      if (f === null)  // パターンがない場合
        {re = new RegExp(b, 'g')}
       else
        {re = new RegExp(f[1], f[2])}

      const sa = sys.__varslist[0]['抽出文字列'] = []
      const m = String(a).match(re)
      let result = m
      if (re.global) {
        // no groups
      } else
        if (m)
          // has group?
          {if (m.length > 0) {
            result = m[0]
            for (let i = 1; i < m.length; i++) {sa[i - 1] = m[i]}
          }}

      return result
    };
this.__varslist[0]["文字抜出"]=function (s, a, cnt) {
      cnt = cnt ? cnt : undefined
      return (String(s).substr(a - 1, cnt))
    };
this.__varslist[0]["何文字目"]=function (s, a) {
      return String(s).indexOf(a) + 1
    };
this.__varslist[0]["LEFT"]=function (s, cnt) {
      return (String(s).substr(0, cnt))
    };
this.__varslist[0]["文字数"]=function (v) {
      if (!Array.from) {return String(v).length}
      return Array.from(v).length
    };
this.__varslist[0]["置換"]=function (s, a, b) {
      return String(s).split(a).join(b)
    };
this.__varslist[0]["区切"]=function (s, a) {
      return ('' + s).split('' + a)
    };
this.__varslist[0]["表示"]=function (s, sys) {
      if (!sys.silent){ console.log(s) }
      sys.__varslist[0]['表示ログ'] += (s + '\n')
    };
this.__varslist[0]["空白除去"]=function (s) {
      s = String(s).replace(/^\s+/, '').replace(/\s+$/, '')
      return s
    };
this.__varslist[0]["配列追加"]=function (a, b) {
      if (a instanceof Array) { // 配列ならOK
        a.push(b)
        return a
      }
      throw new Error('『配列追加』で配列以外の処理。')
    };
this.__varslist[0]["配列カスタムソート"]=function (f, a, sys) {
      let ufunc = f
      if (typeof f === 'string') {
        ufunc = sys.__findVar(f)
        if (!ufunc) { throw new Error('関数『' + f + '』が見当たりません。') }
      }
      if (a instanceof Array) {
        return a.sort(ufunc)
      }
      throw new Error('『配列カスタムソート』で配列以外が指定されました。')
    };
this.__varslist[0]["保存"]=function (s, f) {
      // Buffer?
      if (s instanceof String)
        {fs.writeFileSync(f, s, 'utf-8')}
       else
        {fs.writeFileSync(f, s)}

    };
const __v0 = this.__v0 = this.__varslist[0];
const __v1 = this.__v1 = this.__varslist[1];
__v0.line=0;// プラグインの初期化
__v0["!PluginSystem:初期化"](__self);
__v0["!PluginNode:初期化"](__self);
__vars["それ"] = '';
;__v0.line=0;__vars["テキスト"]=(function(){ const tmp=__vars["それ"]=__v0["開"](((__varslist[0]["母艦パス"] +""+ "/") +""+ "../bnf.txt"),__self); return tmp;; }).call(this);
; __v0.line=1;// 
;__v0.line=1;__vars["テキスト"]=(function(){ /*[sore]*/const tmp=__vars["それ"]=__v0["正規表現置換"](__vars["それ"],"\"(\\$)%","'$1'",__self); return tmp;; }).call(this);
; __v0.line=2;// 
;__v0.line=2;__vars["テキスト"]=(function(){ /*[sore]*/const tmp=__vars["それ"]=__v0["正規表現置換"](__vars["それ"],",(?!')"," ",__self); return tmp;; }).call(this);
; __v0.line=3;// 
;__v0.line=3;__vars["テキスト"]=(function(){ /*[sore]*/const tmp=__vars["それ"]=__v0["正規表現置換"](__vars["それ"],"\\|(?!')","/",__self); return tmp;; }).call(this);
; __v0.line=4;// 
;__v0.line=4;__vars["テキスト"]=(function(){ /*[sore]*/const tmp=__vars["それ"]=__v0["正規表現置換"](__vars["それ"],"(?<!')~","!",__self); return tmp;; }).call(this);
; __v0.line=5;// 
; __v0.line=6;// 
;__v0.line=6;__vars["設定"]=(function(){(function(){ const tmp=__vars["それ"]=__v0["開"](((__varslist[0]["母艦パス"] +""+ "/") +""+ "../pegjson.json"),__self); return tmp;; }).call(this);
; return (function(){ const tmp=__vars["それ"]=__v0["JSONデコード"](__vars["それ"]/*?:6*/,__self); return tmp;; }).call(this)}).call(this);
; __v0.line=7;// 
__v0.line=7;let $nako_foreach_v1=(function(){ const tmp=__vars["それ"]=__v0["正規表現マッチ"](__vars["テキスト"],"//;.*? ",__self); return tmp;; }).call(this);
for (let $nako_i1 in $nako_foreach_v1){
__v0["対象"] = __vars["それ"] = $nako_foreach_v1[$nako_i1];
__v0["対象キー"] = $nako_i1;
; __v0.line=8;// 
;__v0.line=8;__vars["対象文字列"]=(function(){ const tmp=__vars["それ"]=__v0["文字抜出"](__varslist[0]["対象"],4,null,__self); return tmp;; }).call(this);
; __v0.line=9;// 
;__v0.line=9;__vars["インデックス"]=(function(){ const tmp=__vars["それ"]=__v0["何文字目"](__vars["対象文字列"],"[",__self); return tmp;; }).call(this);
; __v0.line=10;// 
;__v0.line=10;__vars["添字"]=(function(){ const tmp=__vars["それ"]=__v0["文字抜出"](__vars["対象文字列"],(parseFloat(__vars["インデックス"]) + parseFloat(1)),1,__self); return tmp;; }).call(this);
; __v0.line=11;// 
__v0.line=11;if ((__vars["インデックス"] > 0)) {
  ; __v0.line=12;// 
;__v0.line=12;__vars["対象文字列"]=(function(){ const tmp=__vars["それ"]=__v0["LEFT"](__vars["対象文字列"],__vars["インデックス"],__self); return tmp;; }).call(this);
; __v0.line=13;// 
(function(){ const tmp=__vars["それ"]=__v0["文字数"](__vars["対象文字列"],__self); return tmp;; }).call(this); __v0.line=14;// 
(function(){ const tmp=__vars["それ"]=__v0["LEFT"](__vars["対象文字列"],(parseFloat(__vars["それ"]/*?:14*/) - parseFloat(1)),__self); return tmp;; }).call(this); __v0.line=15;// 
;__v0.line=15;__vars["tmp"]=__vars["設定"][__vars["それ"]/*?:15*/];
; __v0.line=16;// 
;__v0.line=16;__vars["テキスト"]=(function(){ const tmp=__vars["それ"]=__v0["置換"](__vars["テキスト"],__varslist[0]["対象"],__vars["tmp"][__vars["添字"]],__self); return tmp;; }).call(this);
; __v0.line=17;// 

}else {; __v0.line=18;// 
(function(){ const tmp=__vars["それ"]=__v0["文字数"](__vars["対象文字列"],__self); return tmp;; }).call(this); __v0.line=19;// 
(function(){ const tmp=__vars["それ"]=__v0["LEFT"](__vars["対象文字列"],(parseFloat(__vars["それ"]/*?:19*/) - parseFloat(1)),__self); return tmp;; }).call(this); __v0.line=20;// 
;__v0.line=20;__vars["tmp"]=__vars["設定"][__vars["それ"]/*?:20*/];
; __v0.line=21;// 
;__v0.line=21;__vars["テキスト"]=(function(){ const tmp=__vars["それ"]=__v0["置換"](__vars["テキスト"],__varslist[0]["対象"],__vars["tmp"],__self); return tmp;; }).call(this);
; __v0.line=22;// 
};
;
; __v0.line=23;// 

};
; __v0.line=24;// 
; __v0.line=25;// 
;__v0.line=25;__vars["n"]=0;
; __v0.line=26;// 
;__v0.line=26;__vars["辞書"]={};
; __v0.line=27;// 
__v0.line=27;let $nako_foreach_v3=(function(){ const tmp=__vars["それ"]=__v0["正規表現マッチ"](__vars["テキスト"],".*=.*//@([a-zA-Z]+)",__self); return tmp;; }).call(this);
for (let $nako_i3 in $nako_foreach_v3){
__v0["対象"] = __vars["それ"] = $nako_foreach_v3[$nako_i3];
__v0["対象キー"] = $nako_i3;
; __v0.line=28;// //初期化文が欲しい
(function(){ const tmp=__vars["それ"]=__v0["正規表現置換"](__vars["それ"]/*?:28*/,"=.*//@","//＠",__self); return tmp;; }).call(this);
(function(){ /*[sore]*/const tmp=__vars["それ"]=__v0["区切"](__vars["それ"],"//＠",__self); return tmp;; }).call(this);
;__v0.line=28;__vars["ペア"]=__vars["それ"];
; __v0.line=29;// 
__v0.line=29;let $nako_foreach_v2=__vars["辞書"];
for (let $nako_i2 in $nako_foreach_v2){
__v0["対象"] = __vars["それ"] = $nako_foreach_v2[$nako_i2];
__v0["対象キー"] = $nako_i2;
; __v0.line=30;// 
__v0.line=30;if ((__varslist[0]["対象キー"] == __vars["ペア"][0])) {
  ; __v0.line=31;// 
__v0["表示"]((("" +""+ __vars["ペア"][0]) +""+ "が重複"),__self);
; __v0.line=32;// 

};
; __v0.line=33;// 
__v0.line=33;if ((__varslist[0]["対象"] == __vars["ペア"][1])) {
  ; __v0.line=34;// 
__v0["表示"]((("" +""+ __vars["ペア"][1]) +""+ "が重複"),__self);
; __v0.line=35;// 

};
; __v0.line=36;// 

};
; __v0.line=37;// 
__v0.line=37;__vars["辞書"][(function(){ const tmp=__vars["それ"]=__v0["空白除去"](__vars["ペア"][0],__self); return tmp;; }).call(this)] = __vars["ペア"][1];
; __v0.line=38;// 
;__v0.line=38;__vars["n"]=(parseFloat(__vars["n"]) + parseFloat(1));
; __v0.line=39;// 

};
; __v0.line=40;// 
;__v0.line=40;__vars["単語リスト"]=[];
; __v0.line=41;// 
__v0.line=41;let $nako_foreach_v4=__vars["辞書"];
for (let $nako_i4 in $nako_foreach_v4){
__v0["対象"] = __vars["それ"] = $nako_foreach_v4[$nako_i4];
__v0["対象キー"] = $nako_i4;
; __v0.line=42;// 
(function(){ const tmp=__vars["それ"]=__v0["配列追加"](__vars["単語リスト"],__varslist[0]["対象キー"],__self); return tmp;; }).call(this); __v0.line=43;// 

};
; __v0.line=44;// 
; __v0.line=45;// 
(function(){ const tmp=__vars["それ"]=__v0["配列カスタムソート"]((function(){
try {
  __vars = {'それ':''};
  __varslist.push(__vars);
  __vars['引数'] = arguments;
  __vars['a'] = arguments[0];
  __vars['b'] = arguments[1];
; __v0.line=46;// 
;__v0.line=46;__vars["c"]=(function(){ const tmp=__vars["それ"]=__v0["文字数"](__vars["a"],__self); return tmp;; }).call(this);
; __v0.line=47;// 
;__v0.line=47;__vars["d"]=(function(){ const tmp=__vars["それ"]=__v0["文字数"](__vars["b"],__self); return tmp;; }).call(this);
; __v0.line=48;// 
;__v0.line=48;__vars["それ"]=(parseFloat(__vars["d"]) - parseFloat(__vars["c"]));
; __v0.line=49;// 

  return (__vars["それ"]);
  } finally {
    __varslist.pop(); __vars = __varslist[__varslist.length-1];
  }
}),__vars["単語リスト"],__self); return tmp;; }).call(this);
; __v0.line=49;// 
; __v0.line=50;// 
__v0.line=50;let $nako_foreach_v5=__vars["単語リスト"];
for (let $nako_i5 in $nako_foreach_v5){
__v0["対象"] = __vars["それ"] = $nako_foreach_v5[$nako_i5];
__v0["対象キー"] = $nako_i5;
; __v0.line=51;// 
; __v0.line=52;// # テキストの「(?<!')｛それ｝(?!')」を辞書@それで正規表現置換してテキストへ代入
(function(){ const tmp=__vars["それ"]=__v0["正規表現置換"](__vars["テキスト"],(("" +""+ __vars["それ"]/*?:52*/) +""+ "(?=[ +*?\\)\\n\\r])"),__vars["辞書"][__vars["それ"]/*?:52*/],__self); return tmp;; }).call(this);
;__v0.line=52;__vars["テキスト"]=__vars["それ"];
; __v0.line=53;// 

};
; __v0.line=53;// 
; __v0.line=54;// 
; __v0.line=55;// 
; __v0.line=56;// 
; __v0.line=57;// 
;__v0.line=57;__vars["テキスト"]=(("Start = __ プログラム:プログラム __ { return プログラム; }" +""+ __varslist[0]["改行"]) +""+ __vars["テキスト"]);
; __v0.line=58;// 
;__v0.line=58;__vars["テキスト"]=((__vars["設定"]["0"] +""+ __varslist[0]["改行"]) +""+ __vars["テキスト"]);
; __v0.line=59;// 
__v0["保存"](__vars["テキスト"],((__varslist[0]["母艦パス"] +""+ "/") +""+ "../peg.txt"),__self);
; __v0.line=60;// 
; __v0.line=61;// 
; __v0.line=62;// 
; __v0.line=62;// ---
