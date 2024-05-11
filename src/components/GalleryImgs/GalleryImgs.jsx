import { useEffect } from 'react';
import { create } from 'zustand';
import styled from 'styled-components';
import listImages from '../../data/listimages.js';
import { useQuery } from 'react-query';

const fetchImages = async () => {
  const images = await listImages();
  return images;
};

const GalleryWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MainImageContainer = styled.div`
  width: 45%;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 44.1vh;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    order: -1;
  }
`;

const MainImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  width: 45%;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding-bottom: 66.67%; /* Relación de aspecto 3:2 */

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    z-index: 1;
  }
`;

const GridImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #795af6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (min-width: 769px) {
    position: absolute;
    bottom: -60px;
    right: 0;
  }

  @media (max-width: 768px) {
    position: static;
    margin: 20px auto 0;
  }
`;

function getNextImages(images, currentIndex) {
  let nextIndex = currentIndex + 5;

  // Si se han cargado todas las imágenes, vuelve al inicio
  if (nextIndex >= images.length) {
    nextIndex = 0;
  }

  return images.slice(nextIndex, nextIndex + 5);
}

const useGalleryStore = create((set) => ({
  loadedImages: [],
  images: listImages(),
  currentIndex: 0,
  setLoadedImages: (images) => set({ loadedImages: images }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
}));

const GalleryImgs = () => {
  const { loadedImages, setLoadedImages, currentIndex, setCurrentIndex } =
    useGalleryStore();

  const { data: images, isLoading } = useQuery('images', fetchImages);
  // Carga las primeras imágenes cuando se monta el componente
  useEffect(() => {
    if (images && images.length > 0) {
      const initialImages = getNextImages(images, currentIndex);
      setLoadedImages(initialImages);
    }
  }, [images, currentIndex]);

  // Función para cargar las siguientes imágenes
  const loadNextImages = () => {
    if (images && images.length > 0) {
      const nextImages = getNextImages(images, currentIndex);
      setLoadedImages(nextImages);
      setCurrentIndex((currentIndex + 5) % images.length);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <GalleryWrapper>
      <MainImageContainer>
        <MainImage src={loadedImages[0]?.url} alt={loadedImages[0]?.alt} />
      </MainImageContainer>
      <GridContainer>
        {loadedImages.slice(1).map((image) => (
          <GridItem key={image.id}>
            <GridImage src={image.url} alt={image.alt} />
          </GridItem>
        ))}
        <MoreButton onClick={loadNextImages}>Ver más</MoreButton>
      </GridContainer>
    </GalleryWrapper>
  );
};

export default GalleryImgs;
