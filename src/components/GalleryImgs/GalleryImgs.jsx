import { useEffect } from 'react';
import { create } from 'zustand';
import styled from 'styled-components';
import listImages from '../../data/listimages.js';

// Styled components
const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
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
  }
`;

const MainImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 45%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 352px;
  height: 236px;

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

  @media (max-width: 768px) {
    width: calc(50% - 10px);
    height: auto;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
  }
`;

const GridImage = styled.img`
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
  const {
    loadedImages,
    setLoadedImages,
    images,
    currentIndex,
    setCurrentIndex,
  } = useGalleryStore();

  // Carga las primeras imágenes cuando se monta el componente
  useEffect(() => {
    const initialImages = getNextImages(images, currentIndex);
    setLoadedImages(initialImages);
  }, []);

  // Función para cargar las siguientes imágenes
  const loadNextImages = () => {
    const nextImages = getNextImages(images, currentIndex);
    setLoadedImages(nextImages);
    setCurrentIndex((currentIndex + 5) % images.length);
  };

  return (
    <GalleryContainer>
      <MainImageContainer>
        <MainImage src={loadedImages[0]?.url} alt={loadedImages[0]?.alt} />
      </MainImageContainer>
      <GridContainer>
        {loadedImages.slice(1).map((image) => (
          <GridItem key={image.id}>
            <GridImage src={image.url} alt={image.alt} />
          </GridItem>
        ))}
      </GridContainer>
      <MoreButton onClick={loadNextImages}>Ver más</MoreButton>
    </GalleryContainer>
  );
};

export default GalleryImgs;
