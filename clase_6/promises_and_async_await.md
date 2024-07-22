

### **Clase: Promises y Async/Await en JavaScript**

#### **Objetivo:**
Entender el concepto de Promises en JavaScript y cómo `async/await` facilita el manejo de operaciones asíncronas.

### **1. Promises**

#### **1.1. ¿Qué es una Promesa?**

Una Promesa es un objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante.

#### **1.2. Estados de una Promesa**

Una Promesa puede estar en uno de los siguientes estados:
- **Pending (Pendiente)**: Estado inicial, no cumplida ni rechazada.
- **Fulfilled (Cumplida)**: La operación se completó con éxito.
- **Rejected (Rechazada)**: La operación falló.

#### **1.3. Crear una Promesa**

Puedes crear una promesa utilizando el constructor `Promise`:

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Operación asíncrona
  let success = true; // Simula el resultado de una operación

  if (success) {
    resolve('Operation was successful!'); // Resuelve la promesa
  } else {
    reject('Operation failed!'); // Rechaza la promesa
  }
});
```

#### **1.4. Manejo de Promesas**

Usamos los métodos `.then()` y `.catch()` para manejar promesas:

```javascript
myPromise
  .then((result) => {
    console.log(result); // Maneja el resultado cuando la promesa se resuelve
  })
  .catch((error) => {
    console.error(error); // Maneja el error cuando la promesa se rechaza
  });
```

#### **1.5. Ejemplo Completo con Promesas**

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'John Doe' };
      resolve(data);
    }, 2000);
  });
}

fetchData()
  .then((data) => {
    console.log('Data received:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### **2. Async/Await**

`async/await` es una sintaxis que simplifica el trabajo con promesas y hace que el código asíncrono se parezca más al código síncrono.

#### **2.1. Funciones Asíncronas**

Una función marcada con `async` siempre devuelve una promesa.

```javascript
async function myAsyncFunction() {
  return 'Hello, world!';
}

myAsyncFunction().then((result) => console.log(result)); // Hello, world!
```

#### **2.2. La Palabra Clave `await`**

`await` se usa para esperar una promesa. Solo se puede usar dentro de funciones `async`.

```javascript
async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json();
  return data;
}

fetchData().then((data) => console.log(data));
```

#### **2.3. Manejo de Errores con `async/await`**

Usamos `try/catch` para manejar errores en funciones asíncronas.

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
```

### **3. Comparación y Uso**

#### **3.1. Promesas vs `async/await`**

- **Promesas**: Uso explícito de `.then()` y `.catch()`. Puede resultar en un "callback hell" si no se maneja adecuadamente.
- **`async/await`**: Sintaxis más limpia y fácil de leer. Manejo de errores con `try/catch`.

#### **3.2. Ejemplo Completo con `async/await`**

```javascript
async function getUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    console.log('User data:', user);
  } catch (error) {
    console.error('Error:', error);
  }
}

getUserData();
```

### **4. Ejercicio Práctico**

#### **4.1. Descripción**

Escribe una función asíncrona que obtenga datos de dos endpoints diferentes y los combine.

#### **4.2. Endpoints**

- `https://jsonplaceholder.typicode.com/users/1`
- `https://jsonplaceholder.typicode.com/posts?userId=1`

#### **4.3. Solución**

```javascript
async function getUserAndPosts() {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users/1'),
      fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    ]);

    const user = await userResponse.json();
    const posts = await postsResponse.json();

    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
  }
}

getUserAndPosts().then((data) => console.log(data));
```

### **Conclusión**

Las Promises y `async/await` son herramientas poderosas para manejar operaciones asíncronas en JavaScript. Las Promises proporcionan una forma robusta de trabajar con tareas asíncronas, mientras que `async/await` ofrece una sintaxis más simple y legible. Ambas técnicas son esenciales para escribir código moderno y eficiente en JavaScript.

