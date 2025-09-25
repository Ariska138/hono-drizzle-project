import { db } from './index.js';
import { santri } from './schema.js';

async function main() {
  await db.insert(santri).values([
    { id: 1, nama: 'Ahmad Fauzi', angkatan: 2023 },
    { id: 2, nama: 'Muhammad Rizky', angkatan: 2024 },
    { id: 3, nama: 'Alwi Saputra', angkatan: 2025 },
  ]);

  console.log(' Data santri berhasil di-seed');
}

main();
