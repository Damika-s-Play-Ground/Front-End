import { Item } from "../model/item";

let items: Array<Item> = [];

export function getAllItems(): Promise<Array<Item>> {
    //To-do: retrieve data from backend and fill the customers array
    return new Promise((resolve, reject) => {


        //(1) Initiate a XMLHttpRequest
        let http = new XMLHttpRequest();

        //(2)Setting up the call back function
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                console.log("Items awa")
                resolve(items= JSON.parse(http.responseText));
            }
        }

        //(3) Let's open the request
        http.open('GET', 'http://localhost:8080/app/items', true)//Method type,address,asynchronus status


        //(4) If we have to set headers

        //(5)
        http.send();

    });
}

