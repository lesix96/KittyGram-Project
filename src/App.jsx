import React, { useEffect, useState } from 'react';

import unsplash from './api/api';
import Carousel from './Carousel';

const App = () => {
  const [picsArray, setPicsArray] = useState([]);
  

  const search = async() => {
    let arrayOfResults = [];
    let arrayOfPictures = [];
    let index = 0;

    await unsplash.get('/search/photos', {
      params: { query: 'kitten' },
    }).then(response => {
      arrayOfResults = response.data.results;
      arrayOfResults.forEach(element => {
        let obj = new Picture(element.urls.small, element.id, index);
        index += 1;
        arrayOfPictures.push(obj);
      });
    })
    setPicsArray(arrayOfPictures);
  };

  class Picture {
    constructor(picture, id, index) {
      this.picture = picture,
      this.id = id,
      this.index = index
    }
  }

  useEffect(() => {
    search();
  }, []);
  
  return (
    <div>
      <Carousel picsArray={picsArray} />
    </div>
  )
}

export default App;