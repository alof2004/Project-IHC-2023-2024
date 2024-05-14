import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

interface PriceRangeProps {
  onRangeChange: (newRange: [number, number]) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ onRangeChange }) => {
  const [range, setRange] = useState<[number, number]>([100, 1500]);

  const handleChanges = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      setRange(newValue as [number, number]);
    }
  };

  const handleCommitted = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      onRangeChange(newValue as [number, number]);
    }
  };

  return (
    <div style={{ width: '40rem', padding: '20px', margin: '10px', marginTop: '0px', marginBottom: '0px', backgroundColor: '#252525', color: 'white', borderRadius: '0px', borderBottom: '1px solid #eee', fontSize: '20px' }}>
      <h3>Filtrar por preço</h3>
      <Slider
        value={range}
        onChange={handleChanges}
        onChangeCommitted={handleCommitted}
        valueLabelDisplay="auto"
        min={100}
        max={1500}
        sx={{
          color: 'white',
          '& .MuiSlider-thumb': {
            backgroundColor: 'white',
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: 'none',
            },
          },
          '& .MuiSlider-track': {
            backgroundColor: 'white',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#666',
          },
        }}
      />
      Mostrando preços entre: {range[0]} - {range[1]}
    </div>
  );
};

export default PriceRange;
