//Debouncing 
//Debouncing ensures a function is only executed after a delay when the user stops triggering it.
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

//Abort Controller
      //AbortController lets you cancel an ongoing API request when the new request comes in.
      let controller;

      function fetchData(query) {
        // Cancel previous request
        if (controller) {
          controller.abort();
        }

        controller = new AbortController();

        fetch(`https://react-fast-pizza-api.jonas.io/api/menu?q=${query}`, {
          signal: controller.signal,
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("Request aborted");
            } else {
              console.error(err);
            }
          });
      }

      // Usage
      const ip = document.querySelector(".ip");
      ip.addEventListener("input", (e) => {
        fetchData(e.target.value);
      });
