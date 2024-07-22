
### **Clase: Introducción a APIs REST**

#### **Objetivo:**
Comprender cómo funciona una API REST, centrándose en los métodos HTTP GET y POST, y aprender a realizar solicitudes a una API.

#### **1. Fundamentos de APIs REST**

**1.1. ¿Qué es una API REST?**

Una API (Interfaz de Programación de Aplicaciones) REST (Transferencia de Estado Representacional) es un estilo de arquitectura que utiliza el protocolo HTTP para permitir la comunicación entre sistemas. Está diseñada para ser simple y basada en recursos.

**1.2. Recursos y URLs**

En REST, los recursos (como datos de usuario, productos, etc.) son identificados por URLs. Cada URL representa un recurso en el servidor.

**1.3. Métodos HTTP**

- **GET**: Solicita datos del servidor. No debería modificar el estado del recurso en el servidor.
- **POST**: Envía datos al servidor para crear un nuevo recurso. Puede modificar el estado del servidor.

#### **2. Implementación de una API REST**

**2.1. Configuración del Entorno**

Para este ejemplo, usaremos Node.js y Express para crear un servidor básico. Asegúrate de tener Node.js instalado.

**2.2. Crear el Servidor**

1. **Inicializar el Proyecto**

   ```bash
   npm init -y
   ```

   Esto creará un archivo `package.json`.

2. **Instalar Express**

   ```bash
   npm install express
   ```

3. **Crear el Archivo del Servidor**

   Crea un archivo llamado `server.js` con el siguiente contenido:

   ```javascript
   const express = require('express');
   const app = express();
   app.use(express.json()); // Para parsear el cuerpo de la solicitud en formato JSON

   const port = 3000;

   // Endpoint GET
   app.get('/items', (req, res) => {
     // Respuesta con datos de ejemplo
     res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
   });

   // Endpoint POST
   app.post('/items', (req, res) => {
     const newItem = req.body; // El nuevo item enviado en el cuerpo de la solicitud
     // Normalmente se guardaría en una base de datos
     res.status(201).json(newItem); // Respuesta con el nuevo item creado
   });

   app.listen(port, () => {
     console.log(`Server running on http://localhost:${port}`);
   });
   ```

4. **Ejecutar el Servidor**

   ```bash
   node server.js
   ```

   Esto iniciará el servidor en `http://localhost:3000`.

#### **3. Realizar Solicitudes a la API**

**3.1. Usar Fetch API**

Para realizar solicitudes desde el navegador, puedes usar la Fetch API.

**Ejemplo GET:**

```javascript
fetch('http://localhost:3000/items')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Ejemplo POST:**

```javascript
fetch('http://localhost:3000/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id: 3, name: 'Item 3' }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**3.2. Usar Postman**

Postman es una herramienta gráfica para probar APIs.

- **GET Request:**
  - Selecciona el método GET.
  - Introduce `http://localhost:3000/items` en la barra de URL.
  - Haz clic en "Send" para ver la respuesta.

- **POST Request:**
  - Selecciona el método POST.
  - Introduce `http://localhost:3000/items` en la barra de URL.
  - Ve a la pestaña "Body", selecciona "raw" y "JSON", y proporciona un JSON como `{ "id": 3, "name": "Item 3" }`.
  - Haz clic en "Send" para enviar la solicitud.

#### **4. Conceptos Clave**

**4.1. Status Codes**

- **200 OK**: Solicitud exitosa (GET).
- **201 Created**: Recurso creado exitosamente (POST).
- **400 Bad Request**: Solicitud incorrecta (e.g., formato de datos inválido).
- **404 Not Found**: Recurso no encontrado.

**4.2. Headers y Body**

- **Headers**: Información adicional en la solicitud o respuesta (e.g., `Content-Type`).
- **Body**: Datos enviados en el cuerpo de la solicitud (especialmente en POST).

#### **5. Buenas Prácticas**

- **Validación de Datos**: Asegúrate de validar los datos recibidos y enviados.
- **Manejo de Errores**: Implementa una gestión adecuada de errores para proporcionar mensajes claros.



¡Claro! Vamos a abordar qué es CRUD y cómo se relaciona con las API REST.

### **Concepto de CRUD**

**CRUD** es un acrónimo que representa las cuatro operaciones básicas que se pueden realizar sobre un recurso en una base de datos. Estas operaciones son:

- **C**reate (Crear): Añadir un nuevo registro.
- **R**ead (Leer): Obtener información de uno o más registros.
- **U**pdate (Actualizar): Modificar un registro existente.
- **D**elete (Eliminar): Borrar un registro existente.

### **Relación de CRUD con API REST**

Las API REST (Representational State Transfer) están diseñadas para permitir la interacción con recursos en un servidor a través de HTTP. Las operaciones CRUD se mapean directamente a los métodos HTTP utilizados por una API REST. A continuación, se muestra cómo se relacionan:

#### **1. Create (Crear) - POST**

La operación de **crear** un nuevo recurso se realiza usando el método **POST**.

- **Endpoint**: `POST /items`
- **Descripción**: Añade un nuevo item a la lista de items.
- **Ejemplo**:

  ```javascript
  fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 3, name: 'Item 3' }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

#### **2. Read (Leer) - GET**

La operación de **leer** información de los recursos se realiza usando el método **GET**.

- **Endpoint**: `GET /items`
- **Descripción**: Obtiene la lista de todos los items.
- **Ejemplo**:

  ```javascript
  fetch('http://localhost:3000/items')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

Para obtener un único recurso, podría ser algo como:

- **Endpoint**: `GET /items/{id}`
- **Descripción**: Obtiene la información de un item específico.
- **Ejemplo**:

  ```javascript
  fetch('http://localhost:3000/items/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

#### **3. Update (Actualizar) - PUT/PATCH**

La operación de **actualizar** un recurso existente se realiza usando los métodos **PUT** o **PATCH**.

- **PUT**: Se utiliza para actualizar completamente un recurso.
- **PATCH**: Se utiliza para actualizar parcialmente un recurso.

- **Endpoint**: `PUT /items/{id}`
- **Descripción**: Actualiza completamente un item específico.
- **Ejemplo**:

  ```javascript
  fetch('http://localhost:3000/items/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 1, name: 'Updated Item 1' }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

#### **4. Delete (Eliminar) - DELETE**

La operación de **eliminar** un recurso se realiza usando el método **DELETE**.

- **Endpoint**: `DELETE /items/{id}`
- **Descripción**: Elimina un item específico.
- **Ejemplo**:

  ```javascript
  fetch('http://localhost:3000/items/1', {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  ```

### **Resumen de la Relación CRUD con API REST**

| Operación | Método HTTP | Endpoint                | Descripción                          |
|-----------|-------------|-------------------------|--------------------------------------|
| Create    | POST        | /items                  | Crear un nuevo item                  |
| Read      | GET         | /items                  | Obtener todos los items              |
| Read      | GET         | /items/{id}             | Obtener un item específico           |
| Update    | PUT/PATCH   | /items/{id}             | Actualizar un item específico        |
| Delete    | DELETE      | /items/{id}             | Eliminar un item específico          |

### **Conclusión**

Las operaciones CRUD son fundamentales para interactuar con recursos en aplicaciones web, y se mapean directamente a los métodos HTTP en las API REST. Este mapeo permite que las APIs REST sean intuitivas y fáciles de usar, proporcionando una forma estándar de realizar operaciones de creación, lectura, actualización y eliminación de datos.