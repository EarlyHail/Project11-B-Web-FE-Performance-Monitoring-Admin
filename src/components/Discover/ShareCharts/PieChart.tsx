import React, { useRef, useEffect } from 'react';
import bb, { pie } from 'billboard.js';

interface IColumn {
  name: string;
  values: number[];
}

interface IProps {
  columns: IColumn[];
}

function PieChart(props: IProps): React.ReactElement {
  const { columns } = props;
  const chartDiv = useRef(null);

  const flatColumns = columns.map((column) => [column.name, ...column.values]);

  useEffect(() => {
    const chart = bb.generate({
      data: {
        columns: [['sample', 1000]],
        type: pie(),
      },
      pie: {
        padding: 1,
      },
      transition: {
        duration: 1000,
      },
      bindto: chartDiv.current,
    });
    chart.load({ columns: flatColumns });
    chart.unload({ ids: 'sample' });
  }, [flatColumns]);

  return <div ref={chartDiv} />;
}

export default PieChart;
