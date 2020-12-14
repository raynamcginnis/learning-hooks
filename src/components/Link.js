import React from 'react';


const Link = ({className, href, children}) => {
    const onClick = (event) => {
        // if command or control key are pressed, open in new tab
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        // prevents browser from automatically refreshing, instead navigates to correct href
        event.preventDefault();
        window.history.pushState({}, '', href);
        // tells dropdown components that the URL just changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };
// component that creates an a link
//that takes on the classname, href and children of the component its imported into
// and calls the onClick function above when clicked
return <a onClick={onClick} className={className} href={href}>
    {children}
</a>;
};

export default Link;