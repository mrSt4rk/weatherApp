import React, { useEffect, useState, memo } from 'react';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherIcon = ({ data, size }) => {
    const [iconData, setIconData] = useState();

    const Icon = (info) => {
        let wIcon = null;
        switch (info?.description) {
            case 'Thunderstorm':
                wIcon = <FontAwesomeIcon icon={faBolt} className="thunder" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 'Drizzle':
                wIcon = <FontAwesomeIcon icon={faCloudRain} className="drizzle" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 'Rain':
                wIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} className="rain" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 'Snow':
                wIcon = <FontAwesomeIcon icon={faSnowflake} className="snow" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 'Clear':
                wIcon = <FontAwesomeIcon icon={faSun} className="clear" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 'Clouds':
                wIcon = <FontAwesomeIcon icon={faCloud} className="clouds" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            default:
                break;
        }
        return wIcon
    }

    useEffect(() => {
        if (data) { setIconData(data); }
    }, [data])


    return (
        <div>
            {Icon(iconData)}
        </div>
    );
}

export default memo(WeatherIcon);
