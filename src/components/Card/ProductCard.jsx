import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineShare } from 'react-icons/hi';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components';
import ShareSocial from '../ShareSocial/ShareSocial';
import '@fontsource/capriola';

const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  background: linear-gradient(127deg, #ed00ff26 0%, #795af63d 100%);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 8px;
  border: 8px solid white;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 24px;
  box-sizing: border-box;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0, 100% 0, 74% 100%, 0 70%);
    background-color: rgba(255, 255, 255, 0.1);
    z-index: -1;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 74% 100%, 0 70%);
  overflow: hidden;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  padding: 16px;
  max-width: 90%;
  z-index: 1;
  line-height: 1.2;
  border-radius: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-family: 'Capriola', sans-serif;
  font-size: 35px;
  color: #333;
`;

const DetailLink = styled(Link)`
  margin-top: 16px;
  font-size: 16px;
  color: #795af6;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #5a3ec8;
  }
`;

const ShareIconWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  color: #795af6;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #795af6;
  z-index: 1;

  &:hover {
    color: #ff00ff;
    border: 2px solid #ff00ff;
  }
`;

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>No hay información del producto</div>;
  }

  const { id, nombre, img_url } = product;

  return (
    <>
      <CardContainer>
        <ImageWrapper>
          <img src={img_url} alt={nombre} />
        </ImageWrapper>
        <ContentContainer>
          <TextContainer>
            <Title>{nombre}</Title>
            <DetailLink to={`/detalle/${id}`}>Ver Detalle</DetailLink>
          </TextContainer>
        </ContentContainer>
        <Popover withArrow>
          <PopoverTrigger disableButtonEnhancement>
            <ShareIconWrapper>
              <HiOutlineShare />
            </ShareIconWrapper>
          </PopoverTrigger>

          <PopoverSurface tabIndex={-1}>
            {<ShareSocial imageUrl={img_url} />}
          </PopoverSurface>
        </Popover>
      </CardContainer>
    </>
  );
};

export default ProductCard;
