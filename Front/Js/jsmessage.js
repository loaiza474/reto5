function traerInformacionm(){
    $.ajax({
        url:"http://129.151.96.80:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestam(respuesta);
        }
    });
}

function pintarRespuestam(respuesta){

    let myTable="<>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr role='row' class='odd'>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <a onclick='asignarId("+respuesta[i].idMessage+")' data-toggle='modal' data-target='#modalBike' href='#'><i class='fas fa-edit'></i></a>  <a onclick='borrarElementom("+respuesta[i].idMessage+")' href='#'><i class='fas fa-user-times'></i></a> </td> ";
        myTable+="</tr>";
    }
    myTable+="</>";
    $("#userList").append(myTable);
    $(document).ready(function() {
        $('#userList').DataTable();
    } );
}

function asignarId(numId){
    $("#Idmm").val(numId);
}

function guardarInformacionm(){
    debugger;
    let myClientid={
        idClient:$("#idcliente").val()
    }
    let myBikeid={
        id:$("#idbike").val()
    }
    let myData5={
        client:(myClientid),
        bike:(myBikeid),
        messageText:$("#messagetext").val(),
    };
    console.log(JSON.stringify(myData5))
    let dataToSend=JSON.stringify(myData5);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData5),
        
        url:"http://129.151.96.80:8080/api/Message/save",
       
        
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


function editarInformacionm(){
    debugger;
    let myData={
        idMessage:$("#Idmm").val(),
        messageText:$("#messagemm").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadom").empty();
            $("#Idmm").val("");
            $("#messagemm").val("");
            alert("se ha Actualizado");
            window.location.reload()
        }
    });
}

function borrarElementom(idElemento){
    debugger;
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadom").empty();
            traerInformacionm();
            alert("Se ha Eliminado.");
            window.location.reload()
        }
    });
}
