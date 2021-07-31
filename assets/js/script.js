const miToken = '10225636516756874';
$(document).ready(function(){
  $('#formSH').submit(function(e){
    e.preventDefault();
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
            `<div class="card mb-3" style="max-width: 540px;">
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
        }
      },
      error: function(){
        console.log("no se ha podido obtener la info");
      }
    });
  })
})



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
		indexLabel: "{label} - {y}",
		dataPoints: [
			{ y: 48.36, label: "Windows 7" },
			{ y: 26.85, label: "Windows 10" },
			{ y: 1.49, label: "Windows 8" },
			{ y: 6.98, label: "Windows XP" },
			{ y: 6.53, label: "Windows 8.1" },
			{ y: 2.45, label: "Linux" },
			{ y: 3.32, label: "Mac OS X 10.12" },
			{ y: 4.03, label: "Others" }
		]
	}]
};
$("#chartContainer").CanvasJSChart(options);   

$(".esconder").show();