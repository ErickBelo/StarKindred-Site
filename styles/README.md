# Organização de estilos

Esta pasta será usada para separar os estilos por página sem quebrar o CSS legado.

- `index.css`: estilos exclusivos da homepage.
- `admin.css`: estilos exclusivos do painel administrativo.
- `shared.css`: somente tokens e regras realmente compartilhados.

O CSS inline atual da `index.html` deve ser migrado gradualmente, sempre preservando os `class` e `id` existentes.
