export const formPopup = document.querySelector('.form-popup');
export const formField = document.querySelector('.input-field');
export const configButton = document.querySelector('.button');
export const configForm = ()=>{
formField.oninput = ()=>{
    if(formField.value.includes('\n')){
        localStorage.setItem('arduinoip', formField.value.replace("\n", ""));
        formPopup.style.display = "none";
        formField.value = "";
        location.reload(true);
    }
}
configButton.onclick = () =>{
    if (formPopup.style.display === "none"){
        formPopup.style.display = "flex";
    } else {
        formPopup.style.display = "none";
    }
}
}