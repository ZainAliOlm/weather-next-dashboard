import React from 'react';

const WeatherDetailsModal = ({ city, forecast, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
                <div className='flex items-center justify-between mb-4'>
                    <h2 className="text-2xl font-bold mb-4">{city} - 5 Day Forecast</h2>
                    <button
                        onClick={onClose}
                        className="top-1 right-2 text-gray-700"
                    >
                        Close
                    </button>
                </div>


                {forecast.list.slice(0, 5).map((day, index) => (
                    <div key={index} class="flex justify-between items-center">
                        <span className="font-semibold text-lg w-1/4">{new Date(day.dt * 1000).toLocaleDateString()}</span>
                        <div className="flex items-center justify-end w-1/4 pr-10">
                            <img
                                src={`http://openweathermap.org/img/wn/${day?.weather[0]?.icon}@2x.png`}
                                alt={day?.weather[0]?.description}
                                className="w-10 h-10"
                            />
                            <span className="flex font-semibold text-sm  text-right">{day?.weather[0]?.description}</span>

                        </div>
                        <span className="flex font-semibold text-sm w-1/4 text-right"><p>{Math.round(day?.main?.temp_min)}°C</p> / <p>{Math.round(day?.main?.temp_max)}°C</p></span>
                    </div>

                ))}
            </div>
        </div >
    );
};

export default WeatherDetailsModal;
