const handler = document.getElementById('wrapper');
import { formPopup, formField, configForm, configButton} from "./components/form.js";
configForm();
const waterIcons = {
    "unfill": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="#D21404" class="bi bi-droplet" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/></svg>`,
    "half": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="#0090ab" class="bi bi-droplet-half" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/></svg>`,
    "fill": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="#095786" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/></svg>`
}
const setInterface = (data) =>{
    handler.children[0].classList.remove('gear');
    if (data.sailpercent <= 30){
        handler.children[0].innerHTML = waterIcons.unfill;
    } else if (data.sailpercent > 30 && data.sailpercent < 70){
        handler.children[0].innerHTML = waterIcons.half;
    } else if (data.sailpercent > 70){
        handler.children[0].innerHTML = waterIcons.fill;
    }
    handler.children[1].innerHTML = `<p> porcentaje de humedad: <strong>${data.sailpercent}%</strong> </p>`
}
const getData = async (ip)=>{
    const response = await fetch(`http://${ip}`);
    const data = await response.json();
    return await data
}
//getData(localStorage.arduinoip).then((data) => {setInterface(data)}).catch(er);
setInterval(()=>{
    getData(localStorage.arduinoip)
        .then((data) => {
            setInterface(data)
        })
        .catch(error => {
            if(error.message === "Failed to fetch"){
                const svg =  document.createElement("svg")
                svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cloud-slash-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.112 5.112a3.125 3.125 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11L3.112 5.112zm11.372 7.372L4.937 2.937A5.512 5.512 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711zm-.838 1.87-12-12 .708-.708 12 12-.707.707z"/></svg>`
                handler.replaceChild(svg,handler.children[0]);
                if (localStorage.arduinoip === undefined || localStorage.arduinoip === "undefined" || localStorage.arduinoip == undefined){
                    handler.children[1].innerHTML = `<p> ingresa la ip del arduino usando el boton de configuracion arriba a la izquierda :D </p>`;
                }else {
                    handler.children[1].innerHTML = `<p> fallo de conexión confirma que la ip "${localStorage.arduinoip}" es correcta, si no cambiala y recarga la pagina </p>`;
                }
            }else{
                handler.children[1].innerHTML = `<p> error inesperado, contacta con el desarrollador para mas información </p>`;
            }
        });
},100)