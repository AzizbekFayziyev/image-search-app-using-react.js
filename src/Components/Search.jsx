import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImageViewer } from "react-image-viewer-dv";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function Search() {

    const key = `LOFPgDnj9WiEMMtTkAErLnRfH_ZygqxiPABGuWXAHNI`;
    const [images, setImages] = useState([]);
    const [input, setInput] = useState("car");
    const [page, setPage] = useState(1)

    function getValue(e) {
        setInput(e.target.value)
    }

    function result() {
        axios.get(`https:api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${key}`)
            .then(res => {
                console.log(res.data.results);
                setImages(res.data.results)
            });
    }

    useEffect(() => {
        result();
    }, []);

    const form = (e) => {
        e.preventDefault();
        result();
    }


    return (
        <div className='container'>

            <form onSubmit={form}>
                <input
                    className='form-control'
                    placeholder='search images..'
                    type="text"
                    onChange={getValue}
                    required
                />
                <button
                    onClick={form}
                    className='btn btn-outline-primary btn-lg'
                    type='submit'>
                    Search
                </button>
            </form>

            {images.length ?
                images.map(img => (

                    <div key={img.id} className="img">

                        <ImageViewer>
                            <LazyLoadImage
                                alt={img.alt_description}
                                effect="blur"
                                src={img.urls.full} />
                        </ImageViewer>

                    </div>

                )) : "Nothing Found"
            }

        </div>
    )
}
