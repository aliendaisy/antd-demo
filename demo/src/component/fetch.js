export function fetchJson(cb){
    let myHeaders = new Headers({"Content-Type": "application/json"});
    let url = "http://www.mocky.io/v2/5b766d7b3000005700848af9";
    fetch(url, {
        method: 'post',
        headers: myHeaders,
        mode: 'cors',
    }).then(res => {
        return res.json();
    }).then((json) =>{
        return cb(json);
    }).catch(err => {
        console.log(err)
    });
}


export function getTableData() {
    return new Promise(resolve => {
        fetchJson(doc => {
            resolve(doc);
        });
    });
}