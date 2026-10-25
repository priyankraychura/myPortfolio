import React from 'react'
import PropTypes from 'prop-types'

// Line icons on a 24px grid; they take the text color
const Line = ({ children, className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
        {children}
    </svg>
)

// Filled brand marks
const Brand = ({ children, className, viewBox = '0 0 24 24' }) => (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" focusable="false" className={className}>
        {children}
    </svg>
)

Line.propTypes = { children: PropTypes.node, className: PropTypes.string }
Brand.propTypes = { children: PropTypes.node, className: PropTypes.string, viewBox: PropTypes.string }

export const ArrowUpRight = (props) => <Line {...props}><path d="M7 17 17 7M8 7h9v9" /></Line>
export const ArrowDown = (props) => <Line {...props}><path d="M12 5v14M6 13l6 6 6-6" /></Line>
export const ArrowRight = (props) => <Line {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Line>
export const ArrowUp = (props) => <Line {...props}><path d="M12 19V5M6 11l6-6 6 6" /></Line>
export const Download = (props) => <Line {...props}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></Line>
export const Play = (props) => <Line {...props}><path d="M7 4.5v15l12-7.5-12-7.5Z" /></Line>
export const Code = (props) => <Line {...props}><path d="m8 7-5 5 5 5M16 7l5 5-5 5" /></Line>
export const Copy = (props) => <Line {...props}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></Line>
export const Check = (props) => <Line {...props}><path d="m5 12.5 4.5 4.5L19 7" /></Line>
export const Close = (props) => <Line {...props}><path d="M6 6l12 12M18 6 6 18" /></Line>
export const Send = (props) => <Line {...props}><path d="M4 12 20 4l-6 16-2.5-6.5L4 12Z" /><path d="m11.5 13.5 3-3" /></Line>
export const Moon = (props) => <Line {...props}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></Line>
export const Sun = (props) => <Line {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></Line>
export const Mail = (props) => <Line {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Line>
export const Globe = (props) => <Line {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" /></Line>
export const Calendar = (props) => <Line {...props}><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></Line>
export const Lock = (props) => <Line {...props}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Line>
export const Shield = (props) => <Line {...props}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" /><path d="m9 12 2 2 4-4" /></Line>
export const Drive = (props) => <Line {...props}><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 16.5h.01M3 13l2.5-7h13L21 13" /></Line>
export const Ban = (props) => <Line {...props}><circle cx="12" cy="12" r="9" /><path d="m5.7 5.7 12.6 12.6" /></Line>
export const Key = (props) => <Line {...props}><circle cx="7.5" cy="15.5" r="4" /><path d="m10.5 12.5 9-9M16 7l3 3M14 9l2 2" /></Line>
export const FolderOpen = (props) => <Line {...props}><path d="M3 18.5V6.5A1.5 1.5 0 0 1 4.5 5h4l2 2h7A1.5 1.5 0 0 1 19 8.5V10" /><path d="M3 18.5 5.6 11a1.5 1.5 0 0 1 1.4-1h13.4a1 1 0 0 1 .95 1.3L19 18.5H3Z" /></Line>

export const GitHub = (props) => (
    <Brand {...props}>
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm0 1.5c4.703 0 8.5 3.797 8.5 8.5 0 3.833-2.522 7.061-6 8.126v-2.558c0-.955-.55-1.774-1.346-2.181.774-.148 1.492-.442 2.095-.856.603-.414 1.074-.938 1.374-1.527.3-.589.419-1.227.349-1.861-.07-.633-.328-1.244-.753-1.782.222-.683.47-1.88-.119-2.822-1.135 0-1.867.778-2.217 1.262A6.26 6.26 0 0 0 12 7.5a6.27 6.27 0 0 0-1.885.297c-.35-.484-1.082-1.259-2.215-1.259-.675 1.081-.258 2.244-.034 2.719-.453.535-.738 1.151-.828 1.794-.091.642.014 1.293.307 1.896.292.603.763 1.14 1.372 1.565.609.426 1.338.727 2.124.877-.653.337-1.142.948-1.292 1.689h-.657c-.649 0-.901-.263-1.251-.708-.346-.444-.718-.743-1.165-.867-.241-.026-.404.158-.194.32.71.483.759 1.274 1.043 1.791.259.466.79.886 1.39.886H9.5v1.626c-3.479-1.065-6-4.293-6-8.126C3.5 7.297 7.297 3.5 12 3.5Z" />
    </Brand>
)

export const LinkedIn = (props) => (
    <Brand {...props}>
        <path d="M5.75 3A2.758 2.758 0 0 0 3 5.75v12.5A2.758 2.758 0 0 0 5.75 21h12.5A2.758 2.758 0 0 0 21 18.25V5.75A2.758 2.758 0 0 0 18.25 3H5.75Zm0 1.5h12.5c.699 0 1.25.551 1.25 1.25v12.5c0 .699-.551 1.25-1.25 1.25H5.75c-.699 0-1.25-.551-1.25-1.25V5.75c0-.699.551-1.25 1.25-1.25Zm2 2a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM7 10a.5.5 0 0 0-.5.5V17a.5.5 0 0 0 .5.5h1.5A.5.5 0 0 0 9 17v-6.5a.5.5 0 0 0-.5-.5H7Zm3.5 0a.5.5 0 0 0-.5.5V17a.5.5 0 0 0 .5.5H12a.5.5 0 0 0 .5-.5v-3.75a1.25 1.25 0 0 1 2.5 0V17a.5.5 0 0 0 .5.5H17a.5.5 0 0 0 .5-.5v-4c0-1.654-1.346-3-3-3-.769 0-1.469.293-2 .77v-.27a.5.5 0 0 0-.5-.5h-1.5Z" />
    </Brand>
)

export const XLogo = (props) => (
    <Brand {...props}>
        <path d="M6.25 3A3.26 3.26 0 0 0 3 6.25v11.5A3.26 3.26 0 0 0 6.25 21h11.5A3.26 3.26 0 0 0 21 17.75V6.25A3.26 3.26 0 0 0 17.75 3H6.25Zm0 1.5h11.5c.975 0 1.75.775 1.75 1.75v11.5c0 .975-.775 1.75-1.75 1.75H6.25c-.975 0-1.75-.775-1.75-1.75V6.25c0-.975.775-1.75 1.75-1.75ZM6.914 7l3.868 5.528L6.911 17h1.022l3.301-3.824L13.91 17h3.219l-4.116-5.883L16.568 7h-1l-3.007 3.472L10.133 7H6.914Zm1.554.848h1.281l5.826 8.304h-1.281L8.468 7.848Z" />
    </Brand>
)

export const Instagram = (props) => (
    <Brand viewBox="0 0 25 24" {...props}>
        <path d="M8.75 2.5A5.757 5.757 0 0 0 3 8.25v7.5a5.757 5.757 0 0 0 5.75 5.75h7.5A5.757 5.757 0 0 0 22 15.75v-7.5a5.757 5.757 0 0 0-5.75-5.75h-7.5Zm0 1.5h7.5c2.356 0 4.25 1.894 4.25 4.25v7.5c0 2.356-1.894 4.25-4.25 4.25h-7.5A4.239 4.239 0 0 1 4.5 15.75v-7.5C4.5 5.894 6.394 4 8.75 4ZM17.5 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.752 0-5 2.248-5 5s2.248 5 5 5 5-2.248 5-5-2.248-5-5-5Zm0 1.5c1.942 0 3.5 1.558 3.5 3.5s-1.558 3.5-3.5 3.5S9 13.942 9 12s1.558-3.5 3.5-3.5Z" />
    </Brand>
)

export const CodePen = (props) => (
    <Line {...props}>
        <path d="M12 2.5 21.5 8.6v6.8L12 21.5 2.5 15.4V8.6L12 2.5Z" />
        <path d="M12 21.5v-6.1M21.5 8.6 12 15.4 2.5 8.6M2.5 15.4 12 8.6l9.5 6.8M12 2.5v6.1" />
    </Line>
)
