import React from "react";
import colors, {ColorProps} from "../../utils/colors";

export type SvgProps = {
    icon:any
    className?:string
    color?:string
    size?:number
}

const Svg: React.FC<SvgProps> = (props) => {
    const {icon,className,color, size} = props;

    return(
        <p
            dangerouslySetInnerHTML={{
                __html:icon
            }}
            className={className}
            style={{color, width:size}}
        />
    )
};

export default Svg;
