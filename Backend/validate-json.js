const fs = require("fs");
const path = require("path");

// Asegúrate de que la ruta al archivo JSON sea correcta
const textsPath = path.join(__dirname, "..", "Texts", "all-texts.json");

try {
  const texts = JSON.parse(fs.readFileSync(textsPath, "utf-8"));

  console.log(`Cargadas ${texts.length} entradas del JSON.`);

  const missingFields = [];

  texts.forEach((text, index) => {
    const missing = [];
    if (text.type === undefined || text.type === null) {
      missing.push("type");
    }
    if (text.difficulty === undefined || text.difficulty === null) {
      missing.push("difficulty");
    }
    if (text.numWords === undefined || text.numWords === null) {
      missing.push("numWords");
    }

    // Si el campo 'type' existe pero no es un valor válido del enum
    if (text.type && !["normal", "code", "text"].includes(text.type)) {
      missing.push(`type (valor inválido: '${text.type}')`);
    }
    // Si el campo 'difficulty' existe pero no es un valor válido del enum
    if (
      text.difficulty &&
      !["easy", "medium", "hard"].includes(text.difficulty)
    ) {
      missing.push(`difficulty (valor inválido: '${text.difficulty}')`);
    }

    if (missing.length > 0) {
      missingFields.push({
        index: index, // Índice en el array (documento número)
        line: null, // No podemos obtener la línea exacta aquí directamente, pero el índice ayuda
        data: text, // Incluye el objeto completo para referencia
        missing: missing,
      });
    }
  });

  if (missingFields.length > 0) {
    console.error("\n--- ERRORES EN EL JSON ---");
    missingFields.forEach((error) => {
      console.error(
        `Documento #${error.index + 1} (en la línea aproximada ${
          error.index * 5 + 1
        } del JSON):`
      ); // Aproximación
      console.error(
        `  Campos faltantes o inválidos: ${error.missing.join(", ")}`
      );
      console.error(
        `  Datos del documento: ${JSON.stringify(error.data, null, 2)}`
      ); // Imprime el objeto problemático
      console.error("---");
    });
    console.error(
      `\n¡Se encontraron ${missingFields.length} documentos con errores!`
    );
  } else {
    console.log(
      "\n¡El archivo JSON parece estar bien formado y con todos los campos requeridos y valores de enum válidos!"
    );
  }
} catch (e) {
  console.error("Error al parsear el archivo JSON o al leerlo:", e);
}
