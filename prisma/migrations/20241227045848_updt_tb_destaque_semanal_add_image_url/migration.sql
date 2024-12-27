-- AlterTable
ALTER TABLE
  "DestaqueSemanal"
ADD
  COLUMN "imageUrl" TEXT NOT NULL DEFAULT 'default_image_url';

INSERT INTO
  "DestaqueSemanal" (
    id,
    "titulo",
    "descricao",
    "updatedAt",
    "updatedBy",
    "imageUrl"
  )
VALUES
  (
    1,
    'Toyota SW4 from DB',
    'Destaque nos aspectos em que os outros se perdem na multidão. Jovem, dinâmico e urbano, com equipamentos de série completos, características de design exclusivas do modelo e, é claro, o tradicional desempenho Toyota.',
    NOW(),
    'SyncUp Brasil',
    'https://syncup-dealership-model.s3.us-east-1.amazonaws.com/sw4.jpeg'
  );