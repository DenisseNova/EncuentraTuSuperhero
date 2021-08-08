const miToken = '10225636516756874';
$(document).ready(function(){
  $('#formSH').submit(function(e){
    e.preventDefault();
    $(".esconder").hide();

    const id = $('#inputIdSH').val();
    const miUrl = `https://www.superheroapi.com/api.php/${miToken}/${id}`
    $.ajax({
      url: miUrl,
      success: function(respuesta){
        if (respuesta.response === 'error') {
          alert('No existe el ID');
          console.log(respuesta)
        } else  if (respuesta.response === 'success') {
          console.log(respuesta)
          console.log(respuesta.powerstats.combat)
          $("#info").html(
            `<div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${respuesta.image.url}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${respuesta.name} </h5>
                  <p class="card-text">Conexiones: ${respuesta.connections['group-affiliation']}</p>
                  <p class="card-text">Publicado por: ${respuesta.biography.publisher}</p>
                  <hr>
                  <p class="card-text">Ocupación: ${respuesta.work.occupation}</p>
                  <hr>
                  <p class="card-text">Primera Aparición: ${respuesta.biography["first-appearance"]}</p>
                  <hr>
                  <p class="card-text">Altura: ${respuesta.appearance.height[0]} - ${respuesta.appearance.height[1]}</p>
                  <hr>
                  <p class="card-text">Peso: ${respuesta.appearance.weight[0]} - ${respuesta.appearance.weight[1]}</p>
                  <hr>
                  <p class="card-text">Alianzas: ${respuesta.biography.aliases}</p>
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
        console.log("no se ha podido obtener la info");
        $(".esconder").hide();
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