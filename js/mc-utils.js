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


    /**
     * convert colors from rgbXXX, grayXX and dictionary color names to web #XXXXXX format
     * @param mcColor
     * @return {*}
     */
    static parseMcColor(mcColor)
    {
        if(mcColor in McConst.colors)
            return McConst.colors[mcColor];

        if(mcColor.toLowerCase().startsWith('rgb')){
            // $r = str_pad(dechex(round(255 * $key{3} / 5)), 2, STR_PAD_LEFT);
            const r = Math.round(255 * mcColor[3] / 5).toString(16).padStart(2, '0');
            const g = Math.round(255 * mcColor[4] / 5).toString(16).padStart(2, '0');
            const b = Math.round(255 * mcColor[5] / 5).toString(16).padStart(2, '0');
            return '#' + r + g + b;
        }

        if(mcColor.toLowerCase().startsWith('gray')){
            const number = mcColor.substring(4);
            return McConst.colors['color' + (232 + parseInt(number))];
        }
    }


    static web2rgb(webColor)
    {
        const int = parseInt(webColor.substring(1), 16);
        const r = int >> 16 & 0xFF;
        const g = int >> 8 & 0xFF;
        const b = int & 0xFF;
        const rr = Math.round(r * 5 / 255);
        const gg = Math.round(g * 5 / 255);
        const bb = Math.round(b * 5 / 255);
        return `rgb${rr}${gg}${bb}`;
    }
}