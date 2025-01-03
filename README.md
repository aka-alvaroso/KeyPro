# **TypeMaster**

¡Pon a prueba tu velocidad y precisión al escribir con **TypeMaster**! 🚀  
Un test de mecanografía dinámico y personalizable para mejorar tus habilidades y competir contigo mismo o con otros.

## **Características**
- Generación automática de textos basados en dificultad.
- Modos de juego:
  - **Por texto completo**: Escribe hasta completar el texto.
  - **Por tiempo**: Escribe tanto como puedas en el tiempo definido.
- Estadísticas detalladas:
  - Velocidad promedio (palabras/minuto).
  - Precisión promedio.
  - Mejor puntuación, entre otras.
- Acceso sin registro o con historial guardado (usuarios registrados).
- Totalmente personalizable: cambia dificultad, duración, y más.

## **Tecnologías Usadas**
- **Frontend**: React.js + TailwindCSS.
- **Backend**: Node.js + Express.js.
- **Base de Datos**: MongoDB Atlas.
- **Autenticación**: JWT.
- **Gestión de Estado**: Context API.
- **HTTP Requests**: Axios.

## **Instalación y Configuración**
### **Requisitos Previos**
- Node.js (v16+ recomendado)
- MongoDB Atlas o MongoDB local.
- Gestor de paquetes (npm o yarn)

### **Pasos**
1. Clona el repositorio:
   ```bash
   git clone https://github.com/aka-alvaroso/TypeMaster.git
   cd TypeMaster
   ```
2. Configura las variables de entorno:
   - Crea un archivo `.env` en el directorio raíz del backend con:
     ```env
     MONGO_URI=<tu-url-de-mongodb>  *Obligatorio
     JWT_SECRET=<tu-clave-secreta>  *Obligatorio
     PORT=<tu-puerto>               #Por defecto: 3001
     FRONTEND_URL=<url-frontend>    #Por defecto: 'http://localhost:3000'
     ```
   - Crea un archivo `.env` en el directorio del frontend con:
     ```env
     VITE_API_URL=<url-backend>     *Obligatorio
     ```
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Inicia la aplicación:
   ```bash
   npm start
   ```
5. Accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## **Cómo Usar**
1. Inicia la aplicación.
2. Personaliza tu prueba seleccionando dificultad, duración, y tipo de texto.
3. ¡Empieza a escribir y revisa tus estadísticas al final!

## **Contribución**
¡Contribuciones son bienvenidas! Si encuentras algún error o tienes ideas de nuevas funcionalidades:
1. Haz un fork del repositorio.
2. Crea un branch para tu feature o fix.
3. Envía un pull request con una descripción clara.

## **Licencia**
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
