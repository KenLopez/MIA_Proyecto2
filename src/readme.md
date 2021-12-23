# Especificaciones Técnicas

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