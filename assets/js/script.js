const miToken = '10225636516756874';
$(document).ready(function(){
  $('#formSH').submit(function(e){
    e.preventDefault();
    const id = $('#inputIdSH').val();
    const miUrl = `https://www.superheroapi.com/api.php/${miToken}/${id}`
  })
})



 
    