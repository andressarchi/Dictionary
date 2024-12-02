// Importar el objeto del diccionario desde el archivo dictionary.js
import { dictionary } from './dictionary.js';

// Elementos del DOM
const wordInput = document.getElementById('word'); 
const translateButton = document.getElementById('btn-traslate'); 
const resultDiv = document.querySelector('.result p'); 
const categoryButtons = document.querySelectorAll('.list-word input[type="radio"]'); 
const wordListContainer = document.querySelector('.container-list-word'); 
const englishInput = document.getElementById('new-word-english');
const spanishInput = document.getElementById('new-word-spanish');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const addButton = document.getElementById('btn-add-word');
const addResult = document.getElementById('add-result');
const example= document.getElementById('new-word-example')




// Función para agregar una palabra al diccionario
function addWord() {
    const englishWord = englishInput.value.trim();
    const spanishWord = spanishInput.value.trim();
    const exampleWord= example.value.trim();
    let selectedCategory = null;

    // Obtener la categoría seleccionada
    for (const radio of categoryRadios) {
        if (radio.checked) {
            selectedCategory = radio.value;
            break;
        }
    }

    // Validar que todos los campos estén llenos
    if (!englishWord || !spanishWord || !selectedCategory ||!exampleWord) {
        addResult.textContent = 'Por favor, completa todos los campos y selecciona una categoría.';
        addResult.style.color = 'red';
        return;
    }

    // Crear el objeto de la nueva palabra
    const newWord = {
        english: englishWord,
        spanish: spanishWord,
        example:exampleWord
    };

    // Agregar la nueva palabra a la categoría seleccionada
    if (dictionary.categories[selectedCategory]) {
        dictionary.categories[selectedCategory].push(newWord);
        addResult.textContent = `Palabra "${englishWord}" añadida a la categoría "${selectedCategory}".`;
        addResult.style.color = 'green';
    } else {
        addResult.textContent = 'Categoría no válida.';
        addResult.style.color = 'red';
    }

    // Limpiar los campos de entrada
    englishInput.value = '';
    spanishInput.value = '';
    categoryRadios.forEach(radio => (radio.checked = false)); // Desmarcar radios
}

// Evento para el botón de agregar palabra
addButton.addEventListener('click', addWord);



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
                resultDiv.textContent = `Traducción:  ${isEnglish ? item.spanish: item.english}`; // Mostrar traducción
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
        listItem.textContent = ` ${word.english} -> ${word.spanish} (ejemplo: ${word.example})    `; // Asignar texto con las palabras
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
