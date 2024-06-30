import { useCallback, useEffect, useState } from "react";
import './crumbs.scss';
import { Link, useLocation } from "react-router-dom";
import React from "react";

export const BreadCrumbs = () => {
    const pathDictionary : { key: string, value: string }[] = [
        {key: '/', value: 'Головна'},
        {key: '/catalog', value: 'Каталог'},
        {key: '/card', value: 'Товар'},
    ];


    const [crumbs, setCrumbs] = useState<string[]>([]);

    const { pathname } = useLocation();

    useEffect(() => {
        let paths = ['/'];

        const items = pathname.split('/').filter(x => x);

        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i])) {
                const lastPath = paths[paths.length - 1];

                paths = paths.slice(0, paths.length - 1);

                paths.push(lastPath + items[i] + '/');
            } else {
                paths.push(paths[i] + items[i] + '/');
            }

        }

        setCrumbs(paths);
    }, [pathname]);

    const getPossiblePath = useCallback((path: string) => {
        const items =  pathDictionary.filter(p => path.startsWith(p.key));

        const value = items[items.length - 1].value;

        return value;
    }, []);

    return (<div className="breadcrumbs">
            {crumbs.map((crumb, index, crmbs) => {
                return (<React.Fragment key={'link' + crumb}>
                    <Link to={crumb.length === 1 ? crumb : crumb.slice(0, -1)} className="breadcrumbs__crumb">
                        {getPossiblePath(crumb)}
                    </Link>

                    {crmbs.length - 1 !== index && 
                    <p className="breadcrumbs__slash">/</p>}
                </React.Fragment>);
            })}
    </div>);
}