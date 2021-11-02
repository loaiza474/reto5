function traerInformacionc(){
    debugger;
    $.ajax({
        url:"http://129.151.96.80:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr role='row' class='odd'>";
        myTable+="<th scope='row'>"+respuesta[i].id+"</th>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <a onclick='asignarId("+respuesta[i].id+")' data-toggle='modal' data-target='#modalBike' href='#'><i class='fas fa-edit'></i></a>  <a onclick='borrarElementoc("+respuesta[i].id+")' href='#'><i class='fas fa-user-times'></i></a> </td> ";
    }
    myTable+="<>";
    $("#userList").append(myTable);
    $(document).ready(function() {
        $('#userList').DataTable();
    } );

}

function asignarId(numId){
    $("#Idcm").val(numId);
}

function guardarInformacionc(){
    debugger;
    let myData2={
        name:$("#namec").val(),
        description:$("#descriptionc").val(),
    };
    let dataToSend=JSON.stringify(myData2);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData2),
        
        url:"http://129.151.96.80:8080/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });
}


function editarInformacionc(){
    debugger;
    let myData={
        id:$("#Idcm").val(),
        name:$("#namecm").val(),
        description:$("#descriptioncm").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoc").empty();
            $("#Idcm").val("");
            $("#namecm").val("");
            $("#descriptioncm").val("");
            alert("se ha Actualizado");
            window.location.reload()
        }
    });
}

function borrarElementoc(idElemento){
    debugger;
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoc").empty();
            traerInformacionc();
            alert("Se ha Eliminado.");
            window.location.reload()
        }
    });
}
