import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTwo: React.FC = ({ text, category }: any) => {
  const [row, setRow] = useState<any>([]);

  // useEffect(() => {
  //   let testRow: any = [];
  //   seriesRow?.map((item: any) => {
  //     testRow.push(item?.name);
  //   });
  //   setRow(testRow);
  // }, [seriesRow]);
  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Qurilma ko\'rikdan o\'tkazilmagan',
        data: [13, 23, 20, 8, 13, 27, 15]
      },
      {
        name: 'Qurilma ko\'rikdan o\'tkazilgan',
        data: [44, 55, 41, 67, 22, 43, 65]
      }
    ]
  });

  const options: ApexOptions = {
    colors: ['#d20404', '#03d907'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%'
            }
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      }
    },
    dataLabels: {
      enabled: false
    },

    xaxis: {
      categories: row
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',

      markers: {
        radius: 99
      }
    },
    fill: {
      opacity: 1
    }
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState
    }));
  };
  handleReset;


  console.log(category);

  return (
    <div
      className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {text}
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              {
                category?.map((item: any) => {
                  <option value={item.id} className="dark:bg-boxdark">{item?.name}</option>;
                })
              }
            </select>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
