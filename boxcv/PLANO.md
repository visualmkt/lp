# LP BoxCV — Letreiro e Letra Caixa (planejamento, 09/11/2026)

Escrito para: André (agência), antes de construir. Nada foi publicado.

## 1. O que já existe (conferido ao vivo)
- Site `boxcv.com.br` (WordPress + Hello Elementor + Elementor 3.30.2). Só a Home publicada (id 7, modelo `elementor_canvas`).
- Acesso: API REST com senha de aplicativo (OK, administrador). Sem FTP/SSH. Credenciais só em `c:\dev\.env` (`BOXCV_WP_*`); doc de acesso (sem senha) na pasta de imagens do Drive.
- Rastreamento no site: GTM `GTM-KBGTT7Z5`. Não achei tag do Google Ads (AW-) nem GA4 direto na home. A conta de Ads da BoxCV não está no `clientes.json` (busquei por "box").
- Dados do próprio site (únicos que vou usar): WhatsApp 55 11 94431-2877 · Rua Lituânia 570, Vila Curuça, Santo André/SP · seg–sex 9h–18h · comercial@boxcv.com.br · @_boxcomunicacao.
- Layout: topo roxo `#711DD5` com curva, laranja `#FE9611` nos destaques, cartões brancos com sombra, faixa de números roxa, rodapé `#222`, fonte **Poppins** (títulos em caixa alta e negrito), botão verde "Fale conosco" com ícone de WhatsApp, WhatsApp flutuante.

## 2. Proposta
- **URL:** `boxcv.com.br/letreiro/` (alternativa: `/letra-caixa/`). Slug com "letreiro" porque é o termo que mais converte nas outras contas de comunicação visual.
- **Como publicar:** página nova via API, modelo `elementor_canvas`, HTML dentro de bloco `wp:html` (mesmo método das LPs da Sigma/Pincelos), nasce como **rascunho** para você revisar. CSS e SVG inline, sem CDN, imagens em WebP na biblioteca de mídia do próprio site.
- **Um objetivo:** clique no WhatsApp (e formulário curto opcional, se o cliente quiser).

## 3. Estrutura (mobile primeiro)
1. Topo roxo: H1 "Letreiro e letra caixa para a sua empresa" + subtítulo + botão WhatsApp (mensagem pronta: "Olá! Vim pelo site e quero orçamento de letreiro / letra caixa. Sou da empresa ____").
2. Faixa de prova: "+430 empresas atendidas" (número do próprio site — confirmar) + logos de clientes (Valvoline etc. — só com OK do cliente).
3. **Variações que mais vendem** (cartões com foto real, cada um com seu botão): letra caixa iluminada (LED) · letra caixa 3D / relevo · letra espelhada dourada · letreiro luminoso em painel · letras em acrílico recortado · logotipo em relevo na parede de recepção.
4. Galeria de trabalhos reais (12 a 16 fotos, abre ampliada).
5. Para quem fazemos: clínicas, escritórios, lojas, indústrias, franquias.
6. Como pedir o orçamento em 3 passos (WhatsApp → conta o que precisa → recebe a proposta).
7. FAQ (6 perguntas, com marcação FAQPage) + parágrafo-resposta logo abaixo do topo (para IAs citarem).
8. Onde estamos (endereço, horário, mapa) + botão final.
9. Dados estruturados `LocalBusiness` + FAQ; canonical; título/descrição próprios.

## 4. Fotos (56 recebidas; 18 de letreiro/letra caixa são o foco)
**Usar (letreiro e letra caixa):**
- Iluminadas: 8 (Prime, 3D com LED), 14 · 16 · 17 · 18 (Finservices, LED azul), 24 · 27 (Yelum, luminoso amarelo), 54 (Habita, halo), 45 · 52 (TX8 Motors, escudo dourado).
- Espelhada dourada: 28 · 31 (GK), 9 · 11 (Fada dos Óculos).
- Relevo/acrílico na parede: 5 · 6 · 7 (Simone & Bassetto), 19 · 20 · 22 (Elo), 33 · 34 (Grupo Ativa), 15 (Clínica Domus), 35 (Acássia), 40 (Nails), 50 (Habita).
- Letreiro em painel: 29 · 30 (Valvoline).
**Ficam de fora desta LP (outros produtos):** veículos 1–4, 10, 55 · backdrops 36, 51, 56 · plotagem de parede 21, 23, 26, 12, 13, 32, 37, 38 · fachada/outros 39, 41–44, 46–49, 53.
**Excluir por pessoas/dados:** 5 (homem de frente) — usar só 6/7; 46–48 (público na inauguração); 37/38 (rostos de modelo); 2 (placa do carro).
- Tratamento: WebP, sem EXIF/GPS, recorte para tirar pessoas e telefones de terceiros.

## 5. Regras de copy (padrão da agência)
Sem preço, "a partir de", garantia, prazo, "projeto", "instalação", "anos de experiência", "orçamento gratuito", "entrega rápida". Vocabulário: comunicação visual, nunca "gráfica". Atenção: o **site atual** fala "100% de garantia", "prazos cumpridos religiosamente" e "mais de 15 anos" — a LP não repete isso.
Não afirmar material de cada foto sem confirmação (só "acrílico", "LED" e "dourado espelhado", que se veem nas imagens).

## 6. Rastreamento
- Botões `api.whatsapp.com/send?phone=5511944312877&text=…` com `data-action="whatsapp"` + `dataLayer.push({event:'whatsapp_click'})`, para casar com o GTM padrão.
- Depois de publicar: clique real, conferir `whatsapp_click` e, se existir, a conversão do Ads. Sem a conta de Ads/GTM mapeada, **não garanto conversão** — ver pergunta 4.

## 7. Decisões que preciso de você (responda por número)
1. Slug: `/letreiro/` ou `/letra-caixa/`?
2. Posso usar "+430 empresas atendidas" e os logos de clientes (Valvoline, Levi's, etc.)? São do site deles, mas o cliente pode não querer dar ênfase.
3. As 18 fotos de letreiro bastam, ou o cliente vai mandar mais (ex.: letra caixa externa em fachada)? A maioria das fotos é **interna** (recepção/parede).
4. Qual conta do Google Ads atende a BoxCV (ID) e existe campanha apontando para a LP? Preciso para ligar a conversão. O GTM `GTM-KBGTT7Z5` é o certo?
5. Formulário curto (nome, empresa, telefone) além do WhatsApp, ou só WhatsApp?
6. Quais variações o cliente mais vende? Minha lista (item 3) vem das fotos, não de dados de venda.
7. Posso fazer a mesma frase de filtro das outras LPs ("atendemos empresas; não atendemos pessoa física")?

## 8. Próximos passos (após seus OKs)
build local → prévia em celular/desktop → subir imagens → criar rascunho no WP → você revisa → publicar → verificar (curl + conteúdo + clique) → commit/push em `c:\lp\boxcv\`.
