-- O Pedro pediu em 05/11/2026: em "Festivais", só festivais, sem artistas.
DELETE FROM "Credential"
WHERE "context" = 'festival'
  AND ("artist" ILIKE 'Ari Colares%' OR "artist" ILIKE '%Salmaso%');
