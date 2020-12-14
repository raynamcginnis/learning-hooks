import {useEffect, useState} from 'react';

const Route = ({path, children}) => {
    // state that makes route component reroute
    const [ currentPath, setCurrentPath ] = useState(window.location.pathname)
    useEffect(() => {
        const onLocationChange = () => {
            // update current path to current path
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEvenetListener('popstate', onLocationChange);
        };
    }, []);

 return currentPath === path 
 ? children
 : null;
};

export default Route;