import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../reducers/reposReducer";
import styles from './css/cats.module.scss';

const Cat = () => {

    const dispatch = useDispatch()
    const categores = useSelector(state => state.reposReducer.products)

    const [data, setData] = useState([]);
    const [selectId, setSelectId] = useState(null);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        axios.get(`https://api.thecatapi.com/v1/categories`)
            .then(res => {
                const persons = res.data;
                setData(persons)
            })
    }, [])

    useEffect(() => {
        setCats([...categores])
    }, [categores])

    function onCountClick(e) {
        setSelectId(e);
        dispatch(setCount(e, 10));
    }

    function loadModeCats(e) {
        if (cats) {
            dispatch(setCount(selectId, cats.length + 10))
        }
    }

    return (
        <div className="app">
            <div>
                <select className = {styles.selectItem} onChange={(e) => onCountClick(e.target.value)}>
                    <option value="">select cat</option>
                    {data && data.map((i, k) => {
                        return (
                            <option className = {styles.optionItem} key={k} value={i.id}>{i.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className={styles.imageContainer}>
                {cats && cats.map((i, k) => {
                    return (
                        <div className={styles.imageMain} key={k}>
                            <img className={styles.imageItem} src={i.url} alt="avatar" />
                        </div>
                    )
                })}
            </div>
            <div className={styles.loadMoreCatsContainer}>
                <button onClick={() => loadModeCats()} >Load more cats</button>
            </div>
        </div>
    );
};

export default Cat;