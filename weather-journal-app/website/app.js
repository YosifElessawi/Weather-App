// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
let apiKey = '&appid=8672aba475f8bded494086674eac3224&units=metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {

    //get values from user
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWebData(zipcode).then((data) => {
        //identifing the data object we want to post
        const postingData = {
            date: newDate,
            temp: data.list[0].main.temp,
            content: feelings,
            city: data.city.name
        };
        //call post method
        postData('/add', postingData);
        updateUI();
    })
};

/* Function to GET Web API Data*/
async function getWebData(zipcode) {
    const res = await fetch(baseURL + zipcode + apiKey);
    try {

        const data = await res.json();
        console.log(data);
        return data;

    } catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const retrieveData = async (url = '') => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json()
        return allData;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

/* FUnction to Update the user interface*/
const updateUI = async () => {
    try {
        retrieveData('/all').then((allData) => {
            console.log(allData);
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = `${allData.temp} c`;
            document.getElementById('content').innerHTML = allData.content;
            document.getElementById('city').innerHTML = allData.city;
        })
    } catch (error) {
        console.log("error", error);
    }
}

