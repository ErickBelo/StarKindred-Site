# StarKindred — Direção visual da homepage

## Versão 2 — composição “Go Beyond”

Esta direção substitui a abordagem de homepage composta por vários blocos independentes por uma experiência mais cinematográfica, compacta e hierárquica, inspirada na referência espacial enviada.

A referência deve ser usada como **modelo de composição, profundidade e ritmo visual**, não como uma interface a ser copiada literalmente.

O conceito central da nova homepage é:

> **A StarKindred é uma frota competitiva atravessando Valhalla: uma comunidade de Brawlhalla apresentada como uma constelação viva de jogadores, arenas e conquistas.**

A página deve parecer a capa interativa de um universo próprio. O primeiro impacto precisa comunicar imediatamente:

- espaço;
- aventura;
- competitividade;
- comunidade;
- identidade StarKindred;
- Brawlhalla.

---

## 1. Objetivo da reformulação

A homepage atual já possui os conteúdos necessários, mas precisa se aproximar da referência em quatro pontos principais:

1. **Uma composição principal dominante**, em vez de vários elementos com o mesmo peso.
2. **Um grande objeto visual no lado direito**, equivalente ao planeta da referência.
3. **Cards flutuantes e sobrepostos**, criando profundidade.
4. **Uma faixa inferior integrada ao Hero**, funcionando como navegação editorial para o restante da página.

O resultado não deve parecer um dashboard gamer, painel administrativo ou HUD militar. Deve parecer uma **landing page espacial premium, editorial e ilustrada**.

---

## 2. Tradução da referência para a StarKindred

| Elemento da referência | Adaptação para StarKindred |
| --- | --- |
| Logo “SPACE” | Logo `STARKINDRED` |
| Título “GO BEYOND” | `RUMO ÀS ESTRELAS` |
| Planeta Terra no lado direito | Demon Island tratada como “planeta-arena” ou grande composição circular |
| Astronauta | Mascote, silhueta de guerreiro ou render de uma lenda de Brawlhalla |
| Card “Concept of space” | Card editorial sobre a comunidade ou manifesto da frota |
| Palavra “SPACE” em contorno | Palavra `STARKINDRED`, `VALHALLA` ou `FROTA` em outline |
| Painel inferior de planetas | Painel com caminhos da comunidade: Evolução, Tripulação e Torneios |
| Card central elevado | Destaque principal para `TRIPULAÇÃO` ou `ALISTE-SE` |
| Botão “Explore” | `ALISTAR-SE` ou `EXPLORAR A FROTA` |

---

## 3. Conceito visual

### Frase de direção

> **Quartel-general espacial competitivo apresentado como uma capa editorial de ficção científica.**

### Personalidade

- cósmica;
- sofisticada;
- competitiva;
- misteriosa;
- acolhedora;
- jovem;
- energética;
- ilustrada;
- memorável.

### Sensação esperada

Ao abrir a página, o usuário deve sentir que entrou em uma base escondida entre estrelas, não apenas em um site de clã.

A homepage precisa equilibrar dois lados:

- **aventura e fantasia**, representadas pela arte de Brawlhalla;
- **organização e competição**, representadas por rankings, membros e torneios.

---

## 4. Hierarquia geral da página

```text
Header leve e flutuante
  ↓
Hero cinematográfico em tela ampla
  ├── título central
  ├── card editorial à esquerda
  ├── personagem/mascote flutuante
  ├── Demon Island em grande escala à direita
  └── painel inferior sobreposto
  ↓
Manifesto / Sobre a StarKindred
  ↓
Três caminhos da comunidade
  ↓
O jeito StarKindred
  ↓
Membros e pilotos de elite
  ↓
Arena e torneios
  ↓
Convite para o Discord
  ↓
Rodapé editorial
```

O Hero deve concentrar a maior parte da identidade. As seções seguintes continuam o mesmo universo visual, mas com menos elementos decorativos.

---

## 5. Sistema de cores

A paleta atual pode ser mantida como identidade da marca, porém deve ser reorganizada para se aproximar da referência.

### Paleta principal

| Função | Cor | Uso |
| --- | --- | --- |
| Fundo espacial | `#090512` | Fundo principal |
| Roxo profundo | `#160925` | Gradientes, painéis e áreas de profundidade |
| Azul noturno | `#071426` | Cards e transições |
| Violeta energético | `#6C63FF` | Botões, brilho e destaques |
| Rosa cósmico | `#E94AAE` | Gradientes e elementos editoriais |
| Coral orbital | `#FF735C` | Luz lateral e detalhes quentes |
| Amarelo StarKindred | `#FFBF2F` | Ações competitivas e estados ativos |
| Dourado | `#D8AD45` | Ranking, ELO e conquistas |
| Branco marfim | `#F8F3EA` | Títulos principais |
| Lilás suave | `#B9A9CE` | Textos secundários |
| Ciano | `#55DDF0` | Uso pontual em links e status |

### Regras de proporção

- 65% fundos escuros azulados e arroxeados;
- 20% superfícies e transparências;
- 10% branco e lilás;
- 5% cores fortes de destaque.

O amarelo, dourado e ciano não devem aparecer ao mesmo tempo em todos os componentes. Cada bloco deve possuir apenas uma cor de destaque dominante.

### Tokens sugeridos

```css
:root {
  --bg-space: #090512;
  --bg-purple: #160925;
  --bg-blue: #071426;
  --surface: rgba(17, 10, 31, 0.78);
  --surface-strong: rgba(25, 14, 42, 0.94);

  --violet: #6c63ff;
  --pink: #e94aae;
  --coral: #ff735c;
  --yellow: #ffbf2f;
  --gold: #d8ad45;
  --cyan: #55ddf0;

  --text-main: #f8f3ea;
  --text-soft: #b9a9ce;
  --border-soft: rgba(255, 255, 255, 0.14);
}
```

---

## 6. Fundo geral

O fundo deve possuir profundidade, mas não parecer poluído.

### Camadas recomendadas

1. Cor sólida `--bg-space`.
2. Gradiente radial violeta atrás do título.
3. Gradiente coral discreto no canto superior direito.
4. Campo de estrelas em baixa opacidade.
5. Grade vertical muito sutil, semelhante à referência.
6. Ruído fino opcional para evitar aspecto excessivamente digital.

### Grade visual

A referência usa linhas verticais discretas. Na StarKindred, elas podem ser aplicadas com `linear-gradient`:

```css
background-image:
  linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
background-size: 112px 112px;
```

A grade deve desaparecer gradualmente nas seções inferiores.

---

## 7. Header

### Hooks existentes a preservar

- `header`;
- `.logo`;
- `nav`;
- `nav a`;
- `.btn-destaque-login`.

### Composição

O header deve ficar dentro do próprio Hero, sem ocupar uma faixa pesada separada.

- largura máxima entre `1180px` e `1320px`;
- altura visual entre `64px` e `76px`;
- fundo transparente ou quase transparente;
- logo alinhada à esquerda;
- links centralizados;
- botão Login no lado direito;
- borda inferior inexistente;
- espaçamento generoso;
- posição absoluta ou sticky, conforme o comportamento atual.

### Logo

Usar `STARKINDRED` em branco ou marfim.

O símbolo pode ter um pequeno detalhe dourado, violeta ou ciano, mas não deve possuir vários brilhos simultâneos.

### Links

- tipografia pequena;
- peso médio;
- cor lilás clara;
- hover branco;
- indicador ativo com pequeno ponto ou linha;
- evitar caixas em volta de cada link.

### Login

O botão deve ser uma pílula discreta:

- fundo transparente;
- borda violeta/rosa;
- brilho leve;
- texto branco;
- preenchimento em gradiente apenas no hover.

---

## 8. Hero principal

### Hook existente

- `.hero` com `id="home"`.

### Dimensões

Desktop:

- altura mínima entre `760px` e `900px`;
- largura máxima do conteúdo entre `1240px` e `1380px`;
- cantos inferiores podem permanecer retos para integrar o painel sobreposto;
- conteúdo principal centralizado horizontalmente.

Tablet:

- altura mínima entre `720px` e `820px`.

Mobile:

- altura automática;
- conteúdo em coluna;
- mínimo recomendado de `700px`.

---

## 9. Composição do Hero

A composição deve seguir cinco planos visuais.

### Plano 1 — título principal

O título deve ser o primeiro elemento percebido.

```text
RUMO ÀS
ESTRELAS
```

ou, quando houver largura suficiente:

```text
RUMO ÀS ESTRELAS
```

Direção:

- centralizado;
- caixa alta;
- branco marfim;
- peso muito alto;
- largura visual dominante;
- pouco espaçamento entre letras;
- altura de linha compacta;
- sombra curta e suave;
- tamanho aproximado entre `clamp(3.3rem, 7.2vw, 7rem)`.

Acima do título:

```text
STAR KINDRED // BRAWLHALLA COMMUNITY
```

A label deve usar Orbitron ou a fonte técnica já existente, em tamanho pequeno.

### Plano 2 — subtítulo e ações

Abaixo do título, manter apenas uma frase curta:

> Uma frota de jogadores unida para evoluir, competir e conquistar novas estrelas em Valhalla.

Ações:

- botão principal: `ALISTAR-SE`;
- botão secundário: `CONHECER A TRIPULAÇÃO`.

O botão principal deve usar gradiente violeta → rosa, com pequeno brilho coral.

O botão secundário deve ser transparente, sem competir com a ação principal.

### Plano 3 — grande imagem da Demon Island

A Demon Island deve assumir a função visual do planeta da referência.

#### Tratamento recomendado

- posicionada no lado direito;
- tamanho entre 48% e 62% da largura do Hero;
- recorte circular ou oval;
- parte da imagem pode sair da área visível;
- borda luminosa muito suave;
- máscara radial para desaparecer nas bordas;
- sombra grande azul/roxa;
- sobreposição de cor para integrar a arte à paleta.

Exemplo de estrutura:

```html
<div class="hero-planet">
  <img src="assets/images/starkindred-demon-island.jpg" alt="">
</div>
```

A imagem não deve parecer apenas um banner retangular. Ela deve ser tratada como um **corpo celeste ou arena suspensa**.

### Plano 4 — personagem ou mascote flutuante

Entre o card editorial e a Demon Island, adicionar um elemento de escala humana:

- render de uma lenda de Brawlhalla;
- mascote original da StarKindred;
- silhueta estilizada;
- personagem em pose de observação ou movimento.

O personagem não deve ultrapassar o peso visual do título ou da Demon Island.

Enquanto não houver arte transparente adequada, pode ser usado:

- emblema flutuante;
- pequena nave;
- estrela com rastro;
- brasão do clã;
- silhueta abstrata.

### Plano 5 — palavra de contorno

Adicionar ao fundo uma palavra grande em outline:

```text
STARKINDRED
```

Alternativas:

- `VALHALLA`;
- `FROTA`;
- `ARENA`.

Direção:

- tipografia grande;
- somente contorno;
- rotação entre `-12deg` e `-22deg`;
- opacidade baixa;
- atrás do personagem e da Demon Island;
- nunca sobre o título principal.

---

## 10. Card editorial flutuante

O card do lado esquerdo equivale ao “Concept of space” da referência.

### Conteúdo recomendado

Label:

```text
TRANSMISSÃO 001
```

Título:

```text
Uma constelação em movimento
```

Rodapé:

```text
Comunidade | Competitivo
```

### Visual

- largura entre `210px` e `260px`;
- fundo branco marfim ou roxo muito claro;
- texto escuro;
- bordas entre `16px` e `22px`;
- sombra violeta;
- pequena imagem cósmica ou emblema no topo;
- rotação opcional de até `-1.5deg`;
- posição flutuante no lado esquerdo inferior do título.

Esse card deve ser um contraste claro dentro da composição escura. Não deve ser apenas mais um card azul.

### No mobile

O card deixa de flutuar e entra no fluxo normal abaixo dos botões.

---

## 11. Painel inferior sobreposto

O painel inferior é o principal elemento estrutural herdado da referência.

### Função

Ele deve:

- fechar visualmente o Hero;
- introduzir as áreas principais da comunidade;
- criar uma transição para as seções seguintes;
- servir como navegação por âncoras;
- apresentar um card central elevado.

### Hooks e destinos sugeridos

| Card | Destino |
| --- | --- |
| Evolução | seção sobre gameplay e aprendizado |
| Tripulação | `#membros` |
| Torneios | seção de arena/brackets |

### Estrutura

```text
┌──────────────────────────────────────────────────────────┐
│ CAMINHOS DA FROTA                                        │
│                                                          │
│ Evolução       [ TRIPULAÇÃO — card elevado ]  Torneios   │
└──────────────────────────────────────────────────────────┘
```

### Painel-base

- fundo preto/roxo translúcido;
- `backdrop-filter: blur(20px)`;
- borda branca de baixa opacidade;
- cantos superiores entre `28px` e `40px`;
- largura entre 84% e 92% do viewport;
- posição sobreposta à parte inferior do Hero;
- sombra grande;
- altura aproximada entre `180px` e `230px`.

### Cards laterais

- sem bordas pesadas;
- ícone circular;
- título curto;
- descrição de uma linha;
- link pequeno;
- hover com deslocamento vertical de no máximo `-4px`.

### Card central elevado

O card central deve ser o ponto ativo da composição.

Conteúdo recomendado:

```text
TRIPULAÇÃO
Conheça os pilotos que mantêm a StarKindred em órbita.
```

Visual:

- elevado entre `25px` e `50px`;
- gradiente violeta → rosa → coral;
- bordas entre `24px` e `30px`;
- brilho suave;
- ícone ou avatar circular parcialmente sobreposto;
- texto branco;
- largura maior que a dos cards laterais.

A elevação deve lembrar a carta “Uranus” da referência.

---

## 12. Seção “Sobre a StarKindred”

### Hooks existentes a preservar

- `.secao-container`;
- `#sobre`;
- `.sobre-box`;
- `.sobre-destaque-cosmico`.

### Direção

Após o Hero, reduzir a quantidade de elementos flutuantes e aumentar o espaço em branco visual.

Composição recomendada:

- label pequena à esquerda;
- título grande em duas linhas;
- texto em coluna estreita;
- imagem ou forma orbital no lado direito;
- destaque dourado em uma frase central.

Exemplo:

```text
NOSSA CONSTELAÇÃO

Mais que um clã.
Uma frota que evolui junta.
```

A `.sobre-box` não deve parecer um painel isolado. Ela deve integrar-se ao fundo por transparência, borda suave e bastante respiro.

---

## 13. Três cards editoriais

Os conteúdos atuais podem ser mantidos:

1. **Evolua sua gameplay**
2. **Encontre sua dupla**
3. **Compita nos torneios**

### Composição

- três colunas no desktop;
- cada card com proporção vertical;
- um dos cards pode ser ligeiramente mais alto;
- ícone ou pequena composição visual no topo;
- títulos curtos;
- descrição limitada;
- link pequeno no rodapé.

### Variação visual

Os cards não devem ser idênticos.

- Evolução: violeta e ciano;
- Dupla: azul e rosa;
- Torneios: coral, amarelo e dourado.

Manter a mesma família de bordas, sombras e tipografia.

---

## 14. “O jeito StarKindred”

A seção deve funcionar como um manifesto editorial.

### Estrutura

```text
O JEITO
STARKINDRED

01  Competitividade
02  Comunidade
03  Evolução
```

Direção:

- título grande à esquerda;
- três capítulos à direita;
- números enormes em outline;
- linhas horizontais discretas;
- fundo com palavra `KIN` ou `FROTA` em baixa opacidade;
- bastante espaço vertical.

Evitar transformar essa parte em três cards comuns.

---

## 15. Membros e carrossel

### Hooks existentes

- `#membros`;
- `.secao-membros`;
- `.membros-carrossel-container`;
- `.membros-track`;
- `.membro-nome`.

### Faixa de membros

A faixa deve lembrar uma transmissão contínua:

- fundo transparente;
- linha superior e inferior sutil;
- nomes em caixa alta;
- estrela ou ponto entre os nomes;
- máscara nas extremidades;
- movimento lento;
- pausa no hover.

Exemplo:

```text
✦ NOCTURRN  ✦ PILOTO 02  ✦ PILOTO 03  ✦ PILOTO 04
```

Não envolver cada nome em um card grande.

---

## 16. Painel de pilotos de elite

### Hooks existentes

- `btn-toggle-melhores`;
- `painel-elite`;
- `.grid-melhores`;
- `.card-elite`;
- `.info-linha`.

### Direção

Os cards de elite devem parecer fichas premium de pilotos.

Cada card deve conter:

- avatar ou inicial;
- nome;
- lenda principal;
- armas;
- ELO;
- badge pequeno;
- número de posição em grande escala.

### Hierarquia

1. nome;
2. ELO;
3. ranking;
4. lenda e armas;
5. informações secundárias.

O ELO e a posição devem usar dourado. O restante permanece branco e lilás.

### Hover

- elevação máxima de `6px`;
- borda violeta;
- brilho dourado pontual;
- avatar com leve escala;
- sem animação agressiva.

---

## 17. Arena e torneios

A seção de torneios deve possuir uma composição mais visual do que textual.

### Card principal

- fundo com imagem de Brawlhalla;
- overlay azul/roxo;
- data ou estado editorial;
- badge de status;
- modo;
- formato;
- canal;
- botão para brackets.

Quando não houver torneio definido, usar:

```text
PRÓXIMA OPERAÇÃO
Em preparação
```

Não inventar datas, participantes ou premiações.

### Visual

- card largo;
- cantos grandes;
- arte ocupando de 40% a 55% do bloco;
- informações em uma coluna;
- brilho coral/dourado na borda;
- botão amarelo ou violeta.

---

## 18. CTA do Discord

### Hooks existentes

- `#recrutamento`;
- `.comunidade-box`;
- `.btn-discord-comunidade`.

### Conceito

O CTA deve parecer uma transmissão recebida no fim da jornada.

Exemplo:

```text
TRANSMISSÃO ABERTA

Sua vaga na frota ainda está disponível.
Entre no Discord e conheça a comunidade.
```

### Visual

- bloco centralizado;
- fundo em gradiente violeta e rosa;
- estrelas maiores nas bordas;
- título branco;
- texto curto;
- botão amarelo StarKindred;
- cantos entre `28px` e `36px`;
- largura menor que a seção anterior para criar foco.

---

## 19. Rodapé

O rodapé deve ser discreto e editorial.

### Conteúdo

- logo StarKindred;
- frase `Rumo às estrelas, juntos.`;
- Discord;
- Login;
- Brawlhalla;
- crédito `STAR KINDRED // VALHALLA NETWORK`.

### Direção

- fundo igual ao fundo espacial;
- linha superior violeta muito sutil;
- duas colunas no desktop;
- links à direita;
- texto pequeno;
- sem cards internos.

---

## 20. Tipografia

### Distribuição recomendada

#### Título principal

Usar uma fonte geométrica muito pesada:

- `Montserrat ExtraBold`;
- `League Spartan`;
- `Archivo Black`;
- alternativa local equivalente.

#### Logo, labels e dados competitivos

Usar:

- `Orbitron`;
- ou a fonte técnica já adotada no projeto.

#### Textos e descrições

Usar:

- `Roboto`;
- `Inter`;
- ou fonte sans-serif legível já existente.

### Regra importante

Orbitron não deve ser usada em todos os títulos grandes. Ela funciona melhor em:

- logo;
- labels;
- ELO;
- ranking;
- botões;
- status;
- microtextos.

O título `RUMO ÀS ESTRELAS` deve usar uma fonte mais pesada e compacta, semelhante à referência.

---

## 21. Formas e profundidade

### Bordas

- Hero: sem borda visível ou com moldura interna sutil;
- painel inferior: `28px` a `40px`;
- cards grandes: `20px` a `30px`;
- cards pequenos: `14px` a `22px`;
- botões: pílulas.

### Sombras

Preferir sombras grandes e suaves:

```css
box-shadow:
  0 30px 80px rgba(0, 0, 0, 0.45),
  0 0 50px rgba(108, 99, 255, 0.12);
```

Evitar sombras pretas pequenas e duras em todos os elementos.

### Glassmorphism

Usar apenas em:

- painel inferior;
- header;
- cards competitivos;
- modais.

Não aplicar blur em todos os blocos da página.

---

## 22. Animações

A referência parece viva mesmo sem movimento agressivo. A StarKindred deve seguir a mesma lógica.

### Permitidas

- estrelas flutuando lentamente;
- brilho radial pulsando;
- personagem com movimento vertical de poucos pixels;
- Demon Island com parallax mínimo;
- cards entrando com opacidade e deslocamento;
- outline do fundo movimentando-se lentamente;
- painel inferior subindo suavemente na entrada;
- carrossel contínuo.

### Limites

- escala de hover máxima: `1.02`;
- duração entre `180ms` e `500ms`;
- animações ambientais entre `8s` e `20s`;
- sem piscadas;
- sem glitches constantes;
- sem shake;
- sem rotação contínua de cards.

### Acessibilidade

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 23. Responsividade

### Desktop — acima de 1100px

- título central;
- Demon Island grande à direita;
- card editorial à esquerda;
- personagem entre os dois;
- painel inferior em uma linha;
- card central elevado;
- palavra outline visível.

### Tablet — entre 720px e 1099px

- Demon Island menor e mais transparente;
- título continua central;
- card editorial deslocado para baixo;
- personagem opcional;
- painel inferior com três colunas compactas;
- reduzir elementos de fundo.

### Mobile — abaixo de 720px

A composição não deve apenas encolher. Ela deve ser reorganizada:

1. header;
2. label;
3. título;
4. subtítulo;
5. botões;
6. Demon Island;
7. card editorial;
8. painel inferior em coluna ou carrossel horizontal.

Regras:

- esconder palavra outline quando prejudicar a leitura;
- personagem pode ser removido;
- painel inferior deixa de ficar fortemente sobreposto;
- botão principal ocupa largura confortável;
- título quebra em duas ou três linhas;
- manter no máximo dois brilhos grandes na tela;
- cards em uma coluna;
- margens laterais entre `18px` e `24px`.

---

## 24. Compatibilidade com a implementação existente

As mudanças visuais devem respeitar o sistema atual.

### Não alterar

- IDs existentes;
- classes usadas pelo JavaScript;
- links de login;
- link do Discord;
- âncoras da página;
- lógica do Firestore;
- funcionamento de `btn-toggle-melhores`;
- nomes carregados no carrossel;
- acesso aos brackets;
- autenticação.

### Permitido

- adicionar wrappers;
- adicionar classes auxiliares;
- adicionar pseudo-elementos;
- inserir elementos puramente decorativos com `aria-hidden="true"`;
- reorganizar visualmente por CSS Grid e Flexbox;
- adicionar uma seção visual sem remover as existentes;
- incluir novas fontes;
- otimizar e renomear assets.

### Regra para elementos decorativos

Todo elemento sem função de conteúdo deve usar:

```html
aria-hidden="true"
```

e não pode receber foco ou bloquear cliques.

---

## 25. Assets

Estrutura recomendada:

```text
assets/
└── images/
    ├── starkindred-demon-island.jpg
    ├── starkindred-hero-character.webp
    ├── starkindred-emblem.svg
    ├── brawlhalla-arena.jpg
    └── texture-stars.webp
```

### Regras

- usar caminhos relativos;
- converter imagens pesadas para WebP ou AVIF;
- manter fallback quando necessário;
- usar `object-fit: cover`;
- não referenciar arquivos diretamente da pasta Downloads;
- não usar a própria screenshot de referência dentro do site.

---

## 26. Estrutura visual sugerida no HTML

Esta estrutura é apenas conceitual. Os hooks atuais devem ser encaixados nela sem serem removidos.

```html
<header>...</header>

<main>
  <section class="hero" id="home">
    <div class="hero-background-word" aria-hidden="true">STARKINDRED</div>

    <div class="hero-copy">
      <span class="hero-eyebrow">STAR KINDRED // BRAWLHALLA COMMUNITY</span>
      <h1>Rumo às estrelas</h1>
      <p>...</p>
      <div class="hero-actions">...</div>
    </div>

    <article class="hero-editorial-card">...</article>

    <div class="hero-character" aria-hidden="true">...</div>
    <div class="hero-planet" aria-hidden="true">...</div>

    <nav class="hero-dock" aria-label="Explore a StarKindred">
      <a href="#sobre">Evolução</a>
      <a href="#membros" class="hero-dock-featured">Tripulação</a>
      <a href="#arena">Torneios</a>
    </nav>
  </section>

  <section id="sobre">...</section>
  <section class="caminhos-da-frota">...</section>
  <section class="jeito-starkindred">...</section>
  <section id="membros">...</section>
  <section id="arena">...</section>
  <section id="recrutamento">...</section>
</main>

<footer>...</footer>
```

---

## 27. O que evitar

- Hero parecendo um banner comum;
- Demon Island em um retângulo simples;
- título pequeno;
- excesso de texto acima da dobra;
- todos os cards com a mesma aparência;
- ciano neon em todos os elementos;
- amarelo em grandes áreas de fundo;
- bordas brilhantes em todos os blocos;
- grade muito visível;
- dezenas de partículas animadas;
- cards técnicos com muitas linhas e indicadores;
- navegação grande;
- personagem cobrindo textos;
- painel inferior sem sobreposição;
- copiar textos ou imagens da referência;
- deixar a homepage parecendo um template espacial genérico.

---

## 28. Ordem de implementação

### Fase 1 — nova composição do Hero

1. reorganizar o Hero com CSS Grid;
2. aplicar o novo fundo espacial;
3. atualizar tipografia do título;
4. transformar Demon Island em corpo visual circular;
5. criar a palavra outline;
6. reposicionar botões;
7. tornar o header leve.

### Fase 2 — profundidade

1. criar card editorial;
2. adicionar personagem ou emblema flutuante;
3. criar painel inferior;
4. elevar o card central;
5. aplicar sombras e gradientes;
6. ajustar sobreposições e `z-index`.

### Fase 3 — continuação editorial

1. atualizar a seção Sobre;
2. diferenciar os três cards;
3. transformar “O jeito StarKindred” em manifesto;
4. refinar carrossel e elite;
5. criar painel visual de torneios;
6. atualizar CTA do Discord.

### Fase 4 — acabamento

1. mobile;
2. acessibilidade;
3. `prefers-reduced-motion`;
4. otimização de imagens;
5. revisão de contraste;
6. revisão de navegação por teclado;
7. teste em diferentes proporções de tela.

---

## 29. Critérios de aprovação

A nova homepage será considerada alinhada à referência quando:

- o primeiro bloco preencher a maior parte da tela;
- o título for o elemento textual dominante;
- a Demon Island funcionar como um grande objeto visual à direita;
- existir um card editorial claro à esquerda;
- existir uma palavra gigante em outline no fundo;
- o painel inferior estiver integrado ao Hero;
- o card central do painel estiver elevado e mais colorido;
- o header estiver leve e discreto;
- a página usar roxo, rosa e coral sem perder o amarelo/dourado da StarKindred;
- a composição possuir profundidade por sobreposição;
- as seções inferiores continuarem o mesmo universo visual;
- o site continuar claramente relacionado a Brawlhalla;
- todos os hooks e fluxos atuais continuarem funcionando;
- a versão mobile preservar hierarquia, mesmo removendo alguns elementos decorativos.

---

## 30. Resumo executivo para implementação

A principal mudança não é apenas trocar cores ou arredondar cards.

A homepage precisa ser reconstruída visualmente em torno de uma única composição:

> **Título central gigante + Demon Island à direita + card editorial à esquerda + personagem flutuante + palavra outline ao fundo + painel de navegação sobreposto na base.**

Todo o restante da página deve parecer uma continuação desse primeiro cenário.

A prioridade é criar uma experiência reconhecível como StarKindred antes mesmo de o usuário começar a ler os textos.
