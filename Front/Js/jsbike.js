function traerInformacionb(){
    debugger
    $.ajax({
        url:"http://129.151.96.80:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestab(respuesta);
        }
    });
}

function pintarRespuestab(respuesta){
    debugger;
    let myTable="<>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr role='row' class='odd'>";
        myTable+="<th scope='row'>"+respuesta[i].id+"</th>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td> <a onclick='asignarId("+respuesta[i].id+")' data-toggle='modal' data-target='#modalBike' href='#'><i class='fas fa-edit'></i></a>  <a onclick='borrarElementob("+respuesta[i].id+")' href='#'><i class='fas fa-user-times'></i></a> </td> ";

        myTable+="</tr>";
    }
    myTable+="<>";

    $("#userList").append(myTable);
    $(document).ready(function() {
        $('#userList').DataTable();
    } );

}

function asignarId(numId){
    $("#Idbm").val(numId);
}

function guardarInformacionb(){
    debugger;
    let myCategory={
        id:$("#category").val()
    };
    let myData={
        brand:$("#brand").val(),
        year:$("#year").val(),
        category:(myCategory),
        description:$("#description").val(),
        name:$("#name").val(),
    };
    console.log(JSON.stringify(myData));
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        url:"http://129.151.96.80:8080/api/Bike/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente, falta info o no se encontro la categoria");
        }
        });
}

function borrarElementob(idElemento){
    debugger;
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Bike/"+idElemento,
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

function editarInformacionb(){
    debugger;
    let myData={
        id:$("#Idbm").val(),
        brand:$("#brandm").val(),
        year:$("#yearm").val(),
        description:$("#descriptionm").val(),
        name:$("#namem").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Bike/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoc").empty();
            $("#Idbm").val("");
            $("#brandm").val("");
            $("#yearm").val("");
            $("#descriptionm").val("");
            $("#namem").val("");
            alert("se ha Actualizado");
            window.location.reload()
        }
    });
}