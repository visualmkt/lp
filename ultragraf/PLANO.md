# PLANO — Site institucional UltraGraf (Argentina)

> Plano de 15/10/2026. Modelo técnico: site da Zoonn (`d:/andrezao/lp/zoonn/`) — vídeo de fundo com scrub na rolagem, invertido (topo = pronto), versão horizontal p/ desktop e vertical p/ celular.
> Repo `lp` é PÚBLICO: nada de senha aqui. Brutos do Drive em `ultragraf/_drive/` (no `.gitignore`).

## 0. Fonte do material
Pasta do Drive do cliente (baixada inteira em `_drive/`): 158 fotos de trabalhos, 6 versões do logo (4500px, transparente), slogan, paleta, 2 fontes, 3 folhetos, PDF institucional (Quiénes somos / Objetivos / Misión / Visión) e 2 .docx (contato e serviços).

## 1. Fatos verificados (única fonte permitida)

| Campo | Valor | Fonte |
|---|---|---|
| Nome | **UltraGraf** — "Industria Publicitaria" | logo |
| Slogan | **MATERIALIZAMOS TUS IDEAS** (fonte Ethnocentric) | SLOGAN.png / docx |
| Fundação | 2016 | PDF |
| Planta | +700 m² de produção | PDF |
| Endereço | Av. Roque González 43, San Javier, Misiones, Argentina | docx contato |
| Celulares | (+54) 3754 531596 · (+54) 3754 469388 | docx contato |
| E-mail | ultragraf.carteles24@gmail.com | docx contato |
| Instagram | @ultragraf_carteles | docx |
| Facebook | facebook.com/p/UltraGraf-100033686870263 | docx |
| Cobertura | "Transporte y colocación en todo el NEA" | folhetos |
| Diferenciais | Presupuestos sin cargo · Visitas y atención personalizada | docx/folheto |

**Pendente de confirmar (perguntar antes de publicar):** qual dos 2 celulares é o WhatsApp principal; domínio próprio; horário de atendimento; se querem nota/avaliações do Google (procurar ficha).

## 2. Identidade
- **Paleta oficial**: preto #000, grafite #3d3d3d, amarelo #F5E52A (conferir hex exato no PALETA COLORES.png com sharp) + pontos CMYK (magenta, ciano, amarelo, preto) do logo como detalhe assinatura.
- **Fontes do cliente**: Ethnocentric (só slogan/títulos curtos) + Acumin Variable Concept (texto). Converter para WOFF2 com subset latino, self-host em `assets/fonts/`. Folhetos usam condensada itálica bold nos títulos — reproduzir com Acumin condensed italic (eixo variável).
- **Linguagem visual dos folhetos**: faixas diagonais amarelas, títulos itálicos em caixa alta, fundo escuro com textura de blocos. Levar isso pro site (divisores diagonais amarelos).
- Logo: usar `ULTRAGRAF LOGO PNG (1).png` (branco, transparente) no header escuro; versão preta no fundo claro. Converter para WebP/PNG 600px.

## 3. Idioma e SEO
- Site 100% em **espanhol (es-AR)**: `lang="es-AR"`, voseo leve ("Pedí tu presupuesto"), termos locais: **cartelería, carteles, letras corpóreas, ploteo, fachadas en ACM**.
- Local: San Javier, Misiones, NEA (Posadas, Oberá, Apóstoles, Concepción de la Sierra aparecem nas fotos — citar só cidades que o cliente confirmar como atendidas).
- JSON-LD `LocalBusiness` (address, telephone, foundingDate 2016, areaServed NEA, sameAs IG/FB) + `FAQPage`. Parágrafo GEO factual para LLMs.
- Durante aprovação: `noindex`.

## 4. Hospedagem de aprovação
`https://www.visualmkt.com.br/claude/ultragraf/` (SFTP `SFTP_*` do `.env`, destino `public_html/claude/ultragraf/`). Subir `.htaccess` anti-compressão de vídeo (copiar o da Zoonn) e checar `Range` = `206`.

## 5. Vídeo de fundo — criar no Google Flow (Veo)
Mesmo efeito da Zoonn: vídeo de 8 s que o usuário rola; **topo = fachada pronta à noite com o letreiro UltraGraf aceso, rodapé = obra/estrutura**. Gerar no Flow do FIM para o COMEÇO não precisa — gera obra→pronto e o site inverte com ffmpeg.

Precisamos de **2 vídeos** (mesmo roteiro):
- **Desktop 16:9** (1280x720+)
- **Celular 9:16** (720x1280+)

### 5.1 Imagem de referência
Melhor caminho no Flow: **Frames to Video** com quadro final = fachada pronta. Opções:
1. **Foto real da sede/planta da UltraGraf** (pedir ao cliente — no Drive só há a equipe e o caminhão, não a fachada da sede). ← preferido
2. Se não houver: gerar a imagem final no Flow (Imagen) usando o logo como "ingredient".

### 5.2 Prompt — imagem do quadro final (se precisar gerar)
```
Photorealistic night photo of a modern industrial signage company building in a small town in Misiones, Argentina.
Wide two-story facade clad in matte black ACM aluminum composite panels with subtle 3D geometric pattern.
Large illuminated channel letters reading "UltraGraf" in white italic futuristic font, glowing, with a thin yellow (#F5E52A) LED line along the top edge.
Small row of four colored dots (magenta, cyan, yellow, black) next to the logo.
Glass entrance, warm interior light, a white Iveco work truck with a crane parked in front. Red earth sidewalk, palm tree.
Blue hour sky, cinematic, eye-level, static camera, 16:9.
```
(versão celular: trocar "16:9" por "vertical 9:16, facade centered, upper third shows the letters").

### 5.3 Prompt — vídeo (Frames to Video, quadro final = imagem acima)
```
Static tripod shot, no camera movement. Time-lapse of a storefront facade being built and finished:
starts as a bare concrete and steel structure with scaffolding and workers at daytime,
then black ACM panels are installed, then large "UltraGraf" channel letters are mounted by a crane truck,
lights turn on as day turns to night, ending on the finished illuminated facade exactly as the final frame.
Smooth continuous transition, no cuts, no text overlays, no people in the final second. 8 seconds.
```
- Checar no resultado: grafia "UltraGraf" correta no letreiro (IA erra texto — se errar, refazer ou gerar com o logo aplicado no quadro final via edição).
- Exportar MP4 maior resolução disponível; salvar em `ultragraf/assets/img/` (`desk.mp4` e `mobile.mp4`).

### 5.4 Processamento (igual Zoonn)
```
ffmpeg -i desk.mp4 -an -vf reverse -vcodec libx264 -crf 27 -preset slow -g 1 -pix_fmt yuv420p -movflags +faststart assets/video/fundo-desk-inv.mp4
(idem mobile) + poster = 1º quadro do invertido
```
JS escolhe arquivo por orientação (`innerWidth > innerHeight`), `object-position:center top`, sem barra de rolagem, `prefers-reduced-motion` = quadro parado na fachada pronta.

## 6. Páginas (fase 1)
`index.html` (one-page) — seções:
1. **Header**: logo branco · Servicios · Trabajos · Nosotros · Contacto · botão WhatsApp.
2. **Hero** sobre o vídeo: chip "Industria publicitaria · San Javier, Misiones"; H1 = **MATERIALIZAMOS TUS IDEAS** (Ethnocentric); sub: fachadas en ACM, letras corpóreas y cartelería con fabricación propia en +700 m² y colocación en todo el NEA; CTA "Pedí tu presupuesto sin cargo" + "Ver trabajos".
3. **Faixa de números** (só verificados): Desde 2016 · +700 m² de planta · Colocación en todo el NEA · Presupuesto sin cargo.
4. **Servicios** (lista do docx, agrupada em cards com foto real):
   - Fachadas premium en ACM y ACM 3D (fotos #18 Óptica Centro, #93 Velona, #61 Zielke)
   - Letras corpóreas (chapa, impresión 3D, polyfan, acrílico, PVC, acero inoxidable) (#3/#103 Klein, #94 Legado, #151 LGH)
   - Carteles back light y neón LED (#4 Mabel, #115 "Que bueno es verte", #87 fitbox)
   - Tótems en ACM (#49 Link, #113 Farmacia Central, #137 LOP Óptica)
   - Pórticos y carteles de ruta (#59 Axion, #120 Andersson, #124 Concepción, #95 Garruchos)
   - Ploteo vehicular (#21, #39 carros de rally)
   - Impresión en gran formato, lona front y gráfica autoadhesiva / calcos troqueladas
   - Puertas de alto nivel en ACM
   - Grabado láser, impresión 3D, trofeos y premiaciones (#45 placa, #23 display)
5. **Trabajos** (galeria parallax 3 colunas, ~18 fotos, legenda = nome do cliente visível na foto): Klein, Potschka, Don Gustavo, Óptica Centro, Multipack, Wichmann Wellness, Befit, Energym, Garavano, Link Combustibles, Velona, La Reina, Maderera Ruff, Municipalidad de Apóstoles…
6. **Nosotros**: texto do PDF (reescrito curto, sem clichê "última generación/excelencia"), foto da equipe (PDF p.4 / #10), caminhões com munck (#13, #109). Misión e Visión em 2 colunas.
7. **Cómo trabajamos**: 4 passos — consulta y visita · diseño y presupuesto sin cargo · fabricación en planta propia · transporte y colocación.
8. **Faixas diagonais** (assinatura dos folhetos): Fachadas de alto nivel · Detalles únicos · Proyección e innovación · Calidad (sem "excelencia" — ban-list).
9. **Preguntas frecuentes** (4–5, FAQPage).
10. **Contacto**: endereço, 2 celulares, e-mail, IG, FB, mapa leve (carrega no clique), formulário → abre WhatsApp com mensagem pronta.
11. **Footer** + WhatsApp flutuante.

Fase 2 (após aprovação): páginas por serviço, formulário → planilha/e-mail, pixel Meta (conta já gerida, moeda ARS) e GA4.

## 7. Imagens
- Selecionar ~35 das 158 fotos (folha de contato numerada gerada; índices acima são dessa ordem: `ls _drive/FOTOS ULTRAGRAF` ordenado). Converter WebP 1600px q80, nome semântico (`klein-letras-corporeas.webp`).
- Excluir fotos com rosto em close de terceiros sem contexto de obra; equipe UltraGraf pode.
- Regra: fotos novas sempre ADICIONAM, nunca substituem.

## 8. Técnica (reaproveitar da Zoonn)
GSAP 3.12.5 + ScrollTrigger (cdnjs) só para scrub/parallax; reveal por IntersectionObserver; nunca reveal em botão; assets com `?v=N`; sem `background-attachment:fixed`; testar com Playwright `channel:'chrome'` (Chromium puro não decodifica H.264) e `waitUntil:'load'` (vídeo impede `networkidle`).

## 9. Checklist de entrega (Regra Zero)
200 nas URLs · trecho novo no HTML ao vivo · `noindex` · `Range` 206 no vídeo · scrub 0→8 s medido · 0 imagem quebrada · 0 erro JS · sem overflow em 390px · screenshots desktop/celular · commit no repo `lp`.

## 10. Perguntas para o cliente
1. Qual celular é o WhatsApp principal?
2. Foto da fachada/planta da sede (para o vídeo do Flow).
3. Domínio próprio? Horário de atendimento?
4. Cidades que atendem com frequência (para citar no site).
5. Autorizam citar nomes de clientes nas legendas dos trabalhos?
