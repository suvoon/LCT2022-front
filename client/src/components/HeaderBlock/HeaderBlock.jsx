import HeaderMenu from "../HeaderMenu/HeaderMenu";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import "./styles.css";

const HeaderBlock = ({ currentPath, setCurrentPath, query, setQuery }) => {
    return (
        <>
            <HeaderMenu
                currentPath={currentPath}
                setCurrentPath={setCurrentPath}
            />
            <HeaderSearch
                query={query}
                setQuery={setQuery}
            />
        </>
    )
}

export default HeaderBlock