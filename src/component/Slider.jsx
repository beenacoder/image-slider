import { useState, useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import './style.css';


function Slider({ url, imgLimit }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(0);
    const [loading, setLoading] = useState(false);


    const fetchImg = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(`${url}?page=1&limit=${imgLimit}`);
            const data = await response.json();

            if (data) {
                setImages(data);
                setLoading(false);
            }

        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false);

        }
    }

    useEffect(() => {
        if (url !== '') {
            fetchImg(url)
        }
    }, [url]);


    if (loading) {
        return <div>Cargando...</div>
    }

    if (errorMsg === null) {
        return <div>Ocurrió un error {errorMsg}</div>
    }

    const handlePrev = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
        console.log(currentSlide);
    }

    const handleNext = () => {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
        console.log(currentSlide);

    }

    const handleCircle = (index) => {
        setCurrentSlide(index)
    }


    return (
        <div className='container'>
            <FaArrowCircleLeft className='arrow arrow-left' onClick={handlePrev} />
            {
                images && images.length ?
                    images.map((imageItem, index) => (
                        <img
                            className={currentSlide === index ? 'current-image' : 'current-image hide'}
                            key={imageItem.id}
                            src={imageItem.download_url}
                            alt={imageItem.download_url}
                        />
                    ))
                    : null
            }
            <FaArrowCircleRight className='arrow arrow-right' onClick={handleNext} />
            <span className='circles'>
                {
                    images && images.length ?
                        images.map((_, index) => (
                            <button
                                key={index}
                                className={currentSlide === index ? 'current-circle' : 'current-circle active-circle'}
                                // onClick={() => setCurrentSlide(index)}
                                onClick={() => handleCircle(index)}
                            >
                            </button>
                        ))
                        : null
                }
            </span>
        </div>
    )
}

export default Slider