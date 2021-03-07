import { StylesProvider } from "@material-ui/core";
import styles from './CountriesTable.module.css';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import { useState } from "react";
import Link from 'next/link';

//HELPER FUNCTION
const orderBy = (countries, direction,value) => {
    if (direction === "asc")
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)

    if (direction === "desc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }

    return countries;
};

const SortArrow = ({direction}) => {
    if(!direction){
        return <></>
    }

    if(direction === 'desc'){
        return <div className={styles.heading_arrow}><KeyboardArrowDownRoundedIcon color="inherit"/></div>
    }
    if(direction === 'asc'){
        return <div className={styles.heading_arrow}><KeyboardArrowUpRoundedIcon color="inherit"/></div>
    }
};

const CountriesTable = ({ countries }) => {

    const [direction, SetDirection] = useState();
    const [value, SetValue] = useState();
    const orderedCountry = orderBy(countries, direction,value);
    const switchDirection = () => {
        if(!direction){
            SetDirection('desc');
        } else if(direction === 'desc') {
            SetDirection('asc');
        } else {
            SetDirection(null);
        }
    }

    const setValueAndDirection = (value) => {
        switchDirection();
        SetValue(value);
    }
 
    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.heading_flag}>

                </div>
                <button className={styles.heading_name} onClick={() => setValueAndDirection('name')}>
                    <div>Name</div>
                    {value === "name" &&  <SortArrow direction={direction}/>}
                </button>
                <button className={styles.heading_population} onClick={() => setValueAndDirection('population')}>
                    <div>Population</div>
                    {value === "population" &&  <SortArrow direction={direction}/>}
                </button>
                <button className={styles.heading_area} onClick={() => setValueAndDirection('area')}>
                    <div>Area(km<sup style={{fontSize:"0.5rem"}}>2</sup>)</div>
                    {value === "area" && <SortArrow direction={direction}/>}
                </button>
                <button className={styles.heading_gini} onClick={() => setValueAndDirection('gini')}>
                    <div>Gini</div>
                    {value === "gini" &&  <SortArrow direction={direction}/>}
                </button>
                
            </div>
            {orderedCountry.map((country) => (
                <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
                <div className={styles.row} >
                    <div className={styles.flag}>
                        <img src={country.flag} alt={country.name}/>
                    </div>
                    <div className={styles.name}>{country.name}</div>
                    <div className={styles.population}>{country.population}</div>
                    <div className={styles.area}>{country.area || 0}</div>
                    <div className={styles.gini}>{country.gini || 0}%</div>
                </div>
                </Link>
            ))}
        </div>
    )
}

export default CountriesTable;