import { useEffect, useState } from 'react';

import Header from './header/Header';
import { getImages } from 'api/api';
import { Btn } from './Button.style';
import { Loader } from './loader/Loader';
import { ImageGallery } from './gallery/ImageGallery';

export const App = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [openModals, setOpenModals] = useState({});
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!filter) return;
     const getData = async () => {
       try {
         setIsLoad(true);
         const { data } = await getImages(page, filter);
         if (data) {
           setImages(prevImages => {
             const uniqueNewImages = data.hits.filter(
               newImage =>
                 !prevImages.some(prevImage => prevImage.id === newImage.id)
             );
             return [...prevImages, ...uniqueNewImages];
           });
           setIsLoad(false);
           setShowBtn(page < Math.ceil(data.totalHits / 12));
         }
       } catch (e) {
         setIsLoad(false);
         setShowBtn(false);
         alert(e);
       }
     };
    getData();
  }, [page, filter]);


  const findImages = word => {
    setFilter(word);
    setImages([]);
    setPage(1);
  };

  const toggleModal = id => {
    setOpenModals(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <Header findImages={findImages} />
      <>
        {images.length > 0 && (
          <ImageGallery
            images={images}
            openModals={openModals}
            toggleModal={toggleModal}
          />
        )}
        {showBtn && <Btn onClick={() => setPage(page + 1)}>Load more</Btn>}
      </>
      {isLoad && <Loader />}
    </div>
  );
};
