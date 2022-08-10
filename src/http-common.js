import axios from "axios";
export default axios.create({
    baseURL: "https://vue-js-client-crud.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
});


// import axios from "axios";
// export default axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         "Content-type": "application/json"
//     }
// });