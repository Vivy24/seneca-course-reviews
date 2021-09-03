import { Box, chakra, Flex, VisuallyHidden } from '@chakra-ui/react';
import React from 'react';

const DEFAULT_MAX_RATING = 5;
type Props = {
  value: number;
  max?: number;
};
export const RatingStars = (props: Props) => {
  const max = props.max ?? DEFAULT_MAX_RATING;
  const stars = calculateRatingStars(max, props.value);

  return (
    <Box>
      <VisuallyHidden>
        Rating is {props.value} out of {max}
      </VisuallyHidden>

      <svg
        style={{ width: 0, height: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
      >
        <defs>
          <mask id="half">
            <rect x="0" y="0" width="32" height="32" fill="white" />
            <rect x="50%" y="0" width="32" height="32" fill="grey" />
          </mask>

          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="star"
          >
            <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
          </symbol>
        </defs>
      </svg>

      <Flex gridGap="1">
        {stars.map((type, index) => (
          <RatingStar key={index} type={type} />
        ))}
      </Flex>
    </Box>
  );
};

type RatingStarProps = {
  type: 'full' | 'empty' | 'half';
};
function RatingStar(props: RatingStarProps) {
  let fillColor, mask;

  switch (props.type) {
    case 'full':
      fillColor = '#fed94b';
      mask = undefined;
      break;

    case 'half':
      fillColor = '#fed94b';
      mask = 'url("#half")';
      break;

    case 'empty':
      fillColor = 'lightgrey';
      mask = undefined;
      break;

    default:
      break;
  }
  return (
    <chakra.svg fill={fillColor} width="1em" height="1em" viewBox="0 0 32 32">
      <use xlinkHref="#star" mask={mask}></use>
    </chakra.svg>
  );
}

function calculateRatingStars(max: number, value: number) {
  const hasHalfStar = !Number.isInteger(value) && Math.round(value) > value;
  const ratedStarCount = Math.floor(value);
  const grayStarCount = hasHalfStar
    ? Math.floor(max - ratedStarCount - 1)
    : Math.floor(max - ratedStarCount);

  const stars: RatingStarProps['type'][] = [];

  for (let index = 0; index < ratedStarCount; index++) {
    stars.push('full');
  }

  if (hasHalfStar) stars.push('half');

  for (let index = 0; index < grayStarCount; index++) {
    stars.push('empty');
  }

  return stars;
}
