function traerInformacionre(){
    debugger;
    $.ajax({
        url:"http://129.151.96.80:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestare(respuesta);
        }
    });
}

function pintarRespuestare(respuesta){

    let myTable="<>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr role='row' class='odd'>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td> <a onclick='asignarId("+respuesta[i].idReservation+")' data-toggle='modal' data-target='#modalBike' href='#'><i class='fas fa-edit'></i></a>  <a onclick='borrarElementore("+respuesta[i].idReservation+")' href='#'><i class='fas fa-user-times'></i></a> </td> ";
        myTable+="</tr>";
    }
    myTable+="</>";
    $("#userList").append(myTable);
    $(document).ready(function() {
        $('#userList').DataTable();
    } );

}
function asignarId(numId){
    $("#Idreb").val(numId);
}
function guardarInformacionre(){
    debugger;
    let myClientid={
        idClient:$("#IdClient").val()
    }
    let myBikeid={
        id:$("#IdBike").val()
    }
    let myData6={
        startDate:$("#star").val(),
        devolutionDate:$("#devolution").val(),
        client:(myClientid),
        bike:(myBikeid),
        };
    let dataToSend=JSON.stringify(myData6);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData6),
        
        url:"http://129.151.96.80:8080/api/Reservation/save",
       
        
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

function borrarElementore(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoc").empty();
            alert("Se ha Eliminado.");
            window.location.reload()
        }
    });
}
function editarInformacionre(){
    debugger;
    let myData={
        idReservation:$("#Idreb").val(),
        startDate:$("#starrem").val(),
        devolutionDate:$("#devolutionrem").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoc").empty();
            $("#Idreb").val("");
            $("#starrem").val("");
            $("#devolutionrem").val("");
            alert("se ha Actualizado")
            window.location.reload()
        }
    });
}

