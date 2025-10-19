let mi_sistema = new Sistema();

window.onload = gestionar_eventos;

function gestionar_eventos() {
  document.querySelector('#btn_ingresar_censista').onclick = iniciar_sesion;
  document.querySelector('#btn_ingresar_invitado').onclick = iniciar_persona;
  document.querySelector('#btn_registar').onclick = iniciar_registro;
  document.querySelector('#btn_registar_censista').onclick = registrar_censista;
  document.querySelector('#btn_cerrar_sesion').onclick = cerrar_sesion;

  document.querySelector('#btn_verificar_cedula').onclick = buscar_ci;
  document.querySelector('#btn_borrar_datos').onclick = borrar;
  document.querySelector('#btn_guardar_datos1').onclick = ingresar_datos;
  document.querySelector('#btn_guardar_datos2').onclick = ingresar_datos_censista;

  document.querySelector('#btn_reasignar').onclick = reasignar;
  document.querySelector("#btn_est").onclick=ver_mayores_menores;
  document.querySelector('#i_select_departamento').innerHTML = mi_sistema.llenar_select_departamento_censo();
  document.querySelector('#select_mayores_menores').innerHTML = mi_sistema.llenar_select_departamento_censo();
}

function ver_mayores_menores(){
  let departamento=document.querySelector("#select_mayores_menores").value;
  document.querySelector("#i_mayores").innerHTML=mi_sistema.cargar_mayores(departamento);
  document.querySelector("#i_menores").innerHTML=mi_sistema.cargar_menores(departamento);
  
}

function reasignar(){
  let i_cedula = document.querySelector('#ci_persona_pendiente').value;
  let u_censista = document.querySelector('#usuario_censista').value;
  mi_sistema.reasignar(u_censista, i_cedula);
  let string_cedulas = mi_sistema.cargar_select_ci();
  document.querySelector("#ci_persona_pendiente").innerHTML = string_cedulas;
  document.querySelector("#p_mensaje3").innerHTML = "Se asigno correctamente" ;
}

//Elimina los datos de la cedula que fue registrada  NO FUNCIONA
function borrar1() { 
  //guardar la cedula. 
  let ci = document.querySelector('#id_cedula').value;
  let posicion = mi_sistema.obtener_posicion_precompletado(ci);
  if (posicion >= 0) {
    mi_sistema.lista_censados.splice(posicion,1)
    document.querySelector("#p_mensaje2").innerHTML = "Se elimino correctamente" ;
    document.querySelector('#i_nombre_persona').value = '';
    document.querySelector('#i_edad_persona').value = '';
    document.querySelector('#i_cedula_persona').value = '';
    document.querySelector('#i_select_departamento').value = '';
    document.querySelector('#i_select_ocupacion').value = '';      
  } else {
    document.querySelector("#p_mensaje2").innerHTML = "No hay datos registrados" ;
  }
}

// Borra los campos
function borrar() {
  document.querySelector('#i_nombre_persona').value = '';
  document.querySelector('#i_edad_persona').value = '';
  document.querySelector('#i_cedula_persona').value = '';
  document.querySelector('#i_select_departamento').value = '';
  document.querySelector('#i_select_ocupacion').value = '';
  
 
  document.querySelector("#p_mensaje2").innerHTML = "Los campos han sido borrados";
}

function buscar_ci() {
  let ci = document.querySelector('#id_cedula').value;
  console.log(ci);
  let posicion = mi_sistema.obtener_posicion_precompletado(ci);
  console.log(posicion);
  if (posicion >= 0) {
    rellenar_formulario(posicion);
    document.querySelector('#id_cedula').value = '';
  } else if (posicion == -1) {
    document.querySelector('#id_cedula').value = '';
    alert('sus datos fueron validados');
  } else {
    document.querySelector('#id_cedula').value = '';
    alert('no hay datos precompletados');
  }
}

function rellenar_formulario(posicion) {
  let datos_precompletados = mi_sistema.lista_censados[posicion];
  document.querySelector('#i_nombre_persona').value = datos_precompletados.persona.nombre_apellido;
  document.querySelector('#i_edad_persona').value = datos_precompletados.persona.edad;
  document.querySelector('#i_cedula_persona').value = datos_precompletados.persona.cedula;
  console.log(datos_precompletados.persona.ocupacion);
  document.querySelector('#i_select_ocupacion').value = datos_precompletados.persona.ocupacion;
  console.log(datos_precompletados.persona.departamento_residencia);
  document.querySelector('#i_select_departamento').value = datos_precompletados.persona.departamento_residencia;
}



//INGRESAR DATOS por Persona
function ingresar_datos() {
  let nombre_apellido = document.querySelector('#i_nombre_persona').value;
  let edad = parseInt(document.querySelector('#i_edad_persona').value);
  let cedula = document.querySelector('#i_cedula_persona').value;
  let s_departamento_residencia = document.querySelector('#i_select_departamento').value;
  let s_ocupacion = document.querySelector('#i_select_ocupacion').value;
  
  if (es_valido_el_censtista(nombre_apellido, edad, cedula, s_departamento_residencia, s_ocupacion)) {
    mi_sistema.agregar_precompletado_persona(nombre_apellido, edad, cedula, s_departamento_residencia, s_ocupacion);
    document.querySelector('#p_mensaje2').innerHTML = nombre_apellido + ' Datos guardados correctamente.';
    document.querySelector('#i_nombre_persona').value = '';
    document.querySelector('#i_edad_persona').value = '';
    document.querySelector('#i_cedula_persona').value = '';
    document.querySelector('#i_select_departamento').value = '';
    document.querySelector('#i_select_ocupacion').value = '';
  } else {
    document.querySelector('#p_mensaje2').innerHTML = 'Hubo un error';
  }
}

//ingresar datos  por Censista
function ingresar_datos_censista() {
  let nombre_apellido = document.querySelector('#i_nombre_persona').value;
  let edad = parseInt(document.querySelector('#i_edad_persona').value);
  let cedula = String(document.querySelector('#i_cedula_persona').value);
  let s_departamento_residencia = document.querySelector('#i_select_departamento' ).value;
  let s_ocupacion = document.querySelector('#i_select_ocupacion').value;
  // no limpia despues de agregar
  let is_todo_ok = true;
  if (!mi_sistema.is_nombre_apellido(nombre_apellido)) {
    //muestro mensaje de que esta mal
    document.querySelector('#p_mensaje2').innerHTML ='El campo nombre debe tener valor';
    is_todo_ok = false;
  } else if (!mi_sistema.is_edad(edad)) {
    document.querySelector('#p_mensaje2').innerHTML ='La edad debe estar entre 0 y 130';
    is_todo_ok = false;
  } else if (!mi_sistema.is_verificador_valido(cedula)) {
    document.querySelector('#p_mensaje2').innerHTML = 'cedula no es valida ';
    is_todo_ok = false;
  } else if (!mi_sistema.is_select_ocupacion(s_ocupacion)) {
    document.querySelector('#p_mensaje2').innerHTML ='La opcion predeterminada es incorrecta';
    is_todo_ok = false;
  } else if (!mi_sistema.is_select_departamento(s_departamento_residencia)) {
    document.querySelector('#p_mensaje2').innerHTML ='La opcion predeterminada es incorrecta';
    is_todo_ok = false;
  }


  if (is_todo_ok) {
    let mensaje_agregar_persona = mi_sistema.agregar_censo_censista(nombre_apellido, edad,cedula, s_departamento_residencia, s_ocupacion);
    if (mensaje_agregar_persona == true) {
      document.querySelector('#p_mensaje2').innerHTML = nombre_apellido + ' ah censado correctamente.';
      document.querySelector('#i_nombre_persona').value = '';
      document.querySelector('#i_edad_persona').value = '';
      document.querySelector('#i_cedula_persona').value = '';
      document.querySelector('#i_select_departamento').value = '';
      document.querySelector('#i_select_ocupacion').value = '';
    }
  }
}


//INICIAR SESION Y REGISTRO

function iniciar_sesion() {
  let usuario = document.querySelector('#nombre_usuario').value;
  let pass = document.querySelector('#i_contra').value;
  if (mi_sistema.is_login(usuario, pass)) {
    ocultar_div();
    mostrar_div();
    cambiarVisibilidad(document.querySelector('#btn_guardar_datos1'), 'none');
    cambiarVisibilidad(document.querySelector('#btn_borrar_datos'), 'none');
    cambiarVisibilidad(document.querySelector('#btn_guardar_datos2'), 'block');
    cambiarVisibilidad(document.querySelector('#i_cerrar_cession1'), 'block');
    let string_cedulas = mi_sistema.cargar_select_ci();
    let string_censistas = mi_sistema.cargar_select_censista();
    document.querySelector("#ci_persona_pendiente").innerHTML = string_cedulas;
    document.querySelector("#usuario_censista").innerHTML = string_censistas;
    document.querySelector("#tabla_censista1").innerHTML=mi_sistema.obtener_string_tabla_c();
    document.querySelector("#tabla_censista2").innerHTML+=mi_sistema.cargar_personas_pendientes();
    document.querySelector('#nombre_usuario').value = '';
    document.querySelector('#i_contra').value = '';
    alert('Accediste correctamente');    
    console.log(string_censistas)
  } else {
    alert('Error, verifique haber ingresado datos correctamente');
    document.querySelector('#nombre_usuario').value = '';
    document.querySelector('#i_contra').value = '';
  }
}

//REGISTRO
function registrar_censista() {
  let nombre = document.querySelector('#nombre_censista').value;
  let usuario = document.querySelector('#nombre_usuario_censista').value;
  let pass = document.querySelector('#pass_censista').value;
  let mensaje_agregar_censista = mi_sistema.agregar_censista(nombre,usuario,pass);
  if (mensaje_agregar_censista.length == 0) {
    document.querySelector('#p_mensaje').innerHTML ='Agendado correctamente el censista ' + nombre;
    document.querySelector('#nombre_censista').value = '';
    document.querySelector('#nombre_usuario_censista').value = '';
    document.querySelector('#pass_censista').value = '';
  } else {
    document.querySelector('#p_mensaje').innerHTML = mensaje_agregar_censista;
  }
}

// OCULTAR Y MOSTRAR   --   de aca para abajo

function ocultar_div() {
  document.querySelector('#i_ingresar').style.display = 'none';
  document.querySelector('#i_ingresar_datos').style.display = 'block';
}

function mostrar_div() {
  
  document.querySelector('#i_reasignar').style.display = 'block';
  document.querySelector('#i_est').style.display = 'block';
}

function iniciar_persona() {
  cambiarVisibilidad(document.querySelector('#i_ingresar'), 'none');
  cambiarVisibilidad(document.querySelector('#i_est'), 'none');
  cambiarVisibilidad(document.querySelector('#i_cerrar_cession1'), 'block');
  cambiarVisibilidad(document.querySelector('#i_ingresar_datos'), 'block');
  cambiarVisibilidad(document.querySelector('#i_estadisticas_persona'),'block');
  cambiarVisibilidad(document.querySelector('#btn_guardar_datos1'), 'block');
  cambiarVisibilidad(document.querySelector('#btn_borrar_datos'), 'block');
 
  cambiarVisibilidad(document.querySelector('#btn_guardar_datos2'), 'none');
}

function iniciar_registro() {
  cambiarVisibilidad(document.querySelector('#i_cerrar_cession1'), 'block');  
  cambiarVisibilidad(document.querySelector('#i_registrar'), 'block');
  cambiarVisibilidad(document.querySelector('#i_ingresar_datos'), 'none');
  cambiarVisibilidad(document.querySelector('#i_est'), 'none');  
  cambiarVisibilidad(document.querySelector('#i_estadisticas_persona'),'none');  
  cambiarVisibilidad(document.querySelector('#i_ingresar'), 'none');
}

function cambiarVisibilidad(objeto, estado) {
  objeto.style.display = estado;
}

// BOTON DE CERRAR SESION PARA EL CENSISTA
function cerrar_sesion() {
  mi_sistema.usuario_logeado = '';
  cambiarVisibilidad(document.querySelector('#i_cerrar_cession1'), 'none');
  cambiarVisibilidad(document.querySelector('#i_ingresar'), 'block');
  cambiarVisibilidad(document.querySelector('#i_est'), 'none');
  cambiarVisibilidad(document.querySelector('#i_ingresar_datos'), 'none');
  cambiarVisibilidad(document.querySelector('#i_estadisticas_persona'),'block');
  cambiarVisibilidad(document.querySelector('#i_registrar'), 'none');
  cambiarVisibilidad(document.querySelector('#i_reasignar'), 'none');
  cambiarVisibilidad(document.querySelector('#btn_guardar_datos2'), 'none');
}

function es_valido_el_censtista(nombre_apellido,edad,cedula,departamento_residencia,ocupacion) {
  return (
    mi_sistema.is_nombre_apellido(nombre_apellido) &&
    mi_sistema.is_verificador_valido(cedula) &&
    mi_sistema.is_edad(edad) &&
    mi_sistema.is_select_departamento(departamento_residencia) &&
    mi_sistema.is_select_ocupacion(ocupacion)
  );
}
