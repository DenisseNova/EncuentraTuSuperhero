const miToken = '10225636516756874';
$(document).ready(function(){
  $('#formSH').submit(function(e){
    e.preventDefault();
    $(".esconder").hide();

    const id = $('#inputIdSH').val();
    if(isNaN(id)) return alert('Debe ingesar un numero')

    $('#botonBuscar').html('Cargando').prop('disabled', true)
    
    const miUrl = `https://www.superheroapi.com/api.php/${miToken}/${id}`
    $.ajax({
      url: miUrl,
      success: function(respuesta){
        if (respuesta.response === 'error') {
          alert('No existe el ID');
        } else  if (respuesta.response === 'success') {
          $("#info").html(
            `<div class="card mb-3 tamanioletra">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${respuesta.image.url}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${respuesta.name} </h5>
                  <p class="card-text"><i>Conexiones:</i> ${respuesta.connections['group-affiliation']}</p>
                  <p class="card-text"> <i>Publicado por:</i> ${respuesta.biography.publisher}</p>
                  <hr class="my-2">
                  <p class="card-text"><i>Ocupación:</i>  ${respuesta.work.occupation}</p>
                  <hr class="my-2">
                  <p class="card-text"><i>Primera Aparición:</i>  ${respuesta.biography["first-appearance"]}</p>
                  <hr class="my-2">
                  <p class="card-text"><i>Altura:</i>  ${respuesta.appearance.height[0]} - ${respuesta.appearance.height[1]}</p>
                  <hr class="my-2">
                  <p class="card-text"><i>Peso:</i>  ${respuesta.appearance.weight[0]} - ${respuesta.appearance.weight[1]}</p>
                  <hr class="my-2">
                  <p class="card-text"><i>Alianzas:</i>  ${respuesta.biography.aliases}</p>
                </div>
              </div>
            </div>
          </div>`
          )
          //
          let objetoArray = Object.keys(respuesta.powerstats);
          let nuevoArray = objetoArray.map(function(elemento){
            return {
              label: elemento,
              y: Number(respuesta.powerstats[elemento]),
            }
          })

          mostrarGrafico(nuevoArray)
          
          $(".esconder").show();
        }
      },
      error: function(){
        alert ("Ocurrió un error al conectarse a la API")
        $(".esconder").hide();
      },
      complete: function(){
        $('#botonBuscar').html('Buscar').prop('disabled', false)
      }
    });
  })
})

function mostrarGrafico(datos) {
  var options = {
    title: {
      text: "Estadisticas del Poder para"
    },
    animationEnabled: true,
    data: [{
      type: "pie",
      startAngle: 40,
      toolTipContent: "<b>{label}</b>: {y}",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} ({y})",
      dataPoints: datos
    }]
  };
  $("#chartContainer").CanvasJSChart(options);   
}