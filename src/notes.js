export default {
    name: 'app',
    data() {
      return {
        query: '',
        weather: {}
      }
    },
    methods: {
      fetchWeather(e) {
        if(e.key == 'Enter') {
          fetch(`${this.url_base}weather?q=${this.query}&units=imperial&APPID=${this.api_key}`)
          .then((res) => {
            return res.json();
          }).then(this.setResults);
          }
        },
      setResults(results) {
        this.weather = results;
        console.log(this.weather);
      },
      dateBuilder() {
        let d = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
      }
    }
  }