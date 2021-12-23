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
    result: [] (resultado exitoso de la petición),
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

### Modelo esperado
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

### Retorno

```javascript
{
    ID: number,
    NOMBRE: string,
    APELLIDOS: string,
    CORREO: string
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

### Modelo esperado
```javascript
{
    CLAVE: string (contraseña),
    CORREO: string,
} 
```

### Retorno

```javascript
{
    ID: number,
    NOMBRE: string,
    APELLIDOS: string,
    CORREO: string
} 
```