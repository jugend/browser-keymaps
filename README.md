#browser-keymaps

[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) script to support mapping keys with custom functions.
Support leader key, inspired by [vim](http://www.vim.org/) key map.

## Example

```js
var LEADER = ',';

var KEY_MAPS = {
    'a': submitForm
};

function submitForm() {
  if (document.forms[0]) {
    document.forms[0].submit();
  }
}
```

Pressing `, a` will trigger submitForm function.
