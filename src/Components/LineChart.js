import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = ({xAxis,yAxis}) => {

    return (
        <div>
            <Line
                title='Total Networth vs Time'
                data={{
                    labels: xAxis,
                    // labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                    datasets: [{
                        barPercentage: 0.5,
                        barThickness: 80,
                        maxBarThickness: 80,
                        minBarLength: 2,
                        data: yAxis,
                        // data: [34, 56, 34, 45],

                        // backgroundColor: [
                        //     'rgba( 255, 0, 0, 0.8)',
                        //     'rgba( 0, 0, 0, 0.8)',
                        //     'rgba(97, 70, 46, 0.8)',
                        //     'rgba(0, 128, 0, 0.5)',
                        // ],

                        backgroundColor: [
                            'rgba( 0, 255, 0, 0.8)',
                        ],

                        
                    }]
                }}
                
                height={430}
                width={1000}
                options={{
                    // indexAxis: 'y',
                    scales: {
                        
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
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