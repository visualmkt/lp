# PLANO — Site institucional Zoonn (aprovação)

> **STATUS 02/10/2026: fase 1 EXECUTADA e no ar** em https://www.visualmkt.com.br/claude/zoonn/ (+ `experiencias.html`).
> Mudanças depois do plano: 11 serviços (não 6), fotos reais do Instagram (37 WebP), seção Nazir na home separada do destaque da Experiências, Experiências focada em terceirização + treinamentos + Churrascada. Detalhes na memória `project_zoonn_site_institucional`.

> Plano aprovado em 02/10/2026. Quem executar: siga na ordem, sem inventar dados.
> Repo `lp` é PÚBLICO — nunca colocar senha/token neste arquivo nem no HTML.

## 0. Antes de escrever código (obrigatório)

1. Ler `~/.claude/skills/landing-page/SKILL.md`, `identidade.md`, `animacoes.md`, `geo-llm.md` e `memory.md`.
2. Ler `c:/lp/artefinal/index.html` e `c:/lp/artefinal/servicos/fachada.html` — é o modelo técnico (estrutura, schema, reviews, mapa de seções). **Copiar a técnica, nunca o texto.**
3. Ler a memória `project_zoonn_site_institucional.md` (dados verificados).

## 1. Fatos verificados (única fonte permitida)

| Campo | Valor | Fonte |
|---|---|---|
| Nome | **Zoonn** Comunicação Visual (dois "n") | ficha Google |
| Dono | Nazir Martins | Business Manager Meta |
| Endereço | Av. Ijuí, 667 – Sala B – Centro, Três Passos – RS, 98600-000 | ficha Google |
| WhatsApp comercial | +55 55 99706-7778 → `https://wa.me/5555997067778` | ficha + confirmado pelo usuário |
| Instagram CV | `https://www.instagram.com/zoonn_comunicacao_visual/` | ficha Google |
| Google | 5,0★ · 24 avaliações · place_id `ChIJDafPfsLn-5QRsXKuT1pSQSo` | Places API |
| Coordenadas | -27.4637521, -53.9232249 | Places API |
| Horário | seg–sex 07:30–11:45 e 13:30–18:00 · sáb/dom fechado | ficha Google |
| Zoonn Experiências | terceirização de letra caixa para outras empresas de CV · cursos eventuais · venda eventual de máquinas · evento **"Churrascada com Comunicação Visual"** (2 edições realizadas) | usuário, 02/10 |
| WhatsApp Experiências | mesmo número (não há outro informado) | — |

**NÃO existe ainda (não inventar):** ano de fundação, cidades atendidas, número de projetos, Instagram/Facebook da Experiências, e-mail, logo, fotos, datas/preços de curso ou evento, depoimentos de alunos. Onde precisar disso: deixar fora ou usar placeholder visível (seção 6).

## 2. Hospedagem de aprovação

- Servidor da agência: SFTP `SFTP_HOST/SFTP_PORT/SFTP_USER/SFTP_PASS` do `c:/dev/.env` (host 92.205.60.14, user `visual`).
- Destino: `public_html/claude/zoonn/` → URL `https://www.visualmkt.com.br/claude/zoonn/`.
- Antes de subir: listar o destino (não pode existir pasta `zoonn/` de outra coisa).
- **`<meta name="robots" content="noindex, nofollow">` em TODAS as páginas** durante a aprovação (site vai migrar para domínio próprio; não pode indexar no domínio da agência). Remover só na migração.
- Canonical: omitir até existir domínio.

## 3. Páginas (fase 1 — aprovação)

```
d:/andrezao/lp/zoonn/
  index.html          Zoonn Comunicação Visual (cliente final)
  experiencias.html   Nazir / Zoonn Experiências (B2B: outras empresas de CV)
  assets/img/         (vazio até o cliente mandar fotos)
  favicon.svg         monograma "Z" provisório
```

Páginas de serviço individuais (`servicos/*.html`, como na Arte Final) = **fase 2**, só depois da aprovação e quando houver campanha. Na fase 1, cada cartão de serviço abre o WhatsApp com mensagem do serviço.

## 4. index.html — seções na ordem

1. **Header fixo**: wordmark textual "ZOONN" (placeholder até a logo) · menu: Serviços, Portfólio, Zoonn Experiências, Contato · botão WhatsApp. Menu mobile com dropdown (sem gap morto entre link e submenu — bug já visto na Arte Final).
2. **Hero parallax**: fundo = bloco "Aguardando imagem" grande com camada de profundidade (GSAP ScrollTrigger, `yPercent` suave). Chip "Comunicação visual em Três Passos – RS". H1 com o produto principal + cidade (ex.: fachadas, letras caixa e comunicação visual em Três Passos). Subtítulo curto. CTA primário WhatsApp, CTA secundário "Ver serviços ↓".
3. **Faixa de confiança**: só números verificados → "5,0★ no Google", "24 avaliações", "Atendimento seg–sex". Nada de anos/projetos até o cliente validar.
4. **Serviços** (6 cartões, mesmos da Arte Final, texto próprio):
   - Fachada em ACM
   - Letra Caixa & Letreiro (inclui NeonLed)
   - Brise, Ripado & Pergolado em ACM (sempre "em ACM", nunca ambíguo com madeira)
   - Totens de Identificação (externo ACM/inox; acrílico só interno)
   - Placas & Sinalização
   - Adesivos & Impressão Digital (o usuário citou "adesivo" no pedido)
   Cada cartão: ícone SVG, 2 linhas de texto, botão "Pedir orçamento" com `wa.me` e mensagem própria. Imagem do cartão = placeholder "Aguardando imagem". `::after` decorativo com `pointer-events:none` (bug da Arte Final).
5. **Portfólio parallax**: grade de 6–9 placeholders "Aguardando imagem" com velocidades de parallax diferentes por coluna. Botão "Ver mais no Instagram".
6. **Como funciona** (4 passos): contato → visita/medição → projeto/aprovação → produção e instalação. Sem prazo em dias (regra: não prometer prazo).
7. **Bloco Zoonn Experiências** (ponte para `experiencias.html`): faixa de cor contrastante, "Tem uma empresa de comunicação visual?" + 3 mini-itens (terceirização de letra caixa, cursos, Churrascada com CV) + botão "Conhecer a Zoonn Experiências".
8. **Avaliações Google**: puxar com Places API (`place/details`, `reviews_sort=newest` e `most_relevant`, `language=pt-BR`) — no máximo 5 por chamada. Usar só 5★ com texto, nome real e foto do autor. Nunca escrever depoimento. Link "Ver todas no Google" → `https://maps.google.com/?cid=3044805370916532913`.
9. **Perguntas frequentes** (4–6, com `FAQPage` schema): atendem outras cidades? fazem a instalação? trabalham com qual material? como pedir orçamento? Respostas sem dado não verificado — se não souber (ex.: cidades), responder "consulte pelo WhatsApp".
10. **Contato + mapa**: endereço, horário, WhatsApp, Instagram. Mapa = fachada leve (div com endereço + botão "Abrir mapa"); ao clicar injeta iframe `https://maps.google.com/maps?q=-27.4637521,-53.9232249&z=16&output=embed`. Link "Como chegar" → `https://www.google.com/maps/dir/?api=1&destination=-27.4637521,-53.9232249`.
11. **CTA final + formulário**: nome + WhatsApp + serviço (select com os 6). Na fase de aprovação o envio só monta a mensagem e abre `wa.me` (sem backend). Disparar `dataLayer.push({event:'lead_form'})` antes de abrir. Backend (Apps Script → planilha / Web3Forms → e-mail) entra após aprovação — ver `reference_form_to_sheets_apps_script.md` e `reference_web3forms_email_backend.md`.
12. **Footer**: NAP completo idêntico ao da ficha, horário, Instagram, link Experiências, "Site em aprovação" não aparece.
13. **WhatsApp flutuante** (canto inferior direito, respeitar safe-area no iOS).

## 5. experiencias.html — seções

1. Header igual (com link "Voltar para Zoonn Comunicação Visual").
2. **Hero**: placeholder "Aguardando foto do Nazir". Chip "Zoonn Experiências · por Nazir Martins". H1 voltado ao dono de empresa de CV (ex.: crescer sua comunicação visual com quem já faz). CTA WhatsApp com mensagem "Vim pelo site da Zoonn Experiências".
3. **O que oferecemos** (4 cartões, cada um com CTA próprio de WhatsApp com mensagem específica):
   - Terceirização de letra caixa (produto principal, destaque visual maior)
   - Cursos (texto: "turmas eventuais — avise-me da próxima")
   - Máquinas (texto: "venda eventual — pergunte o que está disponível")
   - Churrascada com Comunicação Visual (evento, "2 edições realizadas", "quero saber da próxima")
4. **Nazir Martins**: placeholder de foto + texto curto em 1ª pessoa do papel dele (sem inventar história, anos ou números — marcar `<!-- TEXTO A VALIDAR COM O CLIENTE -->`).
5. **Churrascada**: placeholder de galeria (3 fotos) "Aguardando imagens do evento".
6. **Por que terceirizar com a Zoonn** (3–4 itens genéricos verdadeiros: produção própria, padrão de acabamento, atendimento direto com o dono). Sem prazo, sem preço, sem garantia.
7. **CTA final** WhatsApp + formulário (nome, empresa, cidade, interesse: terceirização/curso/máquinas/evento).
8. Footer igual.

## 6. Placeholder "Aguardando imagem"

Componente único, reaproveitado em tudo:

```html
<div class="img-pending" role="img" aria-label="Aguardando imagem: fachada em ACM">
  <svg>…ícone de imagem…</svg><span>Aguardando imagem</span>
</div>
```

- Mesmo tamanho/proporção que a foto final terá (`aspect-ratio` fixo) para não mudar layout quando a foto entrar.
- Fundo com gradiente sutil da paleta + borda tracejada.
- Quando a foto chegar: **adicionar**, nunca substituir foto já publicada (regra `feedback_lp_fotos_sempre_adicionar_nao_substituir`). Converter para WebP 1600px q78 com `sharp`, nome semântico (`fachada-acm-<cliente>.webp`).

## 7. Visual e identidade

- **Sem logo ainda**: wordmark em texto. Paleta provisória — pedir a logo; quando chegar, extrair as cores dela. Até lá escolher paleta coerente com o perfil do Instagram (conferir manualmente; não chutar hex de memória).
- **Fontes**: a Arte Final usa Inter — **não usar Inter**. Escolher par novo pela tabela de `identidade.md` §3 e respeitar a rotação (par das 3 últimas LPs proibido).
- Rodar a ban-list de copy de `identidade.md` e `node c:/dev/lp-dedup.js zoonn` antes de entregar (zero frase clonada da Arte Final).
- Seguir `frontend-design`: estética elevada, sem cara de template.

## 8. Parallax e performance

- Lib única: GSAP 3.12.5 + ScrollTrigger via cdnjs (mesma versão testada na Arte Final):
  `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` e `.../ScrollTrigger.min.js`.
- Parallax só com `transform` (`yPercent`). **Proibido `background-attachment: fixed`** (quebra no iOS).
- `prefers-reduced-motion: reduce` → desliga parallax e reveals.
- Mobile (<768px): amplitude do parallax reduzida à metade.
- Imagens: WebP, `loading="lazy"` e `decoding="async"` fora do hero; hero com `fetchpriority="high"`.
- Mapa só carrega no clique (seção 4.10).
- Meta: LCP < 2,5 s e CLS ~0 no celular (testar com PageSpeed depois do deploy).

## 9. SEO / GEO (deixar pronto, mesmo com noindex)

- `<title>` e `meta description` por página com "Três Passos – RS".
- JSON-LD `index.html`: `LocalBusiness` (name, address, geo, telephone, openingHoursSpecification, sameAs Instagram, aggregateRating 5.0/24, founder → Person Nazir Martins) + `FAQPage`.
- JSON-LD `experiencias.html`: `Organization` "Zoonn Experiências" com `parentOrganization` → Zoonn Comunicação Visual e `founder` Nazir Martins; `Event` só quando houver data real da próxima Churrascada.
- Parágrafo GEO (texto corrido, factual, citável por LLM) em cada página — ver `geo-llm.md`.
- Um H1 por página; alt descritivo em toda imagem/placeholder.

## 10. Tracking (fase aprovação)

- Sem GTM/pixel por enquanto (Meta API suspensa desde 24/09; ID do pixel não confirmado).
- Deixar `window.dataLayer` e pushes prontos: `whatsapp_click` (com `location` e `service`), `lead_form`.
- Após aprovação: instalar pixel da Meta (conta `act_8999987443384300`) e GA4.

## 11. Deploy e verificação (Regra Zero)

1. Script `c:/dev/_tmp_deploy_zoonn.js` (`ssh2-sftp-client` + `dotenv`), sobe `index.html`, `experiencias.html`, `favicon.svg`, `assets/`.
2. Verificar:
   - `curl -s -o /dev/null -w "%{http_code}"` = 200 nas 2 URLs;
   - trecho novo encontrado no HTML ao vivo;
   - `noindex` presente nas 2 páginas;
   - crawl de 404 de todo `src`/`href` interno (já pegou imagens quebradas na Arte Final);
   - testar em 390px e 1440px (screenshot) e com `prefers-reduced-motion`.
3. Apagar o `_tmp_deploy_zoonn.js` ao final.
4. Commit no repo `lp` (sem segredos) e push.
5. Entregar ao usuário: as 2 URLs + lista do que está como placeholder.

## 12. Pendências para o cliente (mandar junto com o link)

1. Logo (PNG transparente ou SVG).
2. Fotos de trabalhos (pasta no Drive).
3. Foto do Nazir e fotos da Churrascada.
4. Validar: ano de fundação, cidades atendidas, texto do Nazir.
5. Instagram/Facebook da Zoonn Experiências, se existir.
6. E-mail para receber os formulários.
7. Domínio definitivo (para tirar o noindex e migrar).
