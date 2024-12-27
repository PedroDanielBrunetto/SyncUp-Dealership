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
    'Toyota SW4',
    'Destaque nos aspectos em que os outros se perdem na multidão. Jovem, dinâmico e urbano, com equipamentos de série completos, características de design exclusivas do modelo e, é claro, o tradicional desempenho Toyota.',
    NOW(),
    'SyncUp Brasil',
    'https://fotos-jornaldocarro-estadao.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2024/04/19094642/toyota-sw4-hybrid-mhev-1.jpg'
  );