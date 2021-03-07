import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Styles from './SearchInput.module.css'
const SearchInput = ({...rest}) => {
    return (
    <div className={Styles.wrapper}>
        <SearchRoundedIcon color="inherit"/>
        <input className={Styles.input} {...rest}/>
    </div>
    )
}

export default SearchInput;