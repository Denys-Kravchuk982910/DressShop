import { useEffect, useState } from "react";
import './crumbs.scss';
import { Link, useLocation } from "react-router-dom";
import React from "react";

export const BreadCrumbs = () => {
    const pathDictionary : { key: string, value: string }[] = [
        {key: '/', value: 'Головна'},
        {key: '/catalog', value: 'Каталог'},
    ];


    const [crumbs, setCrumbs] = useState<string[]>([]);

    const { pathname } = useLocation();

    useEffect(() => {
        const paths = ['/'];

        const items = pathname.split('/').filter(x => x);

        for (let i = 0; i < items.length; i++) {
            paths.push(paths[i] + items[i]);
        }

        setCrumbs(paths);
    }, [pathname]);

    return (<div className="breadcrumbs">
            {crumbs.map((crumb, index, crmbs) => {
                return (<React.Fragment key={'link' + crumb}>
                    <Link to={crumb} className="breadcrumbs__crumb">
                        {pathDictionary.filter(p => p.key === crumb)[0].value}
                    </Link>

                    {crmbs.length - 1 !== index && 
                    <p className="breadcrumbs__slash">/</p>}
                </React.Fragment>);
            })}
    </div>);
}