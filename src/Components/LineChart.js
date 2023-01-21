import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = ({xAxis,yAxis}) => {

    return (
        <div>
            <Line
                title='Total Networth vs Time'
                data={{
                    labels: xAxis,
                    datasets: [{
                        // barPercentage: 0.5,
                        // barThickness: 4,
                        // maxBarThickness: 80,
                        // minBarLength: 2,
                        data: yAxis,
                        borderColor: 'rgba(53, 162, 235, 1)',
                        backgroundColor: 'rgba( 53, 162, 235, 0.8)',
                    }]
                }}
                
                height={430}
                width={1000}
                options={{
                    scales: {
                        
                        x: {
                            grid: {
                                display: true
                            }
                        },
                        y: {
                            grid: {
                                display: true
                            }
                        }
                    },

                    plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                            display: true,
                            text: 'Total Networth vs Time'
                        },
                    }
                }}
            />
        </div>
    );
}
 
export default LineChart;