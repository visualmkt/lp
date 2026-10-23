# Candidatos a case — triagem por dados reais

**Apurado em 2026-08-27** direto da API do Google Ads (MCC 1218176192), 32 contas consultadas.
Períodos: **365 dias** = 2025-08-27 a 2026-08-27 · **90 dias** = 2026-05-29 a 2026-08-27.
Scripts: `_tmp_cases_triagem.js` + `_tmp_cases_acoes.js` (apagados após a apuração; JSONs brutos em `c:\dev\_tmp_cases_*.json`).

## ⚠️ Como ler estes números — antes de publicar qualquer um

O que a coluna **CONV LEAD** mostra é a soma das *ações de conversão* de WhatsApp, formulário e ligação registradas pelo Google Ads. **Isso não é o mesmo que "orçamento".** Duas verificações obrigatórias antes de qualquer número virar case público:

1. **Tipo de contagem** (`counting_type`): se a ação de WhatsApp estiver como `EVERY` em vez de `ONE_PER_CLICK`, a mesma pessoa clicando duas vezes conta duas vezes. Precisa ser conferido conta a conta.
2. **Confirmação do cliente**: o número tem que bater com a percepção dele de quantos pedidos realmente chegaram. Se o cliente disser "não recebi 6.789 contatos", o número está inflado e não se publica.

Enquanto essas duas não forem feitas, o correto no texto é "**cliques de contato registrados**", não "orçamentos".

---

## Tier 1 — melhores candidatos (medição limpa + CPA forte)

| Empresa | Custo 365d | Conv lead 365d | CPA lead | 90d | Ações de conversão | Por que é bom case |
|---|---|---|---|---|---|---|
| **ZZZ Monkey Sign** | R$ 14.420 | 1.469 | **R$ 9,82** | R$ 4.224 / 474 / R$ 8,91 | 2 (`Orçamento Whats`, `Calls from ads`) | Medição mais limpa da carteira. A ação chama-se literalmente "Orçamento Whats" |
| **Duarte Placas** | R$ 76.155 | 7.142 | **R$ 10,66** | R$ 16.033 / 1.533 / R$ 10,46 | `WPP` (6.789) + `Calls from ads` (353) | Maior volume da carteira. ⚠️ conferir counting antes |
| ~~Ação Visual~~ | R$ 14.102 | 995 | ~~R$ 14,17~~ | ~~R$ 8,24~~ | 3, todas WhatsApp | ⛔ **REPROVADO 27/08 — não usar como case de sucesso.** A "melhoria" para R$ 8,24 é artefato da campanha PMax, que gera 420 das 995 conversões do ano a CPA R$ 1,36 com CPC R$ 0,19 e **19,9% de cliques inválidos** (contra 2,1–2,5% nas campanhas Search da mesma conta). Bate com a investigação de 05/08 ("PMax gera conversão mas ninguém chama no WhatsApp"). **CPA real, só Search: R$ 23,53.** A conta rendeu outro tipo de conteúdo — ver `case-04` (frase × ampla) |
| **Sprint** | R$ 31.753 | 2.613 | **R$ 12,15** | R$ 11.689 / 809 / R$ 14,45 | `Chamou whats` (2.543) + form GA4 orçamento (70) | Tem WhatsApp **e** formulário separados — permite mostrar os dois caminhos |

## Tier 2 — já deram depoimento (autorização mais fácil)

| Empresa | Custo 365d | Conv lead | CPA lead | 90d | Observação |
|---|---|---|---|---|---|
| **New - Rotulo** | R$ 18.806 | 1.398 | R$ 13,45 | R$ 5.112 / 298 / R$ 17,15 | 🔎 A ação de conversão chama-se `WHats_newdg` — forte indício de que esta conta é a **New DG** do depoimento do Jonathas Braga. **Confirmar com o cliente antes de tratar como a mesma empresa** |
| **LC ON** | R$ 14.247 | 521 | R$ 27,34 | R$ 4.438 / 280 / R$ 15,85 | Ação única (`wpp`), medição limpa. 🔎 Confirmar se LC ON é a mesma empresa que **LC Projetos Especiais** (depoimento do Alan) |
| **33 Soluções** | R$ 10.791 | 178 | R$ 60,63 | R$ 3.402 / 46 / R$ 73,96 | Volume baixo, CPA alto — **mas é o case mais interessante de narrativa**: 140 das 178 conversões são **formulário**, não WhatsApp (padrão raro no setor), e o depoimento do Yuri já traz o arco "não queria investir → em 3 meses melhorou muito". CPA R$60 é saudável para ticket de ACM/fachada |

## Tier 3 — bons para cases temáticos do cluster

| Empresa | Custo 365d | Conv lead | CPA lead | Tema que serve |
|---|---|---|---|---|
| **GSP PRINT** | R$ 10.752 | 647 | R$ 16,62 | Lona e adesivo → cluster **gráfica / impressão digital** |
| **Art & Talento** | R$ 11.658 | 686 | R$ 16,99 | Eleitoral → case perfeito para a seção de **sazonalidade** |
| **Revitality** | R$ 9.346 | 317 | R$ 29,48 | Fachadas ACM puro → case de **produto ACM** |
| **Pincelos** | R$ 13.540 | 986 | R$ 13,73 | Ação única e limpa (`Chamou Whats`) |
| **Sigmars** | R$ 10.339 | 988 | R$ 10,47 | CPA baixo |
| **HD Coberturas** | R$ 19.445 | 824 | R$ 23,60 | — |
| **Gráfica Viniltec** | R$ 48.293 | 1.818 | R$ 26,56 | Volume alto, gráfica |
| **Decoratom** | R$ 57.093 | 1.788 | R$ 31,93 | Volume alto |

## ⛔ Não usar como case — medição quebrada

| Empresa | Problema encontrado |
|---|---|
| ~~ARTLÓGICA~~ | ✅ **CORRIGIDO 27/08** — a ação `Visualização de página (1)` está com `include_in_conversions_metric = false`, ou seja **não** entra na coluna de conversões das campanhas. O alerta anterior estava errado. ARTLÓGICA volta para os candidatos, com CPA de lead R$ 27,34 (2.392 leads em R$ 65.388) |
| **GRAFÍSSIMA** | 1.268 conversões são `Contato (Carregamento da página ...)` — carregamento de página contando como contato. CPA aparente R$ 12,45; CPA de lead real **R$ 143,59**. Também há 1.688 em `Placas PS e PVC`, de natureza não identificada |
| **AmeVisual** | R$ 4.016 gastos em 365d com **0 conversões registradas** — conta cega, não mede nada |

Esses três são problema de tracking a corrigir independentemente dos cases — os dois primeiros estão hoje reportando ao Google um sinal de otimização errado, o que encarece a mídia.

---

## Ordem de produção sugerida

1. **ZZZ Monkey Sign** — o mais limpo, vira o case-modelo que define o template.
2. **Ação Visual** — o arco de melhoria (CPA 14,20 → 8,24) é a melhor história.
3. **Duarte Placas** — o número de impacto, após conferir counting.
4. **33 Soluções** — depoimento já existe, narrativa pronta.
5. **GSP PRINT** — abre o cluster de gráfica.
6. **Art & Talento** — alimenta a seção de sazonalidade.

## Pendências para destravar

- [ ] Conferir `counting_type` das ações de WhatsApp das contas do Tier 1
- [ ] Confirmar identidade: New - Rotulo ↔ New DG · LC ON ↔ LC Projetos Especiais
- [ ] Pedir autorização de nome (começar pelos 3 que já deram depoimento)
- [ ] Definir se o case cita nome ou versão anônima ("empresa de placas em [cidade]")
- [ ] Corrigir tracking de ARTLÓGICA, GRAFÍSSIMA e AmeVisual
