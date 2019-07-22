import InputFileReader from './input-file-reader'

document.addEventListener('DOMContentLoaded', ()=>{
  new InputFileReader({
    input: inputFile
  })
  .onLoaded((fileContent)=>{console.log(fileContent)})
  .onProgress((res)=>{
    console.log(res.loaded, res.total, res.percent)
  })
})
