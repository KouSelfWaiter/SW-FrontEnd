import {NavLink} from "react-router-dom"
import "./CustomLink.css"

function CustomLink(props:any){

    return(
        <NavLink
        {...props}
        className="customLink"
        activeClassName="active"
        />
    )
}

export default CustomLink