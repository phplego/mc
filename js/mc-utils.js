class McUtils {

    /**
     * Parse standard ini file content
     * @param data
     */
    static parseINIString(data)
    {
        const regex = {
            section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
            param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
            comment: /^\s*#.*$/
        };
        const value = {};
        const lines = data.split(/[\r\n]+/);
        let section = null;
        lines.forEach(function(line){
            let match;
            if(regex.comment.test(line)){
                return;
            }else if(regex.param.test(line)){
                match = line.match(regex.param);
                if(section){
                    value[section][match[1]] = match[2];
                }else{
                    value[match[1]] = match[2];
                }
            }else if(regex.section.test(line)){
                match = line.match(regex.section);
                value[match[1]] = {};
                section = match[1];
            }else if(line.length === 0 && section){
                section = null;
            }
        });
        return value;
    }
}