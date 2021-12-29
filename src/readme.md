# Especificaciones Técnicas

## Contenido
1. [General](#general)
2. [Creación de cuentas](#creacion_cuentas)
3. [Login](#login)


<a id="general"></a>
## General
Toda respuesta a una petición regresará un objeto JSON.
### Estructura
```javascript
{
    result: {} (resultado exitoso de la petición),
    errors: [] (de existir algún error, se agregará a la lista)
} 
```

<a id="creacion_cuentas"></a>
## Creación de cuentas

### Endpoint

```
localhost:3000/register
```

### Métodos
- POST
- PUT

### Modelo esperado
### Post
```javascript
{
    NOMBRE: string,
    APELLIDOS: string,
    CLAVE: string (contraseña),
    CORREO: string,
    TELEFONO: number,
    FOTO: null (por el momento),
    GENERO: 'M' (masculino) o 'F' (femenino),
    FECHA_NAC: string (YYYY-MM-DD),
    DIRECCION: string,
    PAIS: string,
    TIPO: 'N' (cliente normal) / 'A' (administrador) / 'E' (empleado) / 'P' (cliente premium)
} 
```
### Put
```javascript
{
    ID_ADMIN: number,
    DESCRIPCION: string,
    CUENTA: {
        NOMBRE: string,
        APELLIDOS: string,
        TELEFONO: number,
        FOTO: null (por el momento),
        GENERO: 'M' (masculino) o 'F' (femenino),
        FECHA_NAC: string (YYYY-MM-DD),
        DIRECCION: string,
        PAIS: string,
        TIPO: 'N' (cliente normal) / 'A' (administrador) / 'E' (empleado) / 'P' (cliente premium)
        REGISTRADO: 0 o 1
    } (Información actualizada o con registrado 0 si se congela la cuenta)
} 
```

### Retorno

```javascript
{
    Message: 'Correo enviado'
} 
```
<a id="login"></a>
## Login

### Endpoint

```
localhost:3000/login
```

### Métodos
- POST
- PUT

### Modelo esperado
### Post
```javascript
{
    CLAVE: string (contraseña),
    CORREO: string
} 
```
### Put
```javascript
{
    TOKEN: string (token leído del link enviado por correo)
} 
```

### Retorno
### Post, Put

```javascript
{
    ID: number,
    NOMBRE: string,
    APELLIDOS: string,
    CORREO: string,
    TIPO: string (misma nomenclatura de la cración de cuenta)
} 
```