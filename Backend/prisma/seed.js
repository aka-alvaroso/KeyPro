require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Mapeo fichero → metadatos de tipo e idioma
const FILE_META = {
  'text-es.json':         { type: 'text', language: 'es' },
  'text-en.json':         { type: 'text', language: 'en' },
  'code-javascript.json': { type: 'code', language: 'javascript' },
  'code-python.json':     { type: 'code', language: 'python' },
  'code-cpp.json':        { type: 'code', language: 'c++' },
  'code-html.json':       { type: 'code', language: 'html' },
  'code-java.json':       { type: 'code', language: 'java' },
};

async function main() {
  const textsDir = path.join(__dirname, 'texts');
  const files = fs.readdirSync(textsDir).filter(f => f.endsWith('.json'));

  let total = 0;

  for (const file of files) {
    const meta = FILE_META[file];
    if (!meta) { console.warn(`  ⚠ Sin metadatos para ${file}, omitido`); continue; }

    const entries = JSON.parse(fs.readFileSync(path.join(textsDir, file), 'utf-8'));
    if (entries.length === 0) continue;

    const data = entries.map(e => ({
      content:    e.content,
      difficulty: e.difficulty,
      length:     e.length,
      type:       meta.type,
      language:   meta.language,
    }));

    await prisma.text.createMany({ data, skipDuplicates: true });
    console.log(`  ✓ ${file}: ${data.length} textos`);
    total += data.length;
  }

  console.log(`\nSeed completado: ${total} textos insertados.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
