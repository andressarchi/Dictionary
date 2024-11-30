// Importar el objeto del diccionario desde el archivo dictionary.js
import { dictionary } from './dictionary.js';

// Obtener elementos del DOM
const wordInput = document.getElementById('word'); // Campo de texto donde el usuario ingresa palabras
const translateButton = document.getElementById('btn-traslate'); // Botón para traducir palabras
const resultDiv = document.querySelector('.result p'); // Elemento donde se mostrará el resultado
const categoryButtons = document.querySelectorAll('.list-word input[type="radio"]'); // Botones de selección de categorías
const wordListContainer = document.querySelector('.container-list-word'); // Contenedor para listar palabras de categorías

// Función para traducir palabras
function translateWord() {
    const word = wordInput.value.trim().toLowerCase(); // Obtener palabra ingresada, eliminando espacios y convirtiendo a minúsculas
    const isEnglish = document.getElementById('button-inglesh').checked; // Verificar si se seleccionó el idioma inglés

    if (!word) { // Si no se ingresó ninguna palabra
        resultDiv.textContent = 'Por favor, ingresa una palabra.'; // Mostrar mensaje
        return; // Detener la ejecución
    }

    // Recorrer categorías del diccionario
    for (const category in dictionary.categories) {
        for (const item of dictionary.categories[category]) {
            // Comparar palabra ingresada con las palabras del diccionario
            if ((isEnglish && item.english.toLowerCase() === word) ||
                (!isEnglish && item.spanish.toLowerCase() === word)) {
                resultDiv.textContent = `Traducción: ${isEnglish ? item.spanish : item.english}`; // Mostrar traducción
                return; // Detener la función
            }
        }
    }

    resultDiv.textContent = 'Palabra no encontrada.'; // Si no hay coincidencia, mostrar mensaje
}
