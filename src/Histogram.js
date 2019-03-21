import React from 'react';
import Plot from 'react-plotly.js';

const Histogram = ({array, layout}) => {
  const makeData = arr => (
    [{
      x: arr,
      type: 'histogram',
      xbins: {
        size: 10,
      },
    }]
  );
  return (
    <Plot
      data={ makeData(array) }
      layout={ layout }
    />
  )
}

export default Histogram;