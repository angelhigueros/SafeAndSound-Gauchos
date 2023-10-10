export function postData(data){
  return fetch('https://jokape27.pythonanywhere.com/computeImage', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"},
      }).then(response => response.json())
      
}

