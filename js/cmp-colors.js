class ColorsComponent
{
    constructor(){
        this.template = `
            
        `;
        this.onColorClick = function (colorKey, color) {

        }
    }

    render(){
        let result = '';
        for(const key in McConst.colors){
            const color = McConst.colors[key];

            result += `<div onclick="alert('${key}')" title="${key}" style="background-color: ${color}; display: inline-block; cursor: pointer; width: 18px; height: 18px; margin-right: 4px"></div>`;
        }
        return result;
    }
}