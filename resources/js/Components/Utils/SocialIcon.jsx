export default function SocialIcon({href, children, className, ...rest}) {
    return(
        <a target="_blank" href={href} className={className}>
            {children}
        </a>
    );
}
