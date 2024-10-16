import React, { useEffect, useState } from 'react';
import { WeatherService } from './WeatherService';

const WeatherCards = () => {

  let [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    WeatherService.getAllData().then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch(() => {
      setErrorMessage("Something went wrong");
      setLoading(false);
      alert(errorMessage);
    })
  }, []);
  return (
    <>
     <h1 className='text-light mx-auto'>Weather App</h1>
      <section className="contact-card">
        <div className="container">
          <div className="row">
            {data.map((data, index) => ( // Looping through the data
              <div key={index} className="col-md-6 p-3">
                <div className="row">
                  <div className="card m-3 bg-dark">
                    <div className="card-body">
                      <row className="row d-flex align-items-center">
                        <div className="col-md-4">
                          <img src={data.photo} alt="" className='img-fluid contact-img' />
                        </div>
                        <div className="col-md-7">
                          <ul className="list-group">
                            <li className="list-group-item list-group-item-action bg-dark text-white">City Name: <span className='fw-bold ms-1'>{data.city}</span></li>
                            <li className="list-group-item list-group-item-action bg-dark text-white">Temperature: <span className='fw-bold ms-1'>{data.temperature}</span></li>
                            <li className="list-group-item list-group-item-action bg-dark text-white">Humidity: <span className='fw-bold ms-1'>{data.humidity}</span></li>
                            <li className="list-group-item list-group-item-action bg-dark text-white">Rain Possibility: <span className='fw-bold ms-1'>{data.rainPossibility}</span></li>
                          </ul>
                        </div>
                      </row>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default WeatherCards;
