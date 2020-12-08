import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID xkInR3gmMxoemffd4z6NwKlQsibsc_E1q6CiHqlElFw' 
  }
});