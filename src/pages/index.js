import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from '../components/CountryTable/CountiesTable';
import { useState } from 'react';
export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();
  console.log(countries);
  return {
    props: {
      countries,
    }
  }
}

export default function Home({ countries }) {

  const [keyword, SetKeyword] = useState('');

  const filterCountries = countries.filter(country => (
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
  ));

  const onInputChange = (e) => {
    e.preventDefault();

    SetKeyword(e.target.value.toLowerCase());
  };

  return <Layout>
    <div className={styles.input_container}>
      <div className={styles.count}>Found {countries.length} count</div>
      <div className={styles.input}>
        <SearchInput placeholder="Filter by Name, Region or SubRegion" onChange={onInputChange} />
      </div>
    </div>
    <CountriesTable countries={filterCountries} />

  </Layout>

}

