function traerInformacioncl(){
    debugger;
    $.ajax({
        url:"http://129.151.96.80:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestacl(respuesta);
        }
    });
}

function pintarRespuestacl(respuesta){

    let myTable="<>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr role='row' class='odd'>";
        myTable+="<td scope='row'>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <a onclick='asignarId("+respuesta[i].idClient+")' data-toggle='modal' data-target='#modalBike' href='#'><i class='fas fa-edit'></i></a>  <a onclick='borrarElementocl("+respuesta[i].idClient+")' href='#'><i class='fas fa-user-times'></i></a> </td> ";
        myTable+="</tr>";
    }
    myTable+="</>";
    $("#resultadocl").append(myTable);

    $("#userList").append(myTable);
    $(document).ready(function() {
        $('#userList').DataTable();
    } );
}


function asignarId(numId){
    $("#Idclm").val(numId);
}

function guardarInformacioncl(){
    debugger;
    let myData3={
        email:$("#emailcl").val(),
        password:$("#passwordcl").val(),
        name:$("#namecl").val(),
        age:$("#agecl").val(),
        };
    let dataToSend=JSON.stringify(myData3);
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData3),
        
        url:"http://129.151.96.80:8080/api/Client/save",
       
        
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


function editarInformacioncl(){
    debugger;
    let myData={
        idClient:$("#Idclm").val(),
        email:$("#emailclm").val(),
        password:$("#passwordclm").val(),
        name:$("#nameclm").val(),
        age:$("#ageclm").val(),
        };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoc").empty();
            $("#Idclm").val("");
            $("#emailclm").val("");
            $("#passwordclm").val("");
            $("#nameclm").val("");
            $("#ageclm").val("");
            alert("se ha Actualizado");
            window.location.reload()
        }
    });
}

function borrarElementocl(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.96.80:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoc").empty();
            traerInformacioncl();
            alert("Se ha Eliminado.");
            window.location.reload()
        }
    });
}