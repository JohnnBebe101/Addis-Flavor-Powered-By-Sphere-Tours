/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from 'react-router-dom';
import { HeroBanner } from './HeroBanner';
import toursData from '../../content/tours.json';
import homeData from '../../content/home.json';
import { Tour, HomeData } from '../../types';

export function HomeHero() {
  const navigate = useNavigate();
  const handleOpenBooking = () => navigate('/book/');
  const typedHomeData = homeData as unknown as HomeData;

  return (
    <HeroBanner
      slides={typedHomeData.hero.slides}
      tours={toursData.tours as Tour[]}
      handleOpenBooking={handleOpenBooking}
    />
  );
}
