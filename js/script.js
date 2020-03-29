$(document).ready(function () {

    //LOCAL STORAGE SET ITENS
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key));

        if(value.checked){
            $('#section').append(`<li class="item" style="color: green; "-moz-transition": "color 0.3s linear"; "-webkit-transition": "color 0.3s linear"; "text-decoration": "none";  "transition": "color 0.3s linear"; "><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${value.valDigitado}
            <div style="float: right; margin-top: 6px;" class="pretty p-icon p-curve p-tada p-plain">
            <input name="itemLista" type="checkbox" checked/>
            <div class="state">
                    <i class="icon mdi mdi-check">
                <svg style="width:18px;height:18px" viewBox="0 5 24 24">
                        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg></i>
                    <label></label>
                </div>
            </div>
        </li>`)
        }else{
            $('#section').append(`<li class="item"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${value.valDigitado}
            <div style="float: right; margin-top: 6px;" class="pretty p-icon p-curve p-tada p-plain">
            <input name="itemLista" type="checkbox"/>
            <div class="state">
                    <i class="icon mdi mdi-check">
                <svg style="width:18px;height:18px" viewBox="0 5 24 24">
                        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg></i>
                    <label></label>
                </div>
            </div>
        </li>`)
        }


        console.log(key)
        console.log(value)
        $( "#section" ).sortable()
    }
    //LOCAL STORAGE END

    $('#addButton').on('click',function (){
        clicouAdd()
    })

    $(document).on('keypress',function(e) {
        if(e.which == 13 && $('#inputAdd').is(":focus")) {
            clicouAdd()
        }
    });

    

    function clicouAdd(){

        var valDigitado = $('#inputAdd').val()

        var controleDuplicata = checaDuplicata(valDigitado);

        if(controleDuplicata) return;

        if(valDigitado.length = 0 || !valDigitado.replace(/\s/g, '').length){
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'O campo está vazio!',
              }) 
        }else{
            $('#section').prepend(`<li class="item"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${valDigitado}
            <div style="float: right; margin-top: 6px;" class="pretty p-icon p-curve p-tada p-plain">
            <input name="itemLista" type="checkbox" />
            <div class="state">
                    <i class="icon mdi mdi-check">
                <svg style="width:18px;height:18px" viewBox="0 5 24 24">
                        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg></i>
                    <label></label>
                </div>
            </div>
        </li>`)
        $('#inputAdd').val('');
        }

        $( "#section" ).sortable();

        $(":checkbox").on('click',function(){
            console.log(this);
            if($(this).is(':checked')){
                $(this).closest('.item').css({ 
                    "color": "green",
                    "text-decoration": "none",
                    "transition": "color 0.3s linear",
                    "-webkit-transition": "color 0.3s linear",
                    "-moz-transition": "color 0.3s linear",
                })
            }else{
                console.log('caiu aqui...')
                $(this).closest('.item').css({ 
                    "color": "black",
                })
            }
        });

    }

    function checaDuplicata(valDigitado){

        var controlResult = false;

        $.each($(".item"), function(index,element) {
            console.log(index,element)

            var textItem = $(element).text().trim()

            if(valDigitado == textItem){

                Swal.fire({
                    icon: 'error',
                    title: 'Opa!',
                    text: 'Já existe tarefa com esse nome!',
                  })
                  
                  controlResult = true
                  return false;
            }
        })

        return controlResult;

    }

    $('#cleanBtn').on('click',function(){

        if($("input[name='itemLista']:checked").length > 0){
        Swal.fire({
            title: 'Você quer remover as tarefas concluídas?',
            text: "Os dados serão perdidos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, delete-os!'
          }).then((result) => {
            if (result.value) {
                
                $.each($("input[name='itemLista']:checked"), function(){
                

                    var keyLocalStorage = $(this).closest('li').text();
                    keyLocalStorage = keyLocalStorage.trim();

                    console.log(keyLocalStorage)
                    localStorage.removeItem(keyLocalStorage);

                    $(this).closest('li').remove();
                });

              Swal.fire(
                'Deletado!',
                'Os concluídos foram removidos.',
                'success'
              )
            }
          })
          
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Opa!',
                text: 'Não existe tarefas concluídas!',
              })
        }
    });

    $(":checkbox").on('click',function(){
        console.log(this);
        if($(this).is(':checked')){
            $(this).closest('.item').css({ 
                "color": "green",
                "text-decoration": "none",
                "transition": "color 0.3s linear",
                "-webkit-transition": "color 0.3s linear",
                "-moz-transition": "color 0.3s linear",
            })
        }else{
            console.log('caiu aqui...')
            $(this).closest('.item').css({ 
                "color": "black",
            })
        }
    });

    $('#saveBtn').on('click', () =>{
                
                $.each($("input[name='itemLista']"), function(index,element) {

                    console.log(index,element)
            
                    var valItem = $(element).closest(".item").text()
                    valItem = valItem.trim();
            
                    console.log('ui',valItem);
            
                    if($(element).is(':checked')){
                        objeto = {
                            valDigitado: valItem,
                            checked: true
                        }
                    }else{
                        objeto = {
                            valDigitado: valItem,
                            checked: false
                        }
                    }
            
                    var arrayStringified = JSON.stringify(objeto);
            
                    localStorage.setItem(valItem,arrayStringified)
            
                    })

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Alterações salvas',
                        showConfirmButton: false,
                        timer: 1500
                      })
            
          
        console.log('ó',localStorage)
    })
    
    // arrayNotStringified = JSON.parse(localStorage.getItem("arrayLocalStorage"))

    /*arrayNotStringified.forEach(element => {
        console.log(localStorage)
       
    });*/

});