var dataCont = document.getElementById('dataContainer')

    let btn = document.querySelector('#submitBtn')

    var localData = localStorage.getItem('movieData')

    displayData();

    btn.addEventListener('click',function(){
        let inpData = document.getElementById('formD');
        let title = inpData.title.value;
        title = title.toUpperCase()  
        let dname = inpData.dname.value;
        let stars = inpData.stars.value;
        let streaming = inpData.streaming.value

        console.log(title)
 
        let movData = {
            title:title,
            director: dname,
            stars: stars,
            streaming: streaming
        }
            
         localData = localStorage.getItem('movieData')

        if(localData == null){

            let arr = [];

            arr.push(movData);

            arr = JSON.stringify(arr)

            localStorage.setItem('movieData', arr)
        }

        else {

            localData = JSON.parse(localData);

            localData.push(movData)

            localData = JSON.stringify(localData)

            localStorage.setItem('movieData',localData);

        }
       
        displayData()
    })
    


    function displayData(){

        dataCont.innerHTML = null;

        let data = localStorage.getItem('movieData')

        console.log(data)

        data = JSON.parse(data)
        let count = 0;


        for(let i = data.length-1; i >=0;  i--){

            console.log('in the loop',data.length)
            if(count === 6){ break; }

            let div = document.createElement('div');

            let title = document.createElement('p');
            title.innerHTML = ` Title : ${data[i].title}`;
            title.style.color = 'white'
            title.style.fontSize = '1.5rem';
            title.style.marginBottom = '-2px';
            title.style.textDecoration = 'underline'

            let director = document.createElement('p')
            director.innerText = ` Director : ${data[i].director}`;

            let stars = document.createElement('p')
            stars.innerText = `Starring : ${data[i].stars}`;

            let streaming = document.createElement('p')
            streaming.innerText = `Streaming on : ${data[i].streaming}`;

            div.append(title,director,stars,streaming)

            dataCont.append(div)
            count++;
        }


    }