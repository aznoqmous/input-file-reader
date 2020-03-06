export default class InputFileReader{
    constructor(config){
        this.config = Object.assign({
            input: null, // must be declared on class instantiation
            decimals: 0,
            utf8: false,

            // callbacks
            onChange: null,
            onFileSelect: null,
            onProgress: null,
            onLoaded: null
        }, config)

        this.bind()
    }

    bind(){
        if(!this.config.input) console.warn('no input !')
        this.config.input.addEventListener('change', (e)=>{
            if(this.config.onChange) this.config.onChange(e.target)
            if(e.target.files.length) {
                this.handleFileSelect(e.target.files[e.target.files.length-1])
            }
        })
    }

    handleFileSelect(f){
        let proceed = true
        if(this.config.onFileSelect) proceed = this.config.onFileSelect(f)
        if(proceed === false) return false

        this.readFile(f)
    }

    readFile(file){
        let reader = new FileReader()
        reader.onprogress = (e)=>{
            if(this.config.onProgress) this.config.onProgress({
                loaded: e.loaded,
                total: e.total,
                percent: Math.floor(e.loaded / e.total * Math.pow(10, this.config.decimals + 2) ) * 100 / Math.pow(10, this.config.decimals + 2) + '%'
            })
        }
        reader.onloadend = (e)=>{
            if (e.target.readyState == FileReader.DONE) {
                if(this.config.onLoaded) this.config.onLoaded(e.srcElement.result)
            }
        }
        if(this.config.utf8) reader.readAsText(file)
        else reader.readAsBinaryString(file)
    }

    onChange(callback){
        this.config.onChange = callback
        return this
    }
    onFileSelect(callback){
        this.config.onFileSelect = callback
        return this
    }
    onProgress(callback){
        this.config.onProgress = callback
        return this
    }
    onLoaded(callback){
        this.config.onLoaded = callback
        return this
    }

}
