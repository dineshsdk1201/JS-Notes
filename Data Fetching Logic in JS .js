//Debouncing 
//Eg: 1
let timer;
      const fetchSearch = (query, delay) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          console.log("Timer for Query:", query);
        }, delay);
      };

      // Simulate typing
      const ip = document.querySelector(".ip");
      ip.addEventListener("input", (e) => {
        fetchSearch(e.target.value, 500);
      });

//Eg:2

      function debounce(fn, delay) {
        let timer;

        return function (...args) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn(args);
          }, delay);
        };
      }

      // Usage
      const fetchSearch = debounce((query) => {
        fetch(`https://demo.js/${query}`);
        console.log("API call for:", query);
      }, 500);

      // Simulate typing
      const ip = document.querySelector(".ip");
      ip.addEventListener("input", (e) => {
        fetchSearch(e.target.value);
      });
