// Importar el objeto del diccionario desde el archivo dictionary.js
import { dictionary } from './dictionary.js';

// Obtener elementos del DOM
const wordInput = document.getElementById('word'); // Campo de texto donde el usuario ingresa palabras
const translateButton = document.getElementById('btn-traslate'); // Botón para traducir palabras
const resultDiv = document.querySelector('.result p'); // Elemento donde se mostrará el resultado
const categoryButtons = document.querySelectorAll('.list-word input[type="radio"]'); // Botones de selección de categorías
const wordListContainer = document.querySelector('.container-list-word'); // Contenedor para listar palabras de categorías
