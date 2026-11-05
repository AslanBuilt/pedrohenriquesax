-- O Pedro pediu em 05/11/2026: em "Big bands e orquestras", só os grupos, sem os
-- artistas acompanhados. E faltava a Banda Sinfônica de Tatuí.
DELETE FROM "Credential"
WHERE "context" = 'big_band'
  AND "artist" NOT ILIKE 'Banda%'
  AND "artist" NOT ILIKE 'Orquestra%'
  AND "artist" NOT ILIKE 'Big Band%';

INSERT INTO "Credential" ("id", "artist", "context", "sortOrder")
SELECT gen_random_uuid()::text, 'Banda Sinfônica de Tatuí', 'big_band', -2
WHERE NOT EXISTS (SELECT 1 FROM "Credential" WHERE "artist" ILIKE '%Sinfônica de Tatuí%');

-- A ordem que ele ditou. O sortOrder é global, então negativo vem antes de tudo.
UPDATE "Credential" SET "sortOrder" = -3 WHERE "context" = 'big_band' AND "artist" ILIKE 'Banda Sinfônica da Escola%';
UPDATE "Credential" SET "sortOrder" = -1 WHERE "context" = 'big_band' AND "artist" ILIKE 'Orquestra Sinfônica Vil%';
