

class McTpl
{
    constructor(){
    }

    render(template, variables){
        const result = template.replace(/{{(.+?)}}/g, function(match, contents, offset, input_string)
        {
            const parts = contents.split('.');
            if(parts.length === 2){
                const section = parts[0];
                const key = parts[1];
                if(section in variables){
                    if(key in variables[section]){
                        return variables[section][key];
                    }
                }
            }
            console.log('key ' + contents + 'not found');
            return '';
        });
        return result;
    }

}