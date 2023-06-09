import {GrFacebook as FacebookIcon, GrTwitter as TwitterIcon, GrMailOption as MailIcon} from "react-icons/gr"
import {FaFlickr as FlickrIcon, FaYoutube as YoutubeIcon, FaExternalLinkAlt as ExternalLinkIcon, FaPhone as PhoneIcon} from "react-icons/fa"
import { BsGlobe as WebIcon } from "react-icons/bs";
import classes from "./MediaIcon.module.css"




const MediaIcon = ({icon}) => {
    if(!icon){
        return <ExternalLinkIcon className={classes.engagementIcon} />
    }

    const iconType = icon.toUpperCase()

    switch (iconType){
        case "FACEBOOK":
            return <FacebookIcon className={classes.engagementIcon} />
        case "TWITTER":
            return <TwitterIcon className={classes.engagementIcon} />
        case "FLICKR":
            return <FlickrIcon className={classes.engagementIcon} />
        case "YOUTUBE":
            return <YoutubeIcon className={classes.engagementIcon} />
        case "WEB":
            return <WebIcon className={classes.engagementIcon} />
        case "TELEPHONE":
            return <PhoneIcon className={classes.engagementIcon} />
        case "EMAIL":
            return <MailIcon className={classes.engagementIcon} />
        default:
            return <ExternalLinkIcon className={classes.engagementIcon} />

    }

}

export default MediaIcon