var dataCont = document.getElementById('dataContainer')

    let btn = document.querySelector('#submitBtn')

    var localData = localStorage.getItem('movieData')

    var  intervalId;

    displayData();

    btn.addEventListener('click',function(){
        let inpData = document.getElementById('formD');
        let title = inpData.title.value;
        title = title.toUpperCase()  
        let dname = inpData.dname.value;
        let stars = inpData.stars.value;
        let streaming = inpData.streaming.value
 
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
        inpData.title.innerHTML = null;
    })
    


    function displayData(){

        dataCont.innerHTML = null;

        let data = localStorage.getItem('movieData')
        console.log(data)

        data = JSON.parse(data)
        let count = 0;


        for(let i = data.length-1; i >=0;  i--){

            if(count === 6){ break; }

            let div = document.createElement('div');
            div.setAttribute('id',`dataDiv${i}`);
           

            let rmBtn = document.createElement('button');
            rmBtn.innerText = 'Remove'
            rmBtn.setAttribute('class','removeBtn')
             rmBtn.setAttribute('id',`btn${i}`);


            rmBtn.addEventListener('click',()=> {
                timer(i)

                setTimeout(()=> {
                   let id = div.id;

                   console.log(id)

                   let divCurrent = document.getElementById(`${id}`)

                   
                   clearInterval(intervalId)
                   dataCont.removeChild(divCurrent)
                   


                },3000)
            })

            const timer =(i)=>{
                 let btnId = document.getElementById(`btn${i}`)
                 let timer = 2;
                 btnId.innerText = timer;

                 intervalId =  setInterval(()=>{
                      timer--;
                     btnId.innerText=timer;
                  },1000)
                 
            }



            let title = document.createElement('p');
            title.innerHTML = ` Title : ${data[i].title}`;
            title.style.color = '#fff';
            title.style.fontSize = '1.5rem';
            title.style.marginBottom = '-2px';
            title.style.textDecoration = 'underline'

            let director = document.createElement('p')
            director.innerText = ` Director : ${data[i].director}`;

            let stars = document.createElement('p')
            stars.innerText = `Starring : ${data[i].stars}`;

            let streaming = document.createElement('p')
            streaming.innerText = `Streaming on : ${data[i].streaming}`;

            div.append(title,director,stars,streaming,rmBtn)

            dataCont.append(div)
            count++;
        }


    }

    
   