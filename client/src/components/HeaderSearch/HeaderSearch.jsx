import "./styles.css";
import mglass from './../../images/loupe.png'
import cloud from './../../images/cloudy.png'
import { useRef } from "react";

const HeaderSearch = ({ query, setQuery }) => {

    const queryHandler = (ev) => {
        ev.preventDefault();
        setQuery(inputEl.current.value);
    }

    const inputEl = useRef(null);

    return (
        <div className="HeaderSearch">
            <div className="HeaderSearch__container">
                <div className="HeaderSearch__searchbar">
                    <form>
                        <input
                            onChange={queryHandler}
                            ref={inputEl}
                            className="HeaderSearch__input"
                            name="request-search"
                            placeholder="поиск по дефекту/адресу"
                        />
                        <input
                            onClick={queryHandler}
                            className="HeaderSearch__submit"
                            type="submit"
                            name="request-searchbtn"
                        />
                        <button onClick={queryHandler}>
                            <img src={mglass} alt="mglass" />
                        </button>
                    </form>
                </div>
                <div className="HeaderSearch__weather">
                    <div className="weather__degrees">
                        +2 C°
                    </div>
                    <div className="weather__wind">
                        8 м/с
                    </div>
                    <div className="weather__icon">
                        <img src={cloud} alt="weatherimg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSearch