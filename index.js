
/*1. შევქმნათ ფრომისი. იმის შანსი რომ ფრომისი ან დარეზოლვდება ან დარეჯექთდება უნდა იყოს 50/50. */


   function newPromise() {
  return new Promise((resolve, reject) => {
    if (0 > 0.5) {
      resolve('resolved!');
    } else {
     reject('rejected!');
    }
  });
}

newPromise()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });


/*2. დავწეროთ ფუნქცია რომელიც წამოიღებს მონაცემებს და დაბრუნებს ამ მონაცემებს */

 function fetchData() {
   return fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(data => data)
     .catch(error => {
       console.error('Error fetching data:', error);
       throw error; 
     });
 }

 fetchData()
   .then(data => {
     console.log(data);
   })
   .catch(error => {
     console.error(error);
   });
 

  

/*3. დავწეროთ ფუნქცია რომელიც ეცდება წამოიღოს მონაცემები წარუმატებელი რექუესთის შემთხვევაში ხელახლა ცადოს წამოღება */
function fetchingData(url, maxTries = 5) {
   return new Promise((resolve, reject) => {
     let retries = 0;
 
     function fetchData() {
       fetch(url)
         .then(response => {
           if (!response.ok) {
             throw new Error('response not ok');
           }
           return response.json();
         })
         .then(data => resolve(data))
         .catch(error => {
           retries++;
           console.error(`Error (retry ${retries}):`, error);
 
           if (retries >= maxTries) {
             console.error('Max retries reached.');
             reject(error);
           } else {
             console.log('Retry...');
             fetchData(); 
           }
         });
     }
 
     fetchData();
   });
 }
 

 fetchingData('https://jsonplaceholde.typicode.com/users')
   .then(data => {
     console.log('Fetched data:', data);
   })
   .catch(error => {
     console.error('Error:', error);
   });
 



/*
4. დავწეროთ ფუნქცია რომელიც ეცდება წმოიღოს მონაცემები ფუნქციამ უნდა დაგვიბრუნოს ის ლისთი რომელის ჩატვირთვაც უფრო მალე მოხდება.
*/

function fetchingUsers() {
   return fetch('https://dummyjson.com/users')
     .then(response => response.json())
     .then(fakeData => {
       console.log(fakeData);
       return fetch('https://jsonplaceholder.typicode.com/users');
     })
     .then(response => response.json())
     .then(realData => {
       console.log(realData);
       return [fakeData, realData];
     })
     .catch(error => {
       console.error(error);
       throw error;
     });
 }
 fetchingUsers()
   .then(data => {
     console.log(data);
   })
   .catch(error => {
     console.error(error);
   });
 

