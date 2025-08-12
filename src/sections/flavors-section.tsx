import FlavorSlider from '@/components/flavor-slider';
import FlavorTitle from '../components/flavor-title';
import React from 'react';

const FlavorsSection = () => {
  return (
    <section className="flavor-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <FlavorTitle />
        </div>
        <div className="h-full">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorsSection;
