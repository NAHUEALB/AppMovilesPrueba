
//Modifica el css el estado display de ModalDialog
function showModal() {
    document.getElementById('openModal').style.display = 'block';
  }
  
  function CloseModal() {
    document.getElementById('openModal').style.display = 'none';
  }

  function ocultarPopup(){
    document.getElementById('openModal').style.display = 'none';
  }

  function ocultarPopup(){
    document.forms[0].submit();
    alert("EMAIL ENVIADO");
    document.getElementById('openModal').style.display = 'none';
  }