# Especificaciones Técnicas

## Contenido
1. [General](#general)
2. [Home](#home)
3. [Creación de cuentas](#creacion_cuentas)
4. [Login](#login)
5. [Usuarios](#users)


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
<a id="home"></a>
## Home

### Endpoint
### Video de presentación
```
localhost:3000/video
```
Solo ingresar lo siguiente dentro de la etiqueta `<video>`
```html
<source src="http://localhost:3000/video" type="video/mp4">
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
- DELETE

### Modelo esperado
### Post
```javascript
{
    AUTOR: {
        ID: number,
        DESCRIPCION: string
    }( solo si la cuenta fue creada por un admin, cuentas de clientes enviar null),
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
    AUTOR: {
        ID: number (cuenta de admin),
        DESCRIPCION: string
    }( solo si la cuenta fue editada por un admin, cambios de clientes enviar null),
    ID: number (cuenta afectada),
    NOMBRE: string,
    APELLIDOS: string,
    TELEFONO: number,
    FOTO: null (por el momento),
    GENERO: 'M' (masculino) o 'F' (femenino),
    FECHA_NAC: string (YYYY-MM-DD),
    DIRECCION: string,
    PAIS: string,
    TIPO: 'N' (cliente normal) / 'A' (administrador) / 'E' (empleado) / 'P' (cliente premium)
    REGISTRADO: 0 / 1
} 
```
### Delete
Enviar parámetros en ruta, en descripción enviar texto con espacios reemplazados por '_'.
```
localhost:3000/register/:admin/:cuenta/:descripcion
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

<a id="users"></a>
## Usuarios

### Endpoint

```
localhost:3000/users
```

### Métodos
- GET

### Retorno
```javascript
[
    {
        ID: number,
        NOMBRE: string,
        APELLIDOS: string,
        TELEFONO: number,
        GENERO: string,
        FECHA_NAC: string,
        CORREO: string,
        DIRECCION: string, 
        PAIS: string,
        TIPO: string (misma nomenclatura de la cración de cuenta),
        REGISTRADO: number
    }, 
    ...
] 
```