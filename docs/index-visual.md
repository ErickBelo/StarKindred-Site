# StarKindred — Direção visual da homepage

## Revisão de direção

Esta versão substitui a direção anterior de “painel militar/HUD” por uma homepage mais ilustrada, atmosférica e editorial, inspirada na primeira referência enviada.

O novo conceito é:

> **Um santuário competitivo entre mundos: uma comunidade de Brawlhalla apresentada como uma base fantástica escondida em uma paisagem cósmica.**

A StarKindred continua sendo uma guilda competitiva, mas a experiência de entrada deve ser mais convidativa, colorida e memorável. A interface deve parecer uma página de universo próprio, e não um sistema administrativo.

## 1. Referências visuais

### Imagem 1 — referência principal

Arquivo de referência: `Right now it can only create images, soon we'll be able to make live edits_.jpg`

Usar a imagem 1 como referência de linguagem visual, não necessariamente como imagem do site.

Características a absorver:

- fundo geral azul-marinho profundo;
- grande composição ilustrada no topo;
- moldura visual envolvendo a arte principal;
- céu central com cores quentes e luminosas;
- bordas e elementos orgânicos, inspirados em árvores, folhas e criaturas;
- seções com bastante espaço vazio entre os blocos;
- cards com aparência de pequenas ilustrações de um mundo;
- botões arredondados e suaves;
- navegação pequena, centralizada e discreta;
- mistura de roxo, azul, ciano, coral, rosa e dourado;
- sensação de página completa, com ritmo de landing page editorial.

### Imagem 2 — paisagem principal da StarKindred

Arquivo: `Brawlhalla Demon island 2048x1151.jpg`

Uso recomendado:

- background principal do Hero;
- imagem de destaque na seção “Nossa Constelação”;
- banner da comunidade ou de torneios.

Essa imagem tem escala horizontal adequada para uma área de Hero. Deve receber uma camada escura ou azulada para que os textos continuem legíveis. O recorte deve preservar o portal luminoso à esquerda e a ilha/fortaleza no centro-direita sempre que possível.

### Imagem 3 — identidade Brawlhalla

Arquivo: `wp2221834-brawlhalla-wallpapers.jpg`

Uso recomendado:

- seção de encerramento da homepage;
- painel de identidade “Powered by Brawlhalla”;
- fundo de uma chamada para torneios;
- textura visual para uma faixa antes do CTA do Discord.

Como a imagem já possui o logotipo de Brawlhalla, não deve ser usada atrás de muito texto. Ela funciona melhor como painel visual com uma sobreposição escura e uma mensagem curta.

## 2. Personalidade visual

### Palavras-chave

- fantástico;
- competitivo;
- cósmico;
- acolhedor;
- misterioso;
- ilustrado;
- premium;
- comunidade;
- aventura.

### O que evitar

- excesso de linhas técnicas e aparência de dashboard;
- neon ciano em todos os elementos;
- cards quadrados demais;
- textos longos dentro do Hero;
- muitos efeitos de brilho ao mesmo tempo;
- backgrounds com texto ilegível;
- visual genérico de site gamer;
- usar a imagem 1 como screenshot dentro da página.

## 3. Sistema visual

### Paleta

| Função | Cor sugerida | Aplicação |
| --- | --- | --- |
| Azul espacial profundo | `#030914` | Fundo geral |
| Azul escuro de card | `rgba(8, 18, 37, 0.85)` | Cards, molduras e superfícies |
| Azul de interface | `#00b4d8` | Links, detalhes e indicadores |
| Amarelo vibrante | `#ffb703` | Botões, ações e estados ativos |
| Dourado | `#d4af37` | Logo, ranking, ELO e conquistas |
| Texto claro | `#ffffff` | Títulos e informações principais |
| Texto suave | `#94a3b8` | Descrições e legendas |

O azul espacial deve ocupar a maior parte da tela. O ciano cria contraste tecnológico; amarelo e dourado definem ação, prestígio e competição.

### Gradientes

Usar gradientes grandes e suaves, sem cortes duros:

- azul espacial para azul de interface nas áreas de navegação;
- azul escuro para ciano no centro do Hero;
- azul de card para ciano nos cards;
- amarelo para dourado em rankings e conquistas.

Os gradientes devem lembrar céu, magia e energia de arena — não iluminação de painel industrial.

### Tipografia

Manter as fontes existentes:

- **Orbitron:** logo, títulos de seção, botões e informações competitivas;
- **Roboto:** parágrafos, descrições, nomes de apoio e textos longos.

Para aproximar a imagem 1:

- títulos grandes com menos espaçamento entre letras;
- subtítulos mais leves;
- labels pequenos apenas quando ajudarem a criar contexto;
- evitar transformar todos os textos em caixa alta.

## 4. Estrutura da página

A homepage deve ter o ritmo visual de uma landing page ilustrada:

```text
Header leve
  ↓
Hero ilustrado com Demon Island
  ↓
Briefing da StarKindred
  ↓
Faixa de membros ativos
  ↓
Cards dos pilotos de elite
  ↓
Painel visual de Brawlhalla / arena
  ↓
Convite para o Discord
```

Os elementos atuais podem continuar existindo. A transformação deve ser feita por camadas visuais e acréscimos, sem remover os hooks usados pelo JavaScript.

## 5. Header e navegação

Hooks existentes a preservar:

- `header`;
- `.logo`;
- `nav`;
- `nav a`;
- `.btn-destaque-login`.

Direção:

- header centralizado dentro de uma largura máxima;
- fundo azul-marinho semitransparente;
- bordas arredondadas ou uma cápsula visual sutil;
- logo menor e mais refinado;
- navegação central com links curtos;
- botão Login como pílula coral ou dourada;
- sombra roxa suave abaixo da barra.

Em telas grandes, o header pode parecer uma pequena barra flutuante sobre a paisagem. Em telas pequenas, deve ocupar a largura e manter o botão facilmente acessível.

## 6. Hero — Demon Island como portal da guilda

Hook existente:

- `.hero` com `id="home"`.

### Composição

Usar a imagem 2 como background cobrindo o Hero, com:

- `background-position` preferencialmente central;
- overlay azul-marinho em 45–65% de opacidade;
- gradiente coral/lilás sobre a área do céu;
- máscara escura na parte inferior para transição suave;
- moldura interna arredondada ou recorte com bordas suaves.

O conteúdo deve ficar em uma coluna no centro ou ligeiramente à esquerda, deixando a ilha visível ao lado.

### Conteúdo

O Hero deve ser curto e expressivo:

- pequeno label: `STAR KINDRED // BRAWLHALLA COMMUNITY`;
- título: `RUMO ÀS ESTRELAS`;
- subtítulo: uma frase sobre comunidade, evolução e competição;
- ação principal: `Alistar-se na Frota`;
- ação secundária: `Conhecer a Tripulação`.

Os botões devem ser arredondados, com aparência de pílula, abandonando o aspecto de botão técnico retangular.

### Elementos decorativos

Podem ser adicionados por pseudo-elementos CSS:

- pequenas estrelas e partículas;
- círculos translúcidos;
- folhas ou formas orgânicas abstratas;
- moldura de luz ao redor da imagem;
- uma linha curva sugerindo órbita.

Esses elementos devem ter baixa opacidade para não competir com a arte da Demon Island.

## 7. Briefing da guilda

Hooks existentes:

- `.secao-container`;
- `#sobre`;
- `.sobre-box`;
- `.sobre-destaque-cosmico`.

Transformar `.sobre-box` em um card de briefing com aparência mais orgânica:

- background azul/roxo translúcido;
- borda arredondada de 16px a 24px;
- sombra violeta suave;
- título alinhado à esquerda;
- texto em largura confortável;
- uma pequena arte ou recorte decorativo nas laterais;
- marcador dourado para “StarKindred”.

O texto atual pode ser mantido. A melhoria deve vir da composição visual, do espaçamento e do contraste.

## 8. Seção de membros

Hooks existentes:

- `#membros`;
- `.secao-membros`;
- `.membros-carrossel-container`;
- `.membros-track`;
- `.membro-nome`.

### Carrossel

O carrossel pode representar uma faixa de nomes viajando por uma constelação.

Direção:

- fundo azul espacial com gradiente ciano discreto;
- bordas arredondadas nas laterais quando houver margem;
- nomes com pequenas estrelas ou pontos coloridos;
- pausa no hover;
- velocidade reduzida no mobile;
- máscara suave nas extremidades.

### Área de elite

Hooks existentes:

- `btn-toggle-melhores`;
- `painel-elite`;
- `.grid-melhores`;
- `.card-elite`;
- `.info-linha`.

Os cards devem se aproximar dos cards ilustrados da imagem 1:

- bordas suaves;
- fundo em gradiente;
- pequenos ícones ou círculos decorativos;
- ranking visual dourado;
- ELO como informação mais importante;
- hover com brilho ciano ou dourado;
- aparência de “ficha de aventureiro competitivo”.

Não remover o conteúdo atual de ELO, lenda ou armas.

## 9. Painel visual de Brawlhalla

Como a homepage atual não possui uma seção específica para arte, pode ser adicionada uma nova seção visual sem alterar os blocos existentes.

Sugestão:

- usar a imagem 3 como um painel de largura total;
- adicionar overlay azul-marinho;
- manter o logotipo de Brawlhalla visível;
- colocar uma frase curta, como `A arena é o nosso ponto de encontro`;
- usar um botão para `Ver a Arena` ou `Acessar o QG`.

Essa seção deve ter pouca informação. A imagem precisa funcionar como uma pausa visual entre a parte competitiva e o convite à comunidade.

## 10. CTA da comunidade

Hooks existentes:

- `#recrutamento`;
- `.comunidade-box`;
- `.btn-discord-comunidade`.

O CTA deve parecer uma clareira iluminada no fim da página:

- fundo azul espacial com luz ciano;
- forma arredondada e orgânica;
- título grande e acolhedor;
- texto curto;
- botão Discord em amarelo vibrante, com texto escuro;
- pequenos círculos ou estrelas decorativas nas bordas.

A ação principal deve ficar muito clara: entrar na comunidade.

## Extensões editoriais planejadas

As seções abaixo devem ser adicionadas gradualmente, preservando os hooks existentes e usando apenas novas classes visuais quando necessário.

### Três cards ilustrados: por que se alistar

Posição recomendada: logo após `Nossa Constelação` e antes da seção de membros.

Composição:

- três cards em desktop e uma coluna no mobile;
- fundo `--bg-card`, borda ciano discreta e cantos arredondados;
- um pequeno ícone/ilustração abstrata no topo de cada card;
- título em dourado, texto em `--texto-mutado` e um detalhe amarelo no hover.

Conteúdo:

1. **Evolua sua gameplay** — guias, tutoriais e troca de experiência para aperfeiçoar mecânicas e decisões em partida.
2. **Encontre sua dupla** — espaço para montar times estáveis de 2v2 e criar sinergia com outros pilotos.
3. **Compita nos torneios** — torneios internos, check-in, brackets e uma arena para registrar a evolução da guilda.

O visual deve remeter a pequenas janelas de uma constelação: estrelas em baixa opacidade, uma linha orbital e um brilho ciano/dourado sem competir com o texto.

### O jeito StarKindred

Posição recomendada: depois dos três cards ilustrados.

Composição assimétrica:

- título e texto de manifesto em uma coluna;
- números grandes na outra coluna;
- blocos desalinhados de propósito, com bastante respiro entre eles;
- uma forma orbital ou recorte da Demon Island ao fundo, em baixa opacidade.

Os números devem ser editoriais, não métricas inventadas. Usar `01`, `02` e `03` como capítulos visuais:

- **01 — Competitividade:** evoluir com intenção, respeito e foco no jogo.
- **02 — Comunidade:** encontrar pessoas para jogar, conversar e permanecer.
- **03 — Evolução:** aprender com vitórias, derrotas e torneios.

### Faixa editorial de impacto

Posição recomendada: entre a área de destaque dos membros e a seção da arena.

Usar uma faixa horizontal de fundo azul profundo, com uma linha dourada fina e estrelas discretas. A frase deve ocupar o centro, com tipografia grande e bastante espaço vazio:

> “Cada combate é uma nova estrela acesa no céu da guilda.”

No desktop, pode haver uma estrela decorativa grande nas extremidades. No mobile, a faixa deve preservar a leitura e reduzir os elementos ornamentais.

### Destaques da constelação

Esta seção complementa, mas não substitui, o painel `painel-elite` existente.

Cada card de destaque deve conter:

- avatar ou arte de perfil do membro;
- nome do piloto;
- lenda principal;
- armas;
- ELO máximo;
- uma pequena etiqueta, como `RANKED DIVISION` ou `ACTIVE PILOT`.

Enquanto não houver avatars reais, usar formas circulares com gradiente ciano/dourado e a inicial do piloto. Quando os dados forem conectados no futuro, o conteúdo pode continuar usando a mesma estrutura visual.

### Legendas e etiquetas decorativas

As etiquetas ajudam a manter a linguagem editorial sem encher a página de texto. Usar Orbitron em tamanho pequeno, ciano ou dourado, e muito espaçamento entre letras.

Sugestões de uso:

- `STAR KINDRED // COMMUNITY` no Hero;
- `RANKED DIVISION` nos cards de elite;
- `ACTIVE PILOTS` acima do carrossel;
- `NEXT OPERATION` na seção de torneios;
- `VALHALLA NETWORK` próximo ao rodapé.

Elas não devem representar dados do banco; funcionam apenas como elementos de contexto visual.

### Seção de torneios

Posição recomendada: antes da faixa ou do CTA final da comunidade.

Composição:

- card principal com data e hora do próximo torneio;
- badge de status, como `INSCRIÇÕES ABERTAS`, `CHECK-IN` ou `EM BREVE`;
- duas ou três informações curtas: modo, formato e canal de voz;
- botão `Acompanhar Brackets`, apontando para `brackets.html`;
- fundo com arte de Brawlhalla e overlay azul espacial para preservar a leitura.

Enquanto o conteúdo não vier do Firestore para a homepage, usar um estado editorial neutro — por exemplo, `Próxima operação em preparação` — em vez de datas ou números fictícios.

### Texturas de apoio

Aplicar somente em baixa opacidade:

- estrelas em camadas no fundo geral;
- linhas orbitais curvas no Hero e nas seções de manifesto;
- círculos recortados nas bordas dos cards;
- pequenas formas orgânicas inspiradas na primeira referência;
- gradientes ciano e dourado para sugerir profundidade.

As texturas nunca devem cobrir texto, links ou áreas de clique.

### Rodapé editorial

O rodapé deve encerrar a página com o mesmo azul espacial profundo do Hero e incluir:

- logo StarKindred;
- frase curta: `Rumo às estrelas, juntos.`;
- link para o Discord;
- link para `login.html`;
- indicação de comunidade de Brawlhalla;
- uma pequena linha de crédito, como `STAR KINDRED // VALHALLA NETWORK`.

Em desktop, usar duas colunas: identidade à esquerda e links à direita. Em mobile, centralizar o conteúdo e aumentar o espaço entre os links.

## 11. Formas e componentes

### Bordas

Preferir:

- 12px a 24px para grandes blocos;
- 8px a 14px para cards;
- pílulas para botões e tags;
- linhas finas com baixa opacidade.

### Cards

Os cards devem ter pequenas variações entre si:

- azul para informações;
- azul escuro para comunidade;
- amarelo para ação;
- dourado para competição;
- ciano para links e navegação.

Evitar que todas as caixas tenham exatamente o mesmo fundo e a mesma borda.

### Botões

Todos os botões principais devem compartilhar:

- altura confortável;
- borda arredondada;
- tipografia legível;
- hover com elevação leve;
- foco visível;
- transição entre 180ms e 260ms.

## 12. Animações

As animações devem trazer vida de ilustração:

- brilho lento no céu do Hero;
- partículas flutuantes;
- movimento quase imperceptível da imagem de fundo;
- entrada suave dos cards ao aparecerem;
- hover com escala máxima de 1.02;
- carrossel de nomes em movimento contínuo.

Não usar animações agressivas de HUD, piscadas rápidas ou excesso de transformações.

Sempre manter:

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## 13. Responsividade

### Desktop

- Hero amplo com a Demon Island visível;
- header flutuante ou centralizado;
- cards de elite em grade;
- seção visual da imagem 3 ocupando a largura;
- bastante espaço entre blocos.

### Tablet

- Hero com imagem mais escura para preservar leitura;
- cards em duas colunas;
- navegação com espaçamento reduzido;
- conteúdo textual limitado a uma coluna principal.

### Mobile

- Hero com `background-position` ajustado para preservar a ilha;
- título menor e quebrado naturalmente;
- botões em coluna;
- cards em uma coluna;
- imagens secundárias em proporção menor;
- carrossel com velocidade reduzida;
- navegação sem sobreposição.

## 14. Assets e organização

As imagens devem sair da pasta Downloads e entrar no projeto com nomes seguros e previsíveis:

```text
assets/
└── images/
    ├── starkindred-demon-island.jpeg
    └── brawlhalla-cosmic-branding.jpg
```

Não referenciar caminhos como `C:\Users\...\Downloads` dentro do site. O site deve usar caminhos relativos:

```css
background-image: url("../assets/images/starkindred-demon-island.jpeg");
```

Estrutura recomendada:

```text
StarKindred-Site/
├── index.html
├── login.html
├── painel.html
├── brackets.html
├── admin.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── textures/
├── styles/
│   ├── index.css
│   ├── admin.css
│   └── shared.css
├── js/
│   ├── index.js
│   ├── login.js
│   ├── painel.js
│   └── admin.js
└── docs/
    ├── README.md
    └── index-visual.md
```

## 15. Compatibilidade com o sistema existente

As alterações visuais devem seguir estas regras:

- não remover ou renomear `id` existentes;
- não remover ou renomear `class` existentes;
- não alterar links de login, Discord ou âncoras;
- não modificar a lógica do Firestore;
- não alterar o funcionamento do botão `btn-toggle-melhores`;
- não substituir os nomes existentes no carrossel;
- adicionar novos elementos somente quando forem visuais ou de navegação;
- preferir CSS externo em `styles/index.css`;
- manter o JavaScript da homepage em `js/index.js`.

## 16. Ordem de implementação

### Fase 1 — atmosfera

1. copiar as imagens para `assets/images`;
2. aplicar a imagem 2 no Hero;
3. criar overlay azul/roxo;
4. ajustar paleta e tipografia;
5. arredondar cards e botões.

### Fase 2 — composição editorial

1. criar moldura visual do Hero;
2. melhorar o briefing da guilda;
3. transformar o carrossel em faixa de constelação;
4. atualizar cards de elite;
5. inserir a seção visual baseada na imagem 3.

### Fase 3 — acabamento

1. responsividade;
2. acessibilidade;
3. animações suaves;
4. otimização das imagens;
5. revisão de contraste e espaçamento.

## 17. Checklist de aprovação

- A homepage parece uma experiência ilustrada, e não um dashboard?
- A imagem 2 é reconhecível no Hero sem prejudicar o texto?
- A imagem 3 está sendo usada como apoio, sem competir com o conteúdo?
- A paleta oficial possui azul espacial, ciano, amarelo e dourado em equilíbrio?
- Os botões possuem formas arredondadas e estados claros?
- Os cards parecem parte do mesmo universo visual?
- A área competitiva continua evidente?
- A comunidade continua sendo a ação final mais importante?
- A página funciona no celular?
- Nenhum `id`, `class` ou fluxo existente foi quebrado?
- O usuário consegue entender o site sem depender das animações?
