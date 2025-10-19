class Censista {
    constructor(nombre, usuario, contrasena,) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.contrasena = contrasena;

    }

    is_mismo_objeto(objeto) {
        if (this.usuario == objeto.usuario) {
            return true;
        }
        return false;
    }

    is_longitud_correcta(contrasena) {
        let is_valida = contrasena.length >= 5;
        return is_valida;
    }
    is_mayu(contrasena) {
        for (let i = 0; i < contrasena.length; i++) {
            if (!isNaN(contrasena[i]) && contrasena[i] === contrasena[i].toUpperCase()) {
                return true;
            }
        }
        return false;
    }
    is_min(contrasena) {
        for (let i = 0; i < contrasena.length; i++) {
            if (!isNaN(contrasena[i] && contrasena[i] === contrasena[i].toLowerCase())) {
                return true;
            }
        }
        return false;
    }
    is_num(contrasena) {
        for (let i = 0; i < contrasena.length; i++) {
            if (!isNaN(contrasena[i])) {
                return true;
            }
        }
        return false;
    }
    is_nombre(nombre) {
        return nombre.length > 0;
    }
}


class Persona {
    constructor(nombre_apellido, edad, cedula, departamento_residencia, ocupacion) {
        this.nombre_apellido = nombre_apellido;
        this.edad = edad;
        this.cedula = cedula;
        this.departamento_residencia = departamento_residencia;
        this.ocupacion = ocupacion;
    }

    is_mismo_objeto(objeto) {
        if (this.cedula == objeto.cedula) {
            return true;
        }
        return false;
    }

}


class Censo {
    constructor(persona, usuario_censista, isCensado) {
        this.persona = persona;
        this.usuario_censista = usuario_censista;
        this.isCensado = isCensado;
    }

    is_mismo_objeto(objeto) {
        if (this.persona.cedula == objeto.cedula) {
            return true;
        }
        return false;
    }

}


class Sistema {
    constructor() {
        this.lista_censistas = [];
        this.lista_censados = [];
        this.lista_departamentos = ["Seleccionar...", "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandu", "Rio Negro", "Rivera", "Rocha", "Salto", "San Jose", "Soriano", "Tacuarembo", "Treinta y Tres"];
        this.lista_ocupaciones = [];

        this.id_censista = 30;

        this.usuario_logeado = "";
        this.precarga_censistas();
        this.precarga_personas();
    }

    obtenerCensistaAleatorio() {
        let random = parseInt(Math.random() * this.lista_censistas.length);
        return this.lista_censistas[random].usuario;
    }

    //Precarga de CENSISTAS Y PERSONAS
    precarga_censistas() {
        this.lista_censistas.push(new Censista("Ignacio", "Nacho", "Na1234"));
        this.lista_censistas.push(new Censista("Juan", "Juanpa", "Ju1234"));
        this.lista_censistas.push(new Censista("M", "Michel", "Mi1234"));

    }
    precarga_personas() {
        this.agregar_precompletado_persona("Javier Fernandez", 16, "27731210", "Lavalleja", "estudiante");
        this.agregar_precompletado_persona("raul Fernandez", 15, "23467893", "Montevideo", "estudiante");
        this.agregar_precompletado_persona("Fabian Techera", 44, "45337163", "Maldonado", "independiente");
        this.agregar_precompletado_persona("Agustina Diaz", 42, "23487695", "Rocha", "dependiente");
        this.agregar_precompletado_persona("Facundo Viñas", 67, "20686608", "Salto", "no_trabaja");
        this.agregar_precompletado_persona("Clara Sanchez", 17, "52537322", "Canelones", "estudiante");
        this.agregar_precompletado_persona("Jeronimo Silveira", 13, "10271778", "Rocha", "estudiante");
        this.agregar_precompletado_persona("Maximo Plada", 47, "52088666", "Maldonado", "indepentiende");
        this.agregar_precompletado_persona("Lucia Pacheco", 52, "22435823", "Montevideo", "dependiente");
        this.agregar_precompletado_persona("Axel Pineda", 28, "15263433", "San Jose", "no_trabaja");
        this.agregar_precompletado_persona("Paloma Ramirez", 76, "41788150", "Flores", "no_trabaja");
        this.agregar_precompletado_persona("Sol gutibarra", 35, "26047488", "Florida", "dependiente");
        this.agregar_precompletado_persona("Lucas Aznarez", 80, "16034827", "Lavalleja", "no_trabaja");
        this.agregar_precompletado_persona("Matias Machado", 22, "56237461", "Treinta y Tres", "independiente");
        this.agregar_precompletado_persona("Luis Torreira", 27, "46874443", "Durazno", "estudiante");
        this.agregar_precompletado_persona2("Regina Duarte", 56, "23546782", "Salto", "dependiente");
        this.agregar_precompletado_persona2("Paolo Guerrero", 12, "27575101", "Artigas", "estudiante");
        this.agregar_precompletado_persona2("Luis Suarez", 35, "14771772", "Rivera", "indepentiende");
        this.agregar_precompletado_persona2("Jairo Muniz", 23, "23860570", "Colonia", "estudiante");
        this.agregar_precompletado_persona2("Victoria Frugoni", 18, "57893262", "Tacuarembo", "no_trabaja");
        this.agregar_precompletado_persona2("Oriana Cal", 29, "55764558", "Soriano", "dependiente");
        this.agregar_precompletado_persona2("Agustina Gutierrez", 35, "32277281", "Paysandu", "independiente");
        this.agregar_precompletado_persona2("Guillermo Guerra", 48, "34176356", "Cerro Largo", "indepentiende");
        this.agregar_precompletado_persona2("Fabian Coito", 52, "20688446", "Rio Negro", "dependiente");
        this.agregar_precompletado_persona2("Lionel Messi", 85, "14205777", "Artigas", "no_trabaja");
        this.agregar_precompletado_persona2("Nahuel Pan", 60, "22444361", "Rio Negro", "no_trabaja");
        this.agregar_precompletado_persona2("Martina De Leon", 30, "40361248", "Cerro Largo", "dependiente");
        this.agregar_precompletado_persona2("Abril Tassi", 40, "41881881", "Soriano", "indepentiende");
        this.agregar_precompletado_persona2("Aldana Luissi", 11, "53985334", "San Jose", "estudiante");
        this.agregar_precompletado_persona2("Gimena Malgarejo", 50, "30123361", "Rivera", "dependiente");
    }



    cargar_select_ci() {
        let string_cedulas = "";
        console.log(this.usuario_logeado)
        for (let i = 0; i < this.lista_censados.length; i++) {
            console.log(this.lista_censados[i])
            if (this.lista_censados[i].usuario_censista == this.usuario_logeado && this.lista_censados[i].isCensado == false) {
                string_cedulas += "<option value='" + this.lista_censados[i].persona.cedula + "'>" + this.lista_censados[i].persona.cedula + "</option>";
                console.log(string_cedulas)
            }
        }
        return string_cedulas;
    }

    cargar_select_censista() {
        let string_censistas = "";
        for (let i = 0; i < this.lista_censistas.length; i++) {
            if (this.lista_censistas[i].usuario != this.usuario_logeado) {
                string_censistas += "<option value='" + this.lista_censistas[i].usuario + "'>" + this.lista_censistas[i].usuario + "</option>";
            }
        }
        return string_censistas;
    }


    // DATOS agrega censista 
    agregar_censo_censista(nombre_apellido, edad, cedula, departamento_residencia, ocupacion) {
        let new_persona = new Persona(nombre_apellido, edad, cedula, departamento_residencia, ocupacion);
        if (this.is_repetido(this.lista_censados, new_persona) == false) {
            this.agregarCenso(new_persona, this.usuario_logeado, true);
            this.id_censista++;
        } else {
            this.modificar_censo(new_persona, true);
        }
        return true;
    }

    // DATOS agrega persona  NO CENSADA
    agregar_precompletado_persona(nombre_apellido, edad, cedula, departamento_residencia, ocupacion) {
        let new_persona = new Persona(nombre_apellido, edad, cedula, departamento_residencia, ocupacion);
        if (this.is_repetido(this.lista_censados, new_persona) == false) {
            let usuario_censista = this.obtenerCensistaAleatorio();
            this.agregarCenso(new_persona, usuario_censista, false);
            this.id_censista++;
        } else {
            this.modificar_censo(new_persona, false);
        }
    }
    // DATOS agrega persona CENSADA
    agregar_precompletado_persona2(nombre_apellido, edad, cedula, departamento_residencia, ocupacion) {
        let new_persona = new Persona(nombre_apellido, edad, cedula, departamento_residencia, ocupacion);
        if (this.is_repetido(this.lista_censados, new_persona) == false) {
            let usuario_censista = this.obtenerCensistaAleatorio();
            this.agregarCenso(new_persona, usuario_censista, true);
            this.id_censista++;
        } else {
            this.modificar_censo(new_persona, true);
        }
    }
    //REGISTRO SESION
    agregar_censista(nombre, usuario, contrasena) {
        let new_censista = new Censista(nombre, usuario, contrasena);
        console.log(new_censista);
        if (this.is_repetido(this.lista_censistas, new_censista) == true) {
            return "Esta repetido";
        }
        if (!(new_censista.is_mayu(contrasena))) {
            return "No cumple los requisitos, intente nuevamente";
        }
        if (!(new_censista.is_min(contrasena))) {
            return "No cumple los requisitos, intente nuevamente";
        }
        if (!(new_censista.is_num(contrasena))) {
            return "No cumple los requisitos, intente nuevamente";
        }
        if (!(new_censista.is_longitud_correcta(contrasena))) {
            return "No cumple los requisitos, intente nuevamente";
        }

        this.lista_censistas.push(new_censista);
        return "";
    }
    // LOGEAR   solo el censista se logea
    is_login(usuario, contrasena) {
        let resultado = false;
        let usuarioLogin = this.buscarUsuario(usuario, contrasena);
        if (usuarioLogin != null) {
            this.usuario_logeado = usuario;
            resultado = true;
        }
        return resultado;
    }

    buscarUsuario(usuario, contrasena) {
        for (let i = 0; i < this.lista_censistas.length; i++) {
            let un_usu = this.lista_censistas[i];
            if (un_usu.usuario == usuario && un_usu.contrasena == contrasena) {
                return un_usu;
            }
        }
        return null;
    }
    /*existeUsuario(usuario, contrasena) {
        for (let i = 0; i < this.lista_censistas.length; i++) {
            let un_usu = this.lista_censistas[i];
            if (un_usu.usuario == usuario && un_usu.contrasena == contrasena) {
                return true;
            }
        }
        return false;
    }*/


    is_repetido(arreglo, objeto) {
        for (let i = 0; i < arreglo.length; i++) {
            if (arreglo[i].is_mismo_objeto(objeto)) {
                return true;
            }
        }
        return false;
    }
    modificar_censo(persona, isCensado) {
        for (let i = 0; i < this.lista_censados.length; i++) {
            if (this.lista_censados[i].persona.cedula == persona.cedula) {
                this.lista_censados[i].persona = persona;
                this.lista_censados[i].isCensado = isCensado;
            }
        }
    }
    agregarCenso(persona, usuario_censista, isCensado) {
        //validar no exista antes un censo con esa cedula
        if (this.is_repetido(this.lista_censados, persona) == false) {
            let nuevo_censo = new Censo(persona, usuario_censista, isCensado)
            this.lista_censados.push(nuevo_censo);
        }
    }

    // OBTENEMOS LOS NUMEROS DE LA CEDULA
    obtener_numeros_cedula(lacedula) {
        let numeros = "";
        for (let i = 0; i < lacedula.length; i++) {
            if (isNaN(lacedula[i]) == false) {
                numeros += lacedula[i];
            }
        }
        return numeros;
    }

    reasignar(usuario_censista, cedula) {
        let posicion = this.obtener_posicion_precompletado(cedula);
        this.lista_censados[posicion].usuario_censista = usuario_censista;
    }
    obtener_posicion_precompletado(cedula) {
        let posicion = -2;
        for (let i = 0; i < this.lista_censados.length; i++) {
            //console.log(this.lista_censados[i].persona.cedula);
            // console.log(cedula);
            // console.log(this.lista_censados[i].persona.cedula == cedula);
            if (this.lista_censados[i].persona.cedula == cedula) {
                console.log(this.lista_censados[i].isCensado == false)
                if (this.lista_censados[i].isCensado == false) {
                    return i;
                } else {
                    return -1;
                }
            }
        }
        return posicion;
    }

    
    // CARGAMOS LA LISTA   ---------     array lista_departamentos
    llenar_select_departamento_censo() {
        let string_depart = "";
        for (let i = 0; i < this.lista_departamentos.length; i++) {
            string_depart += "<option value='" + this.lista_departamentos[i] + "'>" + this.lista_departamentos[i] + "</option>";
        }
        return string_depart;
    }

    //tabla1
    cargar_personas_censadas(departamento) {
        let cantidad_validados = 0;
        for (let i = 0; i < this.lista_censados.length; i++) {
            if (this.lista_censados[i].persona.departamento_residencia === departamento && this.lista_censados[i].isCensado === true) {
                cantidad_validados++;

            }
        }
        return cantidad_validados;
    }

    //tablas estadisticas censista              ----------------- DEPART / CENSADOS
    //corregir
    obtener_string_tabla_c() {
        let string_tabla = "<tr><th> Departamento </th><th> Censados </th></tr> ";
        let personas_censadas = 0;
        let total_personas_censadas = 0;
        for (let i = 0; i < this.lista_departamentos.length; i++) {
            personas_censadas = this.cargar_personas_censadas(this.lista_departamentos[i]);
            string_tabla += "<tr><td>" + this.lista_departamentos[i] + "</td><td>" + personas_censadas + "</td></tr>";
            total_personas_censadas += personas_censadas;
        }
        string_tabla += "<tr><td>TOTAL</td><td>" + total_personas_censadas + "</td></tr>";
        return string_tabla;
    }
    //tabla2: porcentaje PENDIENTES
    cargar_personas_pendientes() {
        let cantidad_pendientes = 0;
        for (let i = 0; i < this.lista_censados.length; i++) {
            if (this.lista_censados[i].isCensado === false) {
                cantidad_pendientes++;

            }
        }
        let string_devolver = "<tr><td>" + (cantidad_pendientes / this.lista_censados.length) * 100 + "</td></tr>";
        return string_devolver;
    }


    //tabla3 mayores y menores
    cargar_mayores(departamento) {
        let cantidad_mayores = 0;

        for (let i = 0; i < this.lista_censados.length; i++) {
            if (this.lista_censados[i].persona.edad >= 18 && this.lista_censados[i].persona.departamento_residencia == departamento) {
                cantidad_mayores++;
            }
        }
        return cantidad_mayores;

    }
    cargar_menores(departamento) {

        let cantidad_menores = 0;
        for (let i = 0; i < this.lista_censados.length; i++) {
            if (this.lista_censados[i].persona.edad < 18 && this.lista_censados[i].persona.departamento_residencia == departamento) {
                cantidad_menores++;
            }
        }
        return cantidad_menores;

    }




    //tabla estadistica persona ------------------------------  TABLA CON ESTADISTICAS X DEPARTAMENTOS  ---- 4 DATOS
    //corregir
    obtener_string_tabla_p() {
        //busamos el elemento tabla, elemento th
        let string_tabla = "<tr><th> Departamento </th><th> Estudian </th><th> Trabajan </th><th> Dependientes e Independientes </th><th> Porcentaje Total </th></tr> ";


    }

    // VALIDACIONES DE INGRESO DE DATOS --------------- INGEESO DATOS
    is_nombre_apellido(nombre_apellido) {
        if (nombre_apellido.length > 0) {
            return true
        }
        return false
    }
    // 0 y 130, es                         
    is_edad(edad) {
        if (edad >= 0 && edad <= 130) {
            return true
        }
        return false;
    }
    is_select_departamento(departamento_residencia) {
        if (departamento_residencia != this.lista_departamentos[0]) {
            return true;
        }
        return false;
    }
    is_select_ocupacion(ocupacion) {
        if (ocupacion != "i_s_error") {
            return true;
        }
        return false;
    }
    is_verificador_valido(cedula) {
        // Si la cédula no tiene entre 7 y 8 dígitos, ya es inválida
        if (!/^\d{7,8}$/.test(cedula)) {
            return false;
        }
    
        // Si tiene 7 dígitos, se le agrega un 0 al inicio
        if (cedula.length === 7) {
            cedula = '0' + cedula;
        }
    
        const cedulaArray = cedula.split("").map(Number);
    
        let sum = 0;
        let factor = 2;  // Algoritmo específico, puede variar según el país
    
        for (let i = cedulaArray.length - 2; i >= 0; i--) {
            sum += cedulaArray[i] * factor;
            factor = (factor === 7) ? 2 : factor + 1;
        }
    
        const remainder = sum % 11;
        const verificador = (11 - remainder) % 10;
    
        // Compara el dígito verificador con el último dígito
        return verificador === cedulaArray[cedulaArray.length - 1];
    }
}


