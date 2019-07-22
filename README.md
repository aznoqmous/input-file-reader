# Input File Reader
_Easy file read in js_

## How to use
1. Bind your file input to a new InputFileReader instance
1. Provide a `onLoaded` callback
1. Chill !

```js
new InputFileReader({
  input: inputFile
})
.onFileSelect((file)=>{ /* Do some stuff*/ })
.onProgress((res)=>{
  console.log(res.loaded, res.total, res.percent)
})
.onLoaded((fileContent)=>{console.log(fileContent)})
```
