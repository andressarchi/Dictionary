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
                resultDiv.textContent = `Traducción:  ${isEnglish ? item.spanish : item.english}`; // Mostrar traducción
                return; // Detener la función
            }
        }
    }

    resultDiv.textContent = 'Palabra no encontrada.'; // Si no hay coincidencia, mostrar mensaje
}

// Función para mostrar palabras de una categoría
function showCategoryWords(categoryName) {
    const category = dictionary.categories[categoryName]; // Obtener la categoría

    if (!category) { // Si la categoría no existe
        wordListContainer.innerHTML = '<p>Categoría no encontrada.</p>'; // Mostrar mensaje
        return; // Detener la ejecución
    }

    wordListContainer.innerHTML = ''; // Limpiar contenido previo

    // Recorrer palabras de la categoría y mostrarlas
    for (const word of category) {
        const listItem = document.createElement('p'); // Crear un elemento <p>
        listItem.textContent = ` ingles -${word.english} / español- ${word.spanish} `; // Asignar texto con las palabras
        wordListContainer.appendChild(listItem); // Agregar al contenedor
    }
}

// Asignar evento al botón de traducir
translateButton.addEventListener('click', translateWord);

// Asignar eventos a los botones de categorías
categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const categoryId = event.target.id.replace('btn-', ''); // Obtener nombre de la categoría
        showCategoryWords(categoryId); // Mostrar palabras de la categoría
    });
});
