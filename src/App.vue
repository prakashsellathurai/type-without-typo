<template>
  <div id="app">
    <h1 align="center">
      Type Without Typo
      <span
        ><img src="android-icon-48x48.png" style="vertical-align: top"
      /></span>
    </h1>
    <div id="intro"></div>
    <prism-editor
      v-model="code"
      :emitEvents="true"
      language="python"
      :line-numbers="lineNumbers"
      class="editor"
    />
  </div>
</template>

<script>
import PrismEditor from "vue-prism-editor";
import Tribute from "tributejs";
import { readFile } from "fs";
let timer;

var speller = {};
speller.train = function (text) {
  var word,
    m,
    r = /[a-z]+/g;
  text = text.toLowerCase();
  while ((m = r.exec(text)) != null) {
    word = m[0];
    speller.nWords[word] = speller.nWords.hasOwnProperty(word)
      ? speller.nWords[word] + 1
      : 1;
  }
};
speller.correct = function (word) {
  if (speller.nWords.hasOwnProperty(word)) return word;
  var candidates = {},
    list = speller.edits(word);
  list.forEach(function (edit) {
    if (speller.nWords.hasOwnProperty(edit))
      candidates[speller.nWords[edit]] = edit;
  });
  if (speller.countKeys(candidates) > 0)
    return candidates[speller.max(candidates)];
  list.forEach(function (edit) {
    speller.edits(edit).forEach(function (w) {
      if (speller.nWords.hasOwnProperty(w)) candidates[speller.nWords[w]] = w;
    });
  });
  return speller.countKeys(candidates) > 0
    ? candidates[speller.max(candidates)]
    : word;
};

speller.nWords = {};

// A helper function that counts the keys in the supplied object.
speller.countKeys = function (object) {
  var attr,
    count = 0;
  for (attr in object) {
    if (object.hasOwnProperty(attr)) count++;
  }
  return count;
};

// A helper function that returns the word with the most occurences in the language
// model, among the supplied candidates.
speller.max = function (candidates) {
  var candidate,
    arr = [];
  for (candidate in candidates) {
    if (candidates.hasOwnProperty(candidate)) arr.push(candidate);
  }
  return Math.max.apply(null, arr);
};

speller.letters = "abcdefghijklmnopqrstuvwxyz".split("");

// A function that returns the set of possible corrections of the specified word.
// The edits can be deletions, insertions, alterations or transpositions.
speller.edits = function (word) {
  var i,
    results = [];
  // deletion
  for (i = 0; i < word.length; i++) {
    results.push(word.slice(0, i) + word.slice(i + 1));
  } // transposition
  for (i = 0; i < word.length - 1; i++) {
    results.push(
      word.slice(0, i) +
        word.slice(i + 1, i + 2) +
        word.slice(i, i + 1) +
        word.slice(i + 2)
    );
  } // alteration
  for (i = 0; i < word.length; i++) {
    speller.letters.forEach(function (l) {
      results.push(word.slice(0, i) + l + word.slice(i + 1));
    });
  } // insertion
  for (i = 0; i <= word.length; i++) {
    speller.letters.forEach(function (l) {
      results.push(word.slice(0, i) + l + word.slice(i));
    });
  }
  return results;
};
readFile("./big.txt", "ascii", function (err, data) {
  if (err) throw err;
  speller.train(data);
});

var tribute = new Tribute({
  // trigger: " ",
  values: (text, callback) => {
    clearTimeout(timer);
    timer = setTimeout(requestValues, 370, text, callback);
  },
  allowSpaces: true,
  replaceTextSuffix: "",
  positionMenu: true,
  autocompleteMode: true,
});

let requestValues = async (text, callback) => {
  let fulltext = document
    .getElementsByClassName("prism-editor__code")[0]
    .textContent.trimRight("\n");

  let values = [
    { key: speller.correct(fulltext), value: speller.correct(fulltext) },
  ];

  callback(values);
};

export default {
  name: "App",
  data() {
    return {
      code: null,
      lineNumbers: true,
      language: "python",
    };
  },
  mounted() {
    tribute.attach(document.getElementsByClassName("prism-editor__code"));
  },
  components: {
    PrismEditor,
  },
  methods: {
    // change:  (code) => {
    // }
  },
};
</script>

<style>
.editor {
  height: 60vh !important;
}
#intro {
  font-size: 13pt;
  color: #311258;
}
#intro a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
#intro a:hover {
  text-decoration: underline;
}
#intro b {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
#app {
  max-width: 94%;
  margin: 80px auto 0 auto;
}
body {
  background: linear-gradient(to right, #a146fc, #3f5efb);
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Helvetica Neue", "Arial", sans-serif;
}
.v-tribute {
  width: 100%;
}
.tribute-container {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #3f5efb;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
