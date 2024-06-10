import styled from 'styled-components';
import TooltipCustom from '../TooltipCustom/TooltipCustom';

const CategoryCardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})`
  width: 85%;
  max-width: 300px;
  height: 60px;
  border: 3px solid white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#E9F7EF ' : '#f5e9fc')};
  transition: background-color 0.3s;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto 16px;
  position: relative;

  &:hover {
    background-color: #d1f2eb;
  }

  @media (min-width: 768px) {
    width: 150px;
    margin: 0;
  }
`;

const CategoryTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  white-space: normal;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
  flex: 1;
  max-width: 70%;
`;

const ImageContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: #ccc;
  clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CategoryImage = styled.img`
  max-width: 200%;
  max-height: 200%;
  object-fit: cover;
`;

const CategoryCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const CategoryCard = ({
  categoryName,
  categoryImageUrl,
  isSelected,
  onClick,
}) => {
  return (
    <>
      <TooltipCustom content={categoryName}>
        <CategoryCardWrapper>
          <CategoryCardContainer isSelected={isSelected} onClick={onClick}>
            <CategoryTitle>{categoryName}</CategoryTitle>
            <ImageContainer>
              <CategoryImage src={categoryImageUrl} alt={categoryName} />
            </ImageContainer>
          </CategoryCardContainer>
        </CategoryCardWrapper>
      </TooltipCustom>
    </>
  );
};

export default CategoryCard;
