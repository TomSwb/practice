let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal-content");

function showModal(thumbnail){
    modal.style.display = "block";
    modalContent.src = thumbnail.src;
}

function hideModal (){
    modal.style.display = "none";
}