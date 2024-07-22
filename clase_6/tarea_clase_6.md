### Tarea: Desarrollo de un Juego de Batallas Pokémon en React

#### **Objetivo:**
Desarrollar un juego de batallas Pokémon usando React y la API de PokéAPI. El juego permitirá que dos jugadores seleccionen su Pokémon y luchen por turnos.

### **Requisitos:**

1. **Configuración Inicial del Proyecto (5 puntos)**
   - Crear una nueva aplicación de React utilizando Create React App.
   - Instalar Axios para realizar las solicitudes a la API de PokéAPI.
   - Configurar la estructura básica del proyecto.

2. **Interfaz de Usuario (10 puntos)**
   - Crear una interfaz de usuario simple con un diseño atractivo.
   - Incluir áreas para la selección de Pokémon para dos jugadores.
   - Mostrar la lista de Pokémon disponibles para la selección.

3. **Consumo de la API de PokéAPI (10 puntos)**
   - Realizar una solicitud a la API de PokéAPI para obtener la lista de Pokémon.
   - Mostrar la lista de Pokémon en la interfaz de usuario.
   - Asegurate de usar los metodos de React, useState, useEffect, creando un **Custom Hook**

4. **Selección de Pokémon (15 puntos)**
   - Implementar la lógica para que cada jugador pueda seleccionar un Pokémon.
   - Mostrar la imagen y las estadísticas básicas (como HP, ataque, defensa) del Pokémon seleccionado.
   - Validar que los jugadores no puedan seleccionar el mismo Pokémon.

5. **Sistema de Turnos (20 puntos)**
   - Implementar un sistema de turnos que permita a los jugadores atacar uno tras otro.
   - Mostrar en la interfaz de usuario de quién es el turno actual.
   - Implementar botones para atacar y cambiar de turno.

6. **Lógica de Batalla (25 puntos)**
   - Implementar la lógica de ataque utilizando las estadísticas del Pokémon (por ejemplo, ataque y defensa).
   - Reducir los puntos de vida (HP) del Pokémon oponente en cada ataque.
   - Finalizar el juego cuando uno de los Pokémon llegue a 0 HP.
   - Mostrar el ganador en la interfaz de usuario.

7. **Animaciones y Efectos (10 puntos) Extra**
   - Añadir animaciones y efectos visuales para los ataques.
   - Hacer que la batalla sea más dinámica y visualmente atractiva.

8. **Optimización y Mejora de la Experiencia del Usuario (5 puntos) Extra**
   - Asegurarse de que la aplicación sea responsiva y funcione bien en diferentes tamaños de pantalla.
   - Añadir mensajes y alertas para mejorar la experiencia del usuario (por ejemplo, "Jugador 1 ha seleccionado Pikachu").


### **Puntaje Total: 100 puntos (85+15 Extra)**

### **Recursos Adicionales:**
- **Documentación de la API de PokéAPI**: [PokéAPI](https://pokeapi.co/docs/v2)
- **Create React App**: [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- **Axios**: [Axios](https://axios-http.com/docs/intro)

